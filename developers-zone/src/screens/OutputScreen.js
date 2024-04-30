import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import PremiumScreenPopUp from '../modals/PremiumScreenPopUp';

import i18n from '../../i18n.js';
import 'firebase/functions';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from '../../firebase.js';
import * as Clipboard from 'expo-clipboard';
import UserContext from '../utils/UserContext.js';
//import { InterstitialAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';



import funnyImage from 'developers-zone/src/assets/OPStyleIcons/OPFunny.png';
import friendlyImage from 'developers-zone/src/assets/OPStyleIcons/OPFriendly.png';
import slangImage from 'developers-zone/src/assets/OPStyleIcons/OPCool.png';
import romanticImage from 'developers-zone/src/assets/OPStyleIcons/OPRomantic.png';
import logo from 'developers-zone/src/assets/logoGoTok.png';

import advice_ar from 'developers-zone/src/assets/advices/advice_ar.js';
import advice_en from 'developers-zone/src/assets/advices/advice_en.js';
import advice_de from 'developers-zone/src/assets/advices/advice_de.js';
import advice_gr from 'developers-zone/src/assets/advices/advice_gr.js';
import advice_fr from 'developers-zone/src/assets/advices/advice_fr.js';
import advice_hi from 'developers-zone/src/assets/advices/advice_hi.js';
import advice_it from 'developers-zone/src/assets/advices/advice_it.js';
import advice_kr from 'developers-zone/src/assets/advices/advice_kr.js';
import advice_mx from 'developers-zone/src/assets/advices/advice_mx.js';
import advice_nl from 'developers-zone/src/assets/advices/advice_nl.js';
import advice_pt from 'developers-zone/src/assets/advices/advice_pt.js';
import advice_ru from 'developers-zone/src/assets/advices/advice_ru.js';
import advice_ukr from 'developers-zone/src/assets/advices/advice_ukr.js';
import advice_zh from 'developers-zone/src/assets/advices/advice_zh.js';
import advice_jp from 'developers-zone/src/assets/advices/advice_jp.js';
import useThemeStore from '../store';
import { Themestyles } from './styles';
import Header from '../components/Header/Header';
import { Text } from '../components/Text/Text';









const OutputScreen = ({ navigation, route }) => {
  const { pass: initialPass = "", iconpass: initialIconpass = "", formData = {} } = route.params || {};
  const { theme } = useThemeStore(); // Get the current theme
  //For ads
  //const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';
  const [loaded, setLoaded] = useState(false);
  const viewRef = useRef()

//   const [interstitialAd, setInterstitialAd] = useState(
//     InterstitialAd.createForAdRequest(adUnitId, {
//         requestNonPersonalizedAdsOnly: true,
//         keywords: ['fashion', 'clothing'],
//     })
// );

  // Add state variables for pass and iconpass
  const [pass, setPass] = useState(initialPass);
  const [iconpass, setIconpass] = useState(initialIconpass);
  
  //Premium feature
  const { isPremium, setIsPremium } = useContext(UserContext);
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);


  //Spacer to center the text in free version
  const Spacer = () => {
    if (isPremium) {
        return null;
    }
    return <View style={{ height: 50 }} />;
};

//load ad when component mounts
// useEffect(() => {
//   if (!isPremium) {
//     const loadedListener = interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
//       console.log('Interstitial ad loaded');
//       if (!loaded) {
//         interstitialAd.show();
//         const newAd = InterstitialAd.createForAdRequest(adUnitId, {
//             requestNonPersonalizedAdsOnly: true,
//             keywords: ['fashion', 'clothing'],
//         });
//         newAd.load();
//         setInterstitialAd(newAd);
//         setLoaded(true);
//       }
//     });

//     const errorListener = interstitialAd.addAdEventListener(AdEventType.ERROR, (error) => {
//         console.error('Interstitial ad error:', error);
//     });

//     interstitialAd.load();

