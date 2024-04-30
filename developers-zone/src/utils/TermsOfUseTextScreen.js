import React from 'react';
import { View, Text, Linking, StyleSheet, ScrollView } from 'react-native';
import TermsOfUseText from '../assets/termsOfUse';

const TermsOfUseTextScreen = () => {
  return (
    <View style={styles.container}>

       <TermsOfUseText />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white'
  },
});

export default TermsOfUseTextScreen;