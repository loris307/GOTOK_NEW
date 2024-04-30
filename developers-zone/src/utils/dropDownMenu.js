import React, { useState, useContext } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faTimes, faPlus, faGlobe, faLocationDot,faMoon, faStar, faRightFromBracket, faHeart } from '@fortawesome/free-solid-svg-icons';

import { faLock } from '@fortawesome/free-solid-svg-icons'; // Import lock icon
import {faUser}from '@fortawesome/free-solid-svg-icons';
import UserContext from './UserContext.js'


import i18n from '../../i18n.js';
import { useAuthentication } from '../hooks/useAuthentication.ts';
import { useNavigation } from '@react-navigation/core';
import useThemeStore from '../store/index.js';

const Menu = () => {
  const navigation = useNavigation()
  const { isPremium, setIsPremium } = useContext(UserContext);

  const { logout } = useAuthentication();


  const [showMenu, setShowMenu] = useState(false);
  const { theme } = useThemeStore(); // Assuming you have access to the theme state
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  
  return (
    <View>
      <TouchableOpacity onPress={()=> navigation.openDrawer()}>
        <FontAwesomeIcon icon={faBars} size={30} color={theme === 'dark'? 'white' : 'black'}/>
      </TouchableOpacity>
      {/* <Modal
        animationType="fade"
        transparent={true}
        visible={showMenu}
        onRequestClose={toggleMenu}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={toggleMenu}>
                <FontAwesomeIcon icon={faTimes} size={30} color='white'  />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => {toggleMenu(); navigation.navigate('OccasionView')}}>
                <View style={styles.menuItemsContainer}>
                    <FontAwesomeIcon color={'white'} icon={faPlus} size={13} style={{marginRight: 10}}  />
                    <Text style={styles.text}>{i18n.t("newChat")}</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {toggleMenu(); navigation.navigate('FavoritesScreen')}}>
                <View style={styles.menuItemsContainer}>
                    <FontAwesomeIcon color={'white'} icon={faHeart} size={13} style={{marginRight: 10}}  />
                    <Text style={styles.text}>{i18n.t("favorites")}</Text>
                </View>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => {toggleMenu(); navigation.navigate('LanguageSelectionScreen')}}>
                <View style={styles.menuItemsContainer}>
                    <FontAwesomeIcon color={'white'} icon={faGlobe} size={13} style={{marginRight: 10}}  />
                    <Text style={styles.text}>{i18n.t("language")}</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {toggleMenu(); navigation.navigate('ThemeSelectionScreen')}}>
                <View style={styles.menuItemsContainer}>
                    <FontAwesomeIcon color={'white'} icon={faMoon} size={13} style={{marginRight: 10}}  />
                    <Text style={styles.text}>{i18n.t("theme")}</Text>
                </View>
            </TouchableOpacity>

            {!isPremium && (
            <TouchableOpacity onPress={() => {toggleMenu(); navigation.navigate('PremiumScreen')}} >
              <View style={styles.menuItemsContainer}>
                <FontAwesomeIcon color={'white'} icon={faStar} size={13} style={{marginRight: 10}}  />
                <Text style={styles.disabledText}>{i18n.t("upgrade")}</Text>
              </View>
            </TouchableOpacity>
            )}
{/* 
         

            {isPremium && (
              <TouchableOpacity onPress={() => {toggleMenu(); navigation.navigate('ManageAccount')}}>
                <View style={styles.menuItemsContainer}>
                <FontAwesomeIcon color={'white'} icon={faUser} size={13} style={{marginRight: 10}}  />
                <Text style={styles.text}>{i18n.t("manageAccount")}</Text>
                </View>
              </TouchableOpacity>
            )}


            <TouchableOpacity onPress={() => {toggleMenu(); logout()}}>
                <View style={styles.menuItemsContainer}>
                    <FontAwesomeIcon color={'white'} icon={faRightFromBracket} size={13} style={{marginRight: 10}}  />
                    <Text style={styles.text}>{i18n.t("logout")}</Text>
                </View>
            </TouchableOpacity>
            
          </View>
        </View>
      </Modal> */}
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',  // Change this to 'flex-start'
    marginTop: 50,
    
    //marginRight: 10,
  },
  text: {
    color: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '100%',
    marginRight: 10,
    marginBottom: 10,
  },
  modalContent: {
    backgroundColor:'#B623A3',
    borderRadius: 5,
    padding: 20,
    width: '100%',  // Make sure this is set to '100%'
    
    marginTop: -50,
    paddingTop: 50,
  },
  menuItemsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  disabledMenuItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    opacity: 0.5, // This makes the button look disabled
  },
  
  disabledText: {
    color: 'white', // Change this color to a grey color
  },
});

export default Menu;