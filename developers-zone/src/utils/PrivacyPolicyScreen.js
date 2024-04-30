import React from 'react';
import { View, Text, Linking, StyleSheet, ScrollView } from 'react-native';
import PrivacyPolicy from '../assets/advices/privacyPolicy';

const PrivacyPolicyScreen = () => {
  return (
    <View style={styles.container}>

       <PrivacyPolicy />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
 
  },
});

export default PrivacyPolicyScreen;