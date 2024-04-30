import LoginScreen from "../screens/LoginScreen";
import SignUpForm from "../screens/SignUpForm";
import TermsOfUseScreen from "../screens/TermsOfUseComponent";
import LoginSignUp from "../screens/loginSignUp";
import PrivacyPolicyScreen from "../utils/PrivacyPolicyScreen";
import TermsOfUseTextScreen from "../utils/TermsOfUseTextScreen";

  export const NonAuthNavigator = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="loginSignUp" component={LoginSignUp} />
        <Stack.Screen options={{headerShown: false}} name="LoginScreen" component={LoginScreen} />
        <Stack.Screen options={{headerShown: false}} name="SignUpForm" component={SignUpForm} />
        <Stack.Screen options={{headerShown: false}} name="TermsOfUseScreen" component={TermsOfUseScreen} />
        <Stack.Screen options={{headerShown: false}} name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} />
        <Stack.Screen options={{headerShown: false}} name="TermsOfUseTextScreen" component={TermsOfUseTextScreen} />
      </Stack.Navigator>
    );
  };