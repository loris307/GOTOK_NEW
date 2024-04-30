import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, DeviceEventEmitter, FlatList } from 'react-native';
import CountryFlag from "react-native-country-flag";

import i18n from '../../i18n.js';
import Header from '../components/Header/Header.js';
import useThemeStore from '../store/index.js';
import { Themestyles } from './styles.js';

const LanguageSelectionScreen = ({ navigation }) => {
  const [viewState, setViewState] = useState(0);
  const { theme, language, setLanguage } = useThemeStore(); // Get the current theme


  const handleLanguageSelection = (selectedLanguage) => {
    if (selectedLanguage !== language) {
      setLanguage(selectedLanguage);
      i18n.locale = selectedLanguage;
    }
  };

  const data = [
    { label: "Deutsch", value: "de", flag: "de" },
    { label: "English", value: "en", flag: "gb" },
    { label: "Ελληνικά", value: "gr", flag: "gr" },
    { label: "Arabic", value: "ar", flag: "sa" },
    { label: "Español", value: "mx", flag: "es" },
    { label: "Italiano", value: "it", flag: "it" },
    { label: "Français", value: "fr", flag: "fr" },
    { label: "Português", value: "pt", flag: "pt" },
    { label: "Русский", value: "ru", flag: "ru" },
    { label: "한국어", value: "kr", flag: "kr" },
    { label: "中文", value: "zh", flag: "cn" },
    { label: "हिन्दी", value: "hi", flag: "in" },
    { label: "українська", value: "ukr", flag: "ua" },
    { label: "Nederlands", value: "nl", flag: "nl" },
    { label: "日本語", value: "jp", flag: "jp" },
  ];
  const Separator = () => <View style={{ marginHorizontal: 30, height: 1, backgroundColor: '#E0E0E0' }} />;

  return (
    <View style={[styles.container, theme === 'dark' && Themestyles.darkContainer]}>
      <Header title={i18n.t("language")} back />
      <FlatList
  data={data}
  renderItem={({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => handleLanguageSelection(item.value)}
    >
      <CountryFlag
        isoCode={item.flag}
        size={18}
        style={styles.flag}
      />
      <Text style={[styles.itemText, { color: theme === 'dark' ? '#ffffff' : '#333333' }]}>
        {item.label}
      </Text>
      {language === item.value && <Text style={styles.checkMark}>✔️</Text>}
    </TouchableOpacity>
  )}
  ItemSeparatorComponent={Separator} // Use custom separator component
  keyExtractor={(item) => item.value}
/>
<View style={{marginBottom:30}} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderBottomColor: '#E0E0E0',
  },
  flag: {
    marginHorizontal: 30,
    borderRadius: 4,
  },
  itemText: {
    fontSize: 16,
  },
  checkMark: {
    fontSize: 10,
    color: 'green',
    marginRight:20,
    marginLeft: 'auto',
  },
});

export default LanguageSelectionScreen;
