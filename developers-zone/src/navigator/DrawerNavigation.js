import * as React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useAuthentication } from '../hooks/useAuthentication.ts';
import i18n from '../../i18n.js';
import { Switch, Text, View } from 'react-native';
import useThemeStore from '../store/index.js'; // Import your theme store

export const CustomDrawerContent = (props) => {
  const { logout } = useAuthentication();
  const { theme, toggleTheme } = useThemeStore(); // Get theme and toggle function from your theme store

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem label={i18n.t("newChat")} labelStyle={{ color: theme === 'dark' ? 'white' : 'black' }} onPress={() => props.navigation.navigate('OccasionView')} />
      <DrawerItem label={i18n.t("language")} labelStyle={{ color:  theme === 'dark' ? 'white' : 'black'}} onPress={() => props.navigation.navigate('LanguageSelectionScreen')} />
     <DrawerItem label={i18n.t("manageaccount")} labelStyle={{ color: theme === 'dark' ? 'white' : 'black'}} onPress={() => props.navigation.navigate('ManageAccount')} />
      <DrawerItem label={i18n.t("favorites")} labelStyle={{ color:  theme === 'dark' ? 'white' : 'black'}} onPress={() => props.navigation.navigate('FavoritesScreen')} />
      <DrawerItem label={i18n.t("premium")} labelStyle={{ color:  theme === 'dark' ? 'white' : 'black' }} onPress={() => props.navigation.navigate('PremiumScreen')} />
      <DrawerItem label={i18n.t("privacyPolicy")} labelStyle={{ color:  theme === 'dark' ? 'white' : 'black'}} onPress={() => props.navigation.navigate('PrivacyPolicyScreen')} />
      <DrawerItem label={i18n.t("termsOfUse")} labelStyle={{ color:  theme === 'dark' ? 'white' : 'black'}} onPress={() => props.navigation.navigate('TermsOfUseTextScreen')} />
         {/* Dark mode switch */}
         <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 16,marginVertical:10 }}>
        <Text style={{fontWeight:500,color: theme === 'dark' ? 'white' : 'black'}}>Dark mode</Text>
        <Switch
          value={theme === 'dark'} // Set switch value based on current theme
          onValueChange={toggleTheme} // Toggle theme on switch change
          thumbColor={'#ffffff'}
          trackColor={{ true: '#000000', false: '#ffffff' }}
          style={{ transform: [{ scale: 0.8 }] }} // Adjust the scale as needed
       />
      </View>
      <DrawerItem label={i18n.t("logout")} labelStyle={{ color: 'red' }} onPress={() => logout()} />
    </DrawerContentScrollView>
  );
};
