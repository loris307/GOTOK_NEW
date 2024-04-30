
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import './firebase.js';
import { Provider as ZustandProvider } from 'zustand'; 
import { auth } from './firebase.js';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import { initStripe } from "@stripe/stripe-react-native";
import { getFunctions, httpsCallable } from 'firebase/functions';
import * as SplashScreen from 'expo-splash-screen';
//import 'expo-dev-client'
import {
  useFonts,
  Montserrat_100Thin,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
} from "@expo-google-fonts/montserrat";


//import mobileAds from 'react-native-google-mobile-ads'; 

initStripe({
  publishableKey: 'pk_test_51NcWqjAmn8sb0ycrVKjeLjD22QScb58tmTqI6sm8G5bIWcty51LXjor3FR5ej9M4UZHmP9GqPeWCzQv5CTsnXddy00znuKSE4t',
});

SplashScreen.preventAutoHideAsync()
  .then((result) => console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`))
  .catch(console.warn); 



import { Alert, LogBox, SafeAreaView, StatusBar } from 'react-native';

import OutputScreen from './src/screens/OutputScreen.js';
import loginSignUp from './src/screens/loginSignUp.js';
import LoginScreen from './src/screens/LoginScreen.js';
import PremiumScreen from './src/screens/PremiumScreen.js';
import ConversationStarterPrem from './src/screens/ConversationStarterPrem.js';
import ConversationStarterFree from './src/screens/ConversationStarterFree.js';
import OccasionView from './src/screens/OccasionView.js';
import SignUpForm from './src/screens/SignUpForm.js';
import TermsOfUseScreen from './src/screens/TermsOfUseComponent.js';
import LanguageSelectionScreen from './src/screens/languageSelect.js';
import PrivacyPolicyScreen from './src/utils/PrivacyPolicyScreen';
import TermsOfUseTextScreen from './src/utils/TermsOfUseTextScreen';
import UpdateRequiredScreen from './src/screens/UpdateRequired.js';
import ManageAccount from './src/screens/ManageAccount.js';
import PremiumPurchaseScreen from './src/screens/PremiumPurchaseScreen.js';

import UserContext from './src/utils/UserContext.js'
import ThemeSelectionScreen from './src/screens/ThemeSelect.js';
import FavoritesScreen from './src/screens/FavoritesScreen.js';
import DrawerNavigator from './src/navigator/DrawerNavigator.js';
import useThemeStore from './src/store/index.js';
import { useAuthentication } from './src/hooks/useAuthentication.ts';

LogBox.ignoreAllLogs(); //Ignore logs that match the text


const Stack = createStackNavigator();

const MainApp = () => {
  const { user } = useAuthentication();


  
   
  return (
//    user ? (
     <DrawerNavigator/>
  //   ) : (
  //     <Stack.Navigator>
  //       <Stack.Screen options={{headerShown: false}} name="loginSignUp" component={loginSignUp} />
  //       <Stack.Screen options={{headerShown: false}} name="LoginScreen" component={LoginScreen} />
  //       <Stack.Screen options={{headerShown: false}} name="SignUpForm" component={SignUpForm} />
  //       <Stack.Screen options={{headerShown: false}} name="TermsOfUseScreen" component={TermsOfUseScreen} />
  //       <Stack.Screen options={{headerShown: false}} name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} />
  //       <Stack.Screen options={{headerShown: false}} name="TermsOfUseTextScreen" component={TermsOfUseTextScreen} />
    
  //     </Stack.Navigator>
  //   )
 );
};

const UpdateRequiredStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{headerShown: false}}
      name="UpdateRequiredScreen"
      component={UpdateRequiredScreen}
    />
  </Stack.Navigator>
);

export default function App() {
  const { theme } = useThemeStore();
  const [isFirebaseInitialized, setFirebaseInitialized] = useState(false);
  const [isUpdateRequired, setUpdateRequired] = useState(false);
  const [isPremium, setIsPremium] = useState(false);  // <-- Initialize the state for isPremium
  let [fontsLoaded] = useFonts({
    Montserrat_100Thin,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
  });

  console.log('fontsloaded === ',fontsLoaded)

  useEffect(() => {

    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 5000);

    const authObserver = onAuthStateChanged(auth, async (user) => {
      console.log("Firebase is initialized");

      setFirebaseInitialized(true);
      if (user) {
        await checkSubscriptionStatus();
      }
    });
    return authObserver; // This ensures the listener is removed when the component is unmounted
  }, []);

  // useEffect(() => {
  //   // Initialize the Google Mobile Ads SDK
  //   mobileAds()
  //     .initialize()
  //     .then(adapterStatuses => {
  //       console.log('Ads SDK initialized!', adapterStatuses);
  //     });
  // }, []);  

  const checkSubscriptionStatus = async () => {
    const functions = getFunctions();
    const checkSubscriptionStatusFunction = httpsCallable(functions, 'checkSubscriptionStatus');
    
    try {
        const response = await checkSubscriptionStatusFunction();
        if (response.data.hasActiveSubscription) {
            setIsPremium(true);
        } else {
            setIsPremium(false);
        }
    } catch (error) {
        Alert.alert('Error', 'Failed to fetch subscription status.');
    }
};

  const checkForUpdates = async () => {
    const db = getFirestore();
    let currentVersion = 1;  // Replace with your app's current version

    const configDoc = await getDoc(doc(db, 'config', 'App'));

    if (configDoc.exists()) {
      let latestVersion = configDoc.data().latestVersion;
      console.log('Latest version: ' + latestVersion);

      if (latestVersion > currentVersion) {
        setUpdateRequired(true);
      }
    }
  };

  useEffect(() => {
    if (isFirebaseInitialized) {
      checkForUpdates();
    }
  }, [isFirebaseInitialized]);


  return (

    <NavigationContainer>
      <StatusBar
      translucent
      backgroundColor="transparent"
      barStyle={ theme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <UserContext.Provider value={{ isPremium, setIsPremium }}>
      <StripeProvider
        publishableKey="pk_test_51NcWqjAmn8sb0ycrVKjeLjD22QScb58tmTqI6sm8G5bIWcty51LXjor3FR5ej9M4UZHmP9GqPeWCzQv5CTsnXddy00znuKSE4t"
        merchantIdentifier="merchant.com.gotokai"
      >

        {isUpdateRequired ? <UpdateRequiredStack /> : <MainApp />}
      </StripeProvider>
      </UserContext.Provider>
    </NavigationContainer>

  );
};




