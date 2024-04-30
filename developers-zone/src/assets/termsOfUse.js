import React from 'react';
import { View, StyleSheet } from 'react-native';
import {Text} from '../components/Text/Text';
import { Themestyles } from '../screens/styles';
import useThemeStore from '../store';
import Header from '../components/Header/Header';
import { ScrollView } from 'react-native-gesture-handler';
import i18n from '../../i18n';

const TermsOfUseText = () => {
  const { theme} = useThemeStore();
  return (
    <View style={[styles.container,theme ===  'dark' && Themestyles.darkBorderContainer]}>
       
        <Header
    title={i18n.t("termsOfUse")} 
   back
  />
    <ScrollView>
      <View style={{padding: 20,marginBottom: 40,backgroundColor:'white'}}>
      <Text style={styles.headingzwei}>1. Introduction</Text>
      <Text>Welcome to GoTok These Terms of Use ("Terms") govern your access to and use of our app and services, including any content and functionality offered on or through GoTok (collectively, the "Services"). By using our Services, you agree to be bound by these Terms.</Text>
      <Text style={styles.headingzwei}>2. Eligibility</Text>
      <Text>To use the Services, you must be at least 18 years old. By using our Services, you represent and warrant that you meet the eligibility requirement. If you do not meet the eligibility requirement, you must not access or use the Services.</Text>
      <Text style={styles.headingzwei}>3. Acceptable Use</Text>
      <Text>You agree to use the Services only for lawful purposes and in accordance with these Terms. You must not use the Services in any way that violates any applicable local, national, or international law or regulation.</Text>
      <Text style={styles.headingzwei}>4. User Content and Conduct</Text>
      <Text>GoTok is not responsible for any user-generated content, such as conversation starters or advice, that may be provided through the use of our Services. You are solely responsible for your use of the Services and any consequences resulting from your actions, including any interactions you have with other users.</Text>
      <Text style={styles.headingzwei}>5. Prohibited Uses</Text>
      
      <Text style={styles.textpointfive}>You agree not to use the Services to:</Text>
      <Text style={styles.textpointfive}>a. Engage in any conduct that is harmful, harassing, threatening, abusive, or otherwise objectionable.</Text>
      <Text style={styles.textpointfive}>b. Interact with or attempt to interact with any person who is under 18 years old in a manner that is inappropriate or manipulative.</Text>
      <Text style={styles.textpointfive}>c. Violate any applicable laws, regulations, or the rights of others, including intellectual property rights.</Text>
      <Text style={styles.headingzwei}>6. Disclaimer of Warranties and Limitation of Liability</Text>
      <Text>GoTok and its licensors, service providers, and suppliers make no representations or warranties about the accuracy, reliability, completeness, or timeliness of the content or advice provided through the Services. Your use of the Services is at your own risk.</Text>
      <Text style={styles.headingzwei}>7. Indemnifications</Text>
      <Text>You agree to indemnify and hold harmless GoTok, its officers, directors, employees, and agents from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your use of the Services or your violation of these Terms.</Text>
      <View style={{height: 200}}/>
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    alignSelf: 'center',
  },
  headingzwei: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  textpointfive: {
    marginBottom: 10,
  },
});

export default TermsOfUseText;