import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import Header from '../../components/Header/Header';
import i18n from '../../../i18n';
import {Text} from '../../components/Text/Text';
import { Themestyles } from '../../screens/styles';
import useThemeStore from '../../store';
import { ScrollView } from 'react-native-gesture-handler';

const PrivacyPolicy = () => {
  const { theme } = useThemeStore(); // Get the current theme
  return (
    <View style={[styles.container,theme ===  'dark' && Themestyles.darkBorderContainer]}>
       
        <Header
    title={i18n.t("privacyPolicy")} 
   back
  />
    <ScrollView>
    <View style={{padding: 20,marginBottom: 40}}>
      <Text style={styles.headingzwei}>1. Introduction</Text>
      <Text>GoTok AI built the GoTok AI app as a Freemium app. This SERVICE is provided by GoTok AI at no cost and is intended for use as is. This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service. If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.</Text>
      <Text style={styles.headingzwei}>2. Information Collection and Use</Text>
      <Text>For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to Name, Email, Gender, Age. The information that we request will be retained by us and used as described in this privacy policy. The app does use third-party services that may collect information used to identify you. Link to the privacy policy of third-party service providers used by the app</Text>
      <View style={{marginTop: 15}}>
          <Text style={styles.link} onPress={() => Linking.openURL('https://www.google.com/policies/privacy/')}>
            Google Play Services
          </Text>
          <Text style={styles.link} onPress={() => Linking.openURL('https://firebase.google.com/policies/analytics')}>
            Google Analytics for Firebase
          </Text>
          <Text style={styles.link} onPress={() => Linking.openURL('https://firebase.google.com/support/privacy/')}>
            Firebase Crashlytics
          </Text>
          <Text style={styles.link} onPress={() => Linking.openURL('https://expo.io/privacy')}>
            Expo
          </Text>
        </View>
      
      <Text style={styles.headingzwei}>3. Log Data</Text>
      <Text>We want to inform you that whenever you use our Service, in a case of an error in the app we collect data and information (through third-party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.</Text>
      
      <Text style={styles.headingzwei}>4. Cookies</Text>
      <Text style={styles.textpointfive}>Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory. This Service does not use these “cookies” explicitly. However, the app may use third-party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.</Text>
      
      <Text style={styles.headingzwei}>5. Service Providers</Text>
      <Text>We may employ third-party companies and individuals due to the following reasons:</Text>
      <Text style={styles.textpointfive}>a. To facilitate our Service;</Text>
      <Text style={styles.textpointfive}>b. To provide the Service on our behalf;</Text>
      <Text style={styles.textpointfive}>c. To perform Service-related services; or</Text>
      <Text style={styles.textpointLast}>d. To assist us in analyzing how our Service is used.</Text>
      <Text>We want to inform users of this Service that these third parties have access to their Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.</Text>

      <Text style={styles.headingzwei}>6. Links to Other Sites</Text>
      <Text>This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</Text>
      
      <Text style={styles.headingzwei}>7. Children’s Privacy</Text>
      <Text>These Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13 years of age. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do the necessary actions.</Text>
      
      <Text style={styles.headingzwei}>8. Changes to This Privacy Policy</Text>
      <Text>We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. This policy is effective as of 2023-06-15</Text>
      
      <Text style={styles.headingzwei}>9. Contact Us</Text>
      <Text>If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at gallerloris@gmail.com.</Text>
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
    marginTop: 10,
  },

  textpointLast: {
    marginTop: 10,
    marginBottom: 14,
  },

  link: {
    color: 'blue',
    marginBottom: 10,
  },
});

export default PrivacyPolicy;