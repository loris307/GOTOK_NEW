import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import i18n from '../../i18n.js';
import useThemeStore from '../store/index.js';
import { Themestyles } from './styles.js';
import Header from '../components/Header/Header.js';

const ThemeSelectionScreen = ({ navigation }) => {
  const { theme, toggleTheme } = useThemeStore(); // Use the theme and toggleTheme function from Zustand

  return (
<>
    <Header
    title={i18n.t("theme")} 
   back
  />
    <View style={[styles.container, theme === 'dark' && Themestyles.darkContainer]}>
    
       
      <TouchableOpacity onPress={toggleTheme} style={[styles.button,theme === 'dark' && Themestyles.darkButton]}>
        <Text style={styles.buttonText}>{theme === 'light' ? 'Dark' : 'Light'}</Text>
      </TouchableOpacity>


    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  label: {
    fontSize: 25,
  },
  button: {
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#B623A3',
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'white',
    marginTop: 16,
  },
  buttonText: {
    fontSize: 20,
    color: '#B623A3',
  },
  homebuttonText: {
    fontSize: 20,
    color: '#B623A3',
  },
});

export default ThemeSelectionScreen;
