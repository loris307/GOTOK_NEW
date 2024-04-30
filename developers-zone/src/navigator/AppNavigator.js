import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OutputScreen from '../screens/OutputScreen';
import PremiumScreen from '../screens/PremiumScreen';
import ConversationStarterPrem from '../screens/ConversationStarterPrem';
import ConversationStarterFree from '../screens/ConversationStarterFree';
import OccasionView from '../screens/OccasionView';
import LanguageSelectionScreen from '../screens/languageSelect';
import ThemeSelectionScreen from '../screens/ThemeSelect';
import PrivacyPolicyScreen from '../utils/PrivacyPolicyScreen';
import TermsOfUseTextScreen from '../utils/TermsOfUseTextScreen';
import ManageAccount from '../screens/ManageAccount';
import FavoritesScreen from '../screens/FavoritesScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
         <Stack.Screen options={{headerShown: false}} name="OccasionView" component={OccasionView} />
      <Stack.Screen options={{headerShown: false}} name="OutputScreen" component={OutputScreen} />
      <Stack.Screen options={{headerShown: false}} name="ConversationStarterPrem" component={ConversationStarterPrem} />        
      <Stack.Screen options={{headerShown: false}} name="ConversationStarterFree" component={ConversationStarterFree} />
         <Stack.Screen options={{headerShown: false}} name="LanguageSelectionScreen" component={LanguageSelectionScreen} /> 
        <Stack.Screen options={{headerShown: false}} name="ThemeSelectionScreen" component={ThemeSelectionScreen} /> 
        <Stack.Screen options={{headerShown: false}} name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} />
        <Stack.Screen options={{headerShown: false}} name="TermsOfUseTextScreen" component={TermsOfUseTextScreen} />
        <Stack.Screen options={{headerShown: false}} name="ManageAccount" component={ManageAccount} />
        <Stack.Screen options={{headerShown: false}} name="FavoritesScreen" component={FavoritesScreen} />  
        <Stack.Screen options={{headerShown: false}} name="PremiumScreen" component={PremiumScreen} />  
  
    </Stack.Navigator>
  );
};

export default AppNavigator;
