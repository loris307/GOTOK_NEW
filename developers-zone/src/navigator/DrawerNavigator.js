import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import OutputScreen from '../screens/OutputScreen.js';
import PremiumScreen from '../screens/PremiumScreen.js';
import ConversationStarterPrem from '../screens/ConversationStarterPrem.js';
import ConversationStarterFree from '../screens/ConversationStarterFree.js';
import OccasionView from '../screens/OccasionView.js';
import LanguageSelectionScreen from '../screens/languageSelect.js';
import PrivacyPolicyScreen from '../utils/PrivacyPolicyScreen';
import TermsOfUseTextScreen from '../utils/TermsOfUseTextScreen';
import ManageAccount from '../screens/ManageAccount.js';
import ThemeSelectionScreen from '../screens/ThemeSelect.js';
import FavoritesScreen from '../screens/FavoritesScreen.js';
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigator from './AppNavigator.js';
import { CustomDrawerContent } from './DrawerNavigation.js';
import useThemeStore from '../store/index.js';

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  const { theme, toggleTheme } = useThemeStore(); // Get theme and toggle function from your theme store

    return (

      <Drawer.Navigator 
      drawerContent={(props) => <CustomDrawerContent {...props} 
      onClose={()=> props.navigation.closeDrawer()}/>}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
         backgroundColor: theme === 'dark' ? 'black' : 'white'
        }
      }}
      initialRouteName="OccasionView">
        <Drawer.Screen  name="AppNavigator" component={AppNavigator}/>
      </Drawer.Navigator>
    );
  };
  

  export default DrawerNavigator