//     return () => {
//         loadedListener();
//         errorListener();
//     };
//   }
// }, []);



  const functions = getFunctions(app);

  console.log(pass);
  console.log(iconpass);
  
  const [regenerating, setRegenerating] = useState(false);

  const regenerate = async () => {

    // if (!isPremium && loaded) {
    //   interstitialAd.show();
    //   const newAd = InterstitialAd.createForAdRequest(adUnitId, {
    //       requestNonPersonalizedAdsOnly: true,
    //       keywords: ['fashion', 'clothing'],
    //   });
    //   newAd.load();
    //   setInterstitialAd(newAd);
    // }

    setRegenerating(true);

    const prompt = 'Generate a short, creative, context-specific, and culturally-sensitive conversation starter line that combines the talking styles of renowned stand-up comedians and top-notch dating experts, without explicitly naming any. The pickup line should be engaging, original, not cheesy, and serve as an entertaining icebreaker with subtle flirty undertones. Keep it within a 25-word limit, based on user input details such as who the user is talking to, the number of people involved, the scenario, the users preferred output style, the age of the person the user is talking to, the occasion, and the preferred output language. Use this information as context for generating a suitable line, not as a source for direct quotations. Adjust to local customs, social norms, and regional language variations. Always generate the output in the specified language. Do not include additional comments or notes using brackets, asterisks, or colons. For example: User Input: User is talking to: female, Number of people:1, The scenario is: She is doing cocaine at the bar non-stop, Preferred Output Style: slang, Age of the Person User is Talking to: 90, Occasion: Night Club, Preferred Output Language: en | Output: Hey Grandma, you sure are giving that coke the respect it deserves! You remind me of a cross between a boss and Betty Whit. Mind if I join in and we keep this party all night long?';
    const concatenatedString = Object.values(formData).join(", ");
  
    // Call the Cloud Function
    const generateConversationStarter = httpsCallable(functions, 'generateConversationStarter2');
    try{
      console.log("Calling generateConversationStarter");
      const response = await generateConversationStarter({  prompt, concatenatedString, isPremium  });

      setRegenerating(false);
    
      const text = response.data;
      console.log(text);
      
      //sample text to try
      //let sample = "Hey there, did it hurt when you fell from the profile picture? Because you're definitely rocking that digital gravity! 😉 #Swipehjz uzgb uzgub zgug jkbnkjb iuib iuhib"
      
      setPass(text);
      //setPass(sample);
      //setIconpass(formData.Style.split(': ')[1]); // Assuming Style: "Output Style: someIconStyle"
      
    }catch (error) {
      console.log(error);
      if (!isPremium) {
          setShowPremiumPopup(true);
      } else {
          Alert.alert(
              "Error", 
              error.message,
              [
                  {text: "OK", onPress: () => console.log("OK Pressed")}
              ],
              { cancelable: false }
          );
      }
  }
};
    
    const [advice, setAdvice] = useState([]);

    // Get advice for the correct language when the component mounts or the language changes
    useEffect(() => {
      let adviceList;
      switch(i18n.locale) {
        case 'ar':
          adviceList = advice_ar;
          break;
        case 'en':
          adviceList = advice_en;
          break;
        case 'de':
          adviceList = advice_de;
          break;
        case 'gr':
          adviceList = advice_gr;
          break;
        case 'fr':
          adviceList = advice_fr;
          break;
        case 'hi':
          adviceList = advice_hi;
          break;
        case 'it':
          adviceList = advice_it;
          break;
        case 'kr':
          adviceList = advice_kr;
          break;
        case 'mx':
          adviceList = advice_mx;
          break;
        case 'nl':
          adviceList = advice_nl;
          break;
        case 'pt':
          adviceList = advice_pt;
          break;
        case 'ru':
          adviceList = advice_ru;
          break;
        case 'ukr':
          adviceList = advice_ukr;
          break;
        case 'zh':
          adviceList = advice_zh;
          break;
        case 'jp':
          adviceList = advice_jp;
          break;
        default:
          adviceList = advice_en;
      }
      setAdvice(adviceList);  // Set the advice list for the selected language
    }, [i18n.locale]);

    useEffect(() => {
      // Get a random index once the advice list is set or changed
      if (advice && advice.length > 0) {
        const index = Math.floor(Math.random() * advice.length);
        setRandomIndex(index);
      }
    }, [advice]);
    
    
    // Conditionally set the image source based on iconpass
  let imageSource;
  
  switch (iconpass) {
    case 'funny':
      imageSource = funnyImage;
      break;
    case 'friendly':
      imageSource = friendlyImage;
      break;
    case 'Slang':
      imageSource = slangImage;
      break;
    case 'Romantic':
      imageSource = romanticImage;
      break;
    default:
      imageSource = logo;
      break;
  }

  //Copying to Cliboard
  const copyToClipboard = () => {
    Clipboard.setString(pass);
    Alert.alert('Success', 'Text copied to clipboard');
  };
  


    const [showPopup, setShowPopup] = useState(false);
    const [randomIndex, setRandomIndex] = useState(0);

  
    //Function to toggle the popup
    const togglePopup = () => {
      setShowPopup(!showPopup);
    };



    return (
      <View style={[styles.container, theme === 'dark' && Themestyles.darkContainer]} >

        <Header
          title={i18n.t("titleOutput")} 
          showHeartButton={pass}
          showShareButton={pass}
          ref={viewRef}
          back
        />

        <View style={{...styles.mainContainer, justifyContent: 'center', alignItems: 'center'}} >
          {showPopup && <PremiumScreenPopUp navigation={navigation} onClose={togglePopup} />}

        

          {imageSource && <Image source={imageSource} style={styles.styleIconImage} />}

          <Spacer /> 


          <Text 
  style={[
    styles.text, 
    isPremium && pass.length > 140 ? styles.longText : null
  ]}
  onPress={copyToClipboard}
>
            {pass}
          </Text>
        

          {isPremium && (
            <View ref={viewRef} style={styles.adviceContainer}>
              <Text style={[styles.heading, pass.length > 130 && pass.length < 140 ? styles.adivceLong : null]}>
                {i18n.t("expertAdvice")} 
              </Text>

              <Text style={styles.advice}>
                {advice[randomIndex]} 
              </Text>
            </View>
          )}

          <View style={styles.buttoncontainer} >
              
              
            <TouchableOpacity style={styles.btnRegenerate} onPress={regenerate} disabled={regenerating}>
              
            
            {regenerating ? (
            <ActivityIndicator size="small" color="white" /> // Show loading spinner if loading
            ) : (
              <Text style={styles.btnTextRegenerate}> {i18n.t("renegerate")}</Text>// Show button text if not loading
            )}
              
              
            </TouchableOpacity> 
              
            

          </View>
          
        </View>
        {showPremiumPopup && <PremiumScreenPopUp onClose={() => setShowPremiumPopup(false)} navigation={navigation} />}

      </View>

      
      
    );
  };
  
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },

    
    mainContainer: {
        flex: 1,
        alignItems: 'center',
      },

    buttoncontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    btn:{
        backgroundColor: 'white',
        width: '90%',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#B623A3',
    },

    longText: {
      fontSize: 18, 
      lineHeight: 26,
      marginBottom: 10,
    },
    text:{
      fontSize: 20,
      lineHeight: 30,
      alignContent: 'center',
      padding: 15,
      textAlign: 'center',
      marginTop: 20,
      width: '90%',   
      marginBottom: 40,
  },

    infoRow:{
      flexDirection: 'row',
      alignItems: 'center',
      
    },

    icon:{
      //marginTop: 20,
      //marginRight: 10,
    },

    styleIconImage:{
      width: 68,
      height: 78,
      resizeMode: 'contain',
      marginBottom: 50,
      marginTop: 20,
      
    },

    advice:{
        fontSize: 15,
        //fontStyle: 'italic',
        alignContent: 'center',
        textAlign: 'center',
        //padding: 20,
        marginBottom:10,
        lineHeight: 24,
        marginLeft: 20,
        marginRight: 20,
        width: '90%',
    },

    adivceLong:{
      marginTop: -30,
    },

    infoText:{
        fontSize: 12,
        marginTop: 20,
    },
    adviceContainer:{
      marginTop: 30,
      width: '90%',
    },
    btnText:{
      color: '#B623A3',
    },
    btnRegenerate:{
      backgroundColor: '#B623A3',
        width: '90%',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },

    btnTextRegenerate:{
      
      color: '#ffffff',
    },

    heading:{
        fontSize: 16,
        alignContent: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginBottom:10,
        textAlign: 'center',
        fontWeight: 'bold',
        //marginTop: -30,
    }

  });
  
  export default OutputScreen;