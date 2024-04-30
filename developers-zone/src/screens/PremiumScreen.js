import React, { useState, useEffect, useContext } from 'react';
import { TouchableOpacity, View, Text, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header/Header';
import i18n from '../../i18n.js';
import { useStripe } from '@stripe/stripe-react-native';
import { getFunctions, httpsCallable } from 'firebase/functions';
import UserContext from '../utils/UserContext.js';


//This Screen is not used -> Just has all the code for the subscription
const PremiumScreen = ({ navigation }) => {
  const { confirmSetupIntent, initPaymentSheet, presentPaymentSheet } = useStripe();
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentSheetReady, setPaymentSheetReady] = useState(false);

  const [isActive, setIsActive] = useState(null);

  const { isPremium, setIsPremium } = useContext(UserContext);

  const [loading, setLoading] = useState(false);


  useEffect(() => {
    fetchSetupIntent();
    checkSubscriptionStatus();
  }, []);

  const checkSubscriptionStatus = async () => {
      const functions = getFunctions();
      const checkSubscriptionStatusFunction = httpsCallable(functions, 'checkSubscriptionStatus');
      
      try {
          const response = await checkSubscriptionStatusFunction();
          setIsActive(response.data.hasActiveSubscription);
      } catch (error) {
          Alert.alert('Error', 'Failed to fetch subscription status.');
      }
  };

  const fetchSetupIntent = async () => {
  const functions = getFunctions();

    const createSetupIntentFunction = httpsCallable(functions,'createCheckoutSession');
    try {
      const response = await createSetupIntentFunction();
      setClientSecret(response.data.clientSecret);

      // Initialize the PaymentSheet with the SetupIntent's client secret.
      const { error } = await initPaymentSheet({
        customerId: response.data.customerId,
        customerEphemeralKeySecret: response.data.ephemeralKey,
        setupIntentClientSecret: response.data.clientSecret,
        merchantDisplayName: 'GoTok AI',
      });
      if (error) {
        Alert.alert('Error', error.message);
      } else {
        setPaymentSheetReady(true); // Indicate that the PaymentSheet can be presented
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to fetch setup intent.');
  }
  };

  const handlePresentPaymentSheet = async () => {
    if (!clientSecret) return;
    
    setLoading(true); // Start the loading spinner


    const { error } = await presentPaymentSheet({ clientSecret });

    //setLoading(false); // Stop the loading spinner regardless of the outcome

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      handleStartSubscription();
    }
  };

  const handleStartSubscription = async () => {
    const functions = getFunctions();
    const startSubscriptionFunction = httpsCallable(functions,'startSubscription');
    try {
      // Pass the clientSecret to the backend function
      const response = await startSubscriptionFunction({ clientSecret });
      
       // Stop the loading spinner regardless of the outcome

      // Use the response's status to determine success
      if (response.data.status === "active") {
        setIsPremium(true);
        Alert.alert('Success', 'Your subscription was successful!', [
          { text: 'OK', onPress: () => navigation.navigate('OccasionView') }
        ]); 
        setLoading(false);      
      } else {
        Alert.alert('Error', 'Failed to create subscription.');
        setLoading(false);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to start subscription.');
      setLoading(false);
    }
  };
  
  
  const renderTextsWithIcon = () => {
    const textsWithIcon = [
      { text: i18n.t("premTextAndIcons1"), iconName: 'star' },
      { text: i18n.t("premTextAndIcons2"), iconName: 'star' },
      { text: i18n.t("premTextAndIcons3"), iconName: 'star' },
      { text: i18n.t("premTextAndIcons4"), iconName: 'star' },
    ];

    return textsWithIcon.map((item, index) => (
      <View key={index} style={styles.textWithIconContainer}>
        <Icon name={item.iconName} style={styles.icon} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    ));
  };

  const renderTextsWithIcon2 = () => {
    const textsWithIcon = [
      { text: i18n.t("freeTextAndIcons1"), iconName: 'check-box' },
      { text: i18n.t("freeTextAndIcons3"), iconName: 'check-box' },
      { text: i18n.t("freeTextAndIcons2"), iconName: 'check-box' },
    ];

    return textsWithIcon.map((item, index) => (
      <View key={index} style={styles.textWithIconContainer}>
        <Icon name={item.iconName} style={styles.icon} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Header title="Subscription" />
        
      <View style={styles.contentContainer}>
        
        <Text style={styles.heading}>Premium</Text>
        
        <Text style={styles.description}>
          {i18n.t("premCTAText")}
        </Text>

        <View style={styles.textIconContainer}>
            {renderTextsWithIcon()}
        </View>
        
        <Text style={styles.headingMargin} >Free</Text>
        <Text style={styles.description}>
          {i18n.t("freeCTAText")}
        </Text>
        <View style={styles.textIconContainer}>
            {renderTextsWithIcon2()}
        </View>

      </View>

    <View style={styles.btnContainer}>
        <TouchableOpacity   
          onPress={handlePresentPaymentSheet}
          disabled={!paymentSheetReady || loading} // Disable the button if PaymentSheet is not ready or if it's loading
          style={styles.buttonSub}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonTextSub}>{i18n.t("subscribeBtn")}</Text>}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {navigation.navigate('OccasionView')}} style={styles.button}>
            <Text style={styles.buttonText}>{i18n.t("backhomeBtn")}</Text>
        </TouchableOpacity>
    </View>
      

      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.footerText}>{i18n.t("termsOfUse")}</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>|</Text>
        <TouchableOpacity>
          <Text style={styles.footerText}>{i18n.t("privacyPolicy")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    paddingHorizontal: 20,
  },
  textIconContainer: {
    alignItems: 'flex-start',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 11,
    color: 'black',
    marginHorizontal: 10,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headingMargin: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 40,
    textAlign: 'center',
  },
  description: {
    fontSize: 12,
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  textWithIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    
  },
  icon: {
    marginRight: 5,
    fontSize: 16,
  },
  text: {
    fontSize: 12,
  },
  buttonSub: {
    backgroundColor: '#B623A3',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#B623A3',
    width: '80%',
    marginBottom: 10,
  },
  button: {
    //backgroundColor: '#AA00FF',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#B623A3',
    width: '80%',
    marginBottom: 10,
  },
  buttonTextSub: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  buttonText: {
    color: '#B623A3',
    textAlign: 'center',
    fontSize: 18,
  },
  btnContainer: {
    alignItems: 'center',
  },
};

export default PremiumScreen;