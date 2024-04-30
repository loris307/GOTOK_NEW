import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text as TXT , TouchableOpacity, Keyboard, Image, TouchableWithoutFeedback, ActivityIndicator, Modal, Alert} from 'react-native';
import Slider from '@react-native-community/slider';
//import DropDownPicker from 'react-native-dropdown-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  useFonts,
  Montserrat_100Thin,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
} from "@expo-google-fonts/montserrat";
//import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

//functions 
import 'firebase/functions';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from 'developers-zone/firebase.js';

import { useContext } from 'react';
//import { UserContext } from 'developers-zone/src/utils/UserProvider.js';

const functions = getFunctions(app);




import useThemeStore from '../store/index.js';
import i18n from '../../i18n';
import UserContext from '../utils/UserContext';
import { Themestyles } from './styles.js';
import Header from '../components/Header/Header.js';

import PremiumScreenPopUp from '../modals/PremiumScreenPopUp.js';
import RecordButton from '../components/RecordButton/RecordButton.js';
import ImageSelection from '../components/ImageSelection/ImageSelection.js';
import { ScrollView } from 'react-native-gesture-handler';
import {Text} from '../components/Text/Text.js';



const ConversationStarterPrem = ({navigation, route}) => {
  const [gender, setGender] = useState('');
  const [input3, setInput3] = useState('');
  const charLimit = 275; 
  const charLimitGender = 20; 
  const [errorMessage, setErrorMessage] = useState(null);
  const { theme } = useThemeStore(); 
  const [base64ImageData, setBase64ImageData] = useState('');

  const { isPremium, setIsPremium } = useContext(UserContext);

  const [showPremiumPopup, setShowPremiumPopup] = useState(false);

  //for ads
  //const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';


  //Input Situation char limit 
  const handleInputChange = (text) => {
    if (text.length <= charLimit) {
      setInput3(text);
    }
  }

  //Gender Input char limit
  const handleInputChange2 = (text) => {
    if (text.length <= charLimitGender) {
      setGender(text);
    }
  }

  //loading state
  const [loading, setLoading] = useState(false);

  let selectedIcon ='';
    if(route.params != undefined){
        selectedIcon = route.params.title;
        console.log(selectedIcon);
    }

  const [selectedStyleIcon, setSelectedStyleIcon] = useState(null);

  //Age Range
  const [age, setAge] = useState(18); // Initial age value

  const handleAgeChange = (value) => {
    setAge(value); // Update the age value when the slider value changes
  };

  //Icons for the Style
  const handleIconPress = (iconName) => { // iconName is the name of the icon that was pressed
    setSelectedStyleIcon(iconName); // Update the state with the name of the icon that was pressed
    console.log(iconName);
  };

  const isIconSelected = (iconName) => { // iconName is the name of the icon that we want to check if it is selected
    return iconName === selectedStyleIcon; // Return true if the icon is selected, false otherwise
  };



  //Count

const [count, setCount] = useState(1);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };



  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        console.log('got image === ',response.assets[0].type)
        console.log('got image === ',response.assets[0].base64)
        const base64 = `data:${response.assets[0].type};base64,${response.assets[0].base64}`;
        setBase64ImageData(base64); 
      }
    });
  };



  const send = async () => {
    // Prepare the data object
    const formData = {
      Gender: "Talking to: "+gender,
      Count: "Number of people: "+count,
      Situation: "The Scenario is:  "+input3,
      Style: "Output Style: "+selectedStyleIcon,
      Age: "Age: "+age,
      Occasion: "Occasion: "+selectedIcon,
      Location: "Output Language: "+i18n.locale,
      base64ImageData
    };
  
    //console.log(counter); //Kann ich viellecicht noch verwenden, um die Anzahl der Prompts user anzuzeigen
    //setCounter(counter + 1);



    setLoading(true); // Set loading to true when the send button is pressed
  
    // Prepare the data for the Cloud Function
    //const prompt = "Generate a creative, situation-specific, and culturally-sensitive conversation starter line that combines the talking styles of the worlds most renowned dating experts and stand-up comedians. The pickup line should be concise, strictly within 50 words, and based on user-provided details, including occasion, person description, current activity, and overall vibe. Remember always to never mention and refer the name of the dating expert or stand-up comedian at the prompt generation result. Ensure the pickup line is engaging, not cheesy or slimy, and functions as an icebreaker with subtle flirty undertones. Consider local customs, social norms, and regional language variations while crafting the line. The language of the Output is always specified. Only use the specified language for your Output.";
    const prompt = 'Generate a short, creative, context-specific, and culturally-sensitive conversation starter line that combines the talking styles of renowned stand-up comedians and top-notch dating experts, without explicitly naming any. The pickup line should be engaging, original, not cheesy, and serve as an entertaining icebreaker with subtle flirty undertones. Keep it within a 25-word limit, based on user input details such as who the user is talking to, the number of people involved, the scenario, the users preferred output style, the age of the person the user is talking to, the occasion, and the preferred output language. Use this information as context for generating a suitable line, not as a source for direct quotations. Adjust to local customs, social norms, and regional language variations. Always generate the output in the specified language. Do not include additional comments or notes using brackets, asterisks, or colons. For example: User Input: User is talking to: female, Number of people:1, The scenario is: She is doing cocaine at the bar non-stop, Preferred Output Style: slang, Age of the Person User is Talking to: 90, Occasion: Night Club, Preferred Output Language: en | Output: Hey Grandma, you sure are giving that coke the respect it deserves! You remind me of a cross between a boss and Betty Whit. Mind if I join in and we keep this party all night long?';
    const concatenatedString = Object.values(formData)
        .filter((input) => input !== "") // Filter out any empty inputs
        .join(", "); // Join inputs with ", "
  
    console.log('floooosh ====',concatenatedString);
  
    // Call the Cloud Function
    const generateConversationStarter = httpsCallable(functions, 'generateConversationStarter2');
    try {
      const response = await generateConversationStarter({ prompt, concatenatedString, isPremium });
      setLoading(false);
      const text = response.data;
      console.log(text);
      let pass = text;
      let iconpass = selectedStyleIcon;
      navigation.navigate('OutputScreen', { pass, iconpass, formData });
  } catch (error) {
    console.log(error);
    if (!isPremium) {
      setLoading(false)
        setShowPremiumPopup(true);
    } else {
        Alert.alert(
            "Error", 
            error.message,
            [
                {text: "OK", onPress: () => console.log("OK Pressed")}
            ],
            { cancelable: false }
        );
    }
}







  
    
  };

  const closeErrorModal = () => { //---------------------------------------------
    setErrorMessage(null);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

    
<View style={[styles.mainContainer,theme === 'dark' && Themestyles.darkContainer]}>


    <Header 
        title={i18n.t("titleConvPrem")}
        back
    />
    <ScrollView>
    <View style={[styles.contentContainer,theme === 'dark' && Themestyles.darkContainer]}>
      

      <View style={styles.containerGenNum}>
        <View style={styles.talkingTo}>
            <Text style={styles.buttonText}>{i18n.t("talkingto")}</Text>
            <TextInput
             style={[styles.input,theme === 'dark' && Themestyles.darkBorderContainer ,theme === 'dark' &&  Themestyles.darkText]}
          placeholderTextColor={theme === 'dark' && '#6b6b6b' }
            value={gender}
            placeholder={i18n.t("talkingtoPlaceholder")}
            onChangeText={handleInputChange2}
            />
        </View>
        

        <View >
            <Text style={styles.buttonText}>{i18n.t("count")}</Text>
            
            <View>


                <View style={styles.containerCount}>
                    <TouchableOpacity onPress={decrementCount} style={[styles.buttonCount , theme === "dark" && Themestyles.darkContainer]}>
                        <TXT style={styles.buttonCountText}>-</TXT>
                    </TouchableOpacity>
                        <View style={[styles.countTextContainer,theme === 'dark' && Themestyles.darkContainer]}>
                          <Text style={styles.countText}>{count}</Text>
                        </View> 
                        <TouchableOpacity onPress={incrementCount} style={[styles.buttonCount , theme === "dark" && Themestyles.darkContainer]}>
                        <TXT style={styles.buttonCountText}>+</TXT>
                    </TouchableOpacity>
                </View>

            </View>
            
            
        </View>
        
      </View>
      
      

    <View style={styles.situationContainer}>
    <View style={[styles.tellGoTok,theme === 'dark' && Themestyles.darkBorderContainer]}>
          <Text style={styles.buttonText}>{i18n.t("descriptionSuggestion1")}</Text>
        </View>

      <TextInput
        style={[{...styles.input, ...styles.descriptionInput},theme === 'dark' && Themestyles.darkBorderContainer  ,theme === 'dark' &&  Themestyles.darkText]}
        placeholderTextColor={theme === 'dark' && '#6b6b6b' }
        value={input3}
        onChangeText={handleInputChange}
        multiline={true}
        numberOfLines={4}
        placeholder={i18n.t("situationPlaceHolder")}
        blurOnSubmit={true}
        textAlignVertical='top'  
      />
      <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
      
      <Text style={styles.tellGoTokText} >{`${charLimit - input3.length} ${i18n.t("charactersRemaining")}`}</Text>
   
      <View style={{justifyContent:'flex-end',flexDirection:'row'}}>
      <ImageSelection setBase64ImageData={setBase64ImageData} /> 
     
      <RecordButton  receivedText={(stt)=>{
  console.log('my text ==== ',stt)

 stt && handleInputChange((text ) => text + stt+ ' ')
}}/>

      </View>
      </View>
     <Text style={styles.tellGoTokText} >add an image</Text>
   
    



      


    </View>

      <View>
      <Text style={styles.buttonText} >{i18n.t("outputStyle")}</Text>
      <View style={[styles.iconRow]}>
        <TouchableOpacity
            style={[styles.firstIcon,theme === 'dark' && Themestyles.darkContent, isIconSelected('funny') && styles.selectedIcon]}
            onPress={() => handleIconPress('funny')}
        >
          <Image
            source={
              isIconSelected('funny')
                ? require('developers-zone/src/assets/StyleIcons/FunnyDoc.png')
                : require('developers-zone/src/assets/newStyleIcons/funny.png')
            }
            style={[styles.image, isIconSelected('funny') && styles.selectedImage]}
          />
        </TouchableOpacity>

        <TouchableOpacity
            style={[styles.icon, isIconSelected('friendly') && styles.selectedIcon]}
            onPress={() => handleIconPress('friendly')}
        >
          <Image
            source={
              isIconSelected('friendly')
                ? require('developers-zone/src/assets/StyleIcons/friendly.png')
                : require('developers-zone/src/assets/newStyleIcons/friendly.png')
            }
            style={[styles.image, isIconSelected('friendly') && styles.selectedImage]}
          />
        </TouchableOpacity>

        <TouchableOpacity
            style={[styles.icon, isIconSelected('Romantic') && styles.selectedIcon]}
            onPress={() => handleIconPress('Romantic')}
        >
          <Image
            source={
              isIconSelected('Romantic')
                ? require('developers-zone/src/assets/StyleIcons/RomanticDoc.png')
                : require('developers-zone/src/assets/newStyleIcons/Romantic.png')
            }
            style={[styles.image, isIconSelected('Romantic') && styles.selectedImage]}
          />
        </TouchableOpacity>

        <TouchableOpacity
            style={[styles.icon, isIconSelected('Slang') && styles.selectedIcon]}
            onPress={() => handleIconPress('Slang')}
        > 
          <Image
            source={
              isIconSelected('Slang')
                ? require('developers-zone/src/assets/StyleIcons/SlangDoc.png')
                : require('developers-zone/src/assets/newStyleIcons/Slang.png')
            }
            style={[styles.image, isIconSelected('Slang') && styles.selectedImage]}
          />
        </TouchableOpacity>


      </View>
      </View>
      

        <View style={styles.ageContainer}>
            <Text style={styles.buttonText}>{i18n.t("age")} {age}</Text>
            <Slider
                style={{ width: '80%', alignSelf: 'center', marginTop: 10}}
                minimumValue={18} // Minimum age value
                maximumValue={90} // Maximum age value
                step={2} // Increment step
                value={age} // Current age value
                onValueChange={handleAgeChange} // Handle age change
                minimumTrackTintColor={theme === 'dark' ?  '#ffffff' :'#333333'} 
                thumbTintColor={theme === 'dark' ?  '#ffffff' :'#333333'}  
                maximumTrackTintColor={theme === 'dark' ?  '#ffffff' :'#333333'} 
                 />
        </View>
      


        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonSend} onPress={send} disabled={loading}>
            {loading ? (
            <ActivityIndicator size="small" color="white" /> // Show loading spinner if loading
            ) : (
            <Text style={styles.generatebuttonText}>{i18n.t("sendPromptbtn")}</Text> // Show button text if not loading
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
   
  </View>

  {/* <View style={styles.bannerContainer}> Das hier brauch ich wieder für die Ads
  {!isPremium && (
    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
  )}
</View> */}


    </View>
    </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={!!errorMessage}
        onRequestClose={closeErrorModal}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{errorMessage}</Text>
          <TouchableOpacity
            style={{ ...styles.openButton}}
            onPress={closeErrorModal}
          >
            <Text style={styles.textStyle}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* {!isPremium && (
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        />
)} */}
      
      {showPremiumPopup && <PremiumScreenPopUp onClose={() => setShowPremiumPopup(false)} navigation={navigation} />}

    </View>


    
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex:1,
        backgroundColor: '#fff',


    },

    contentContainer: {
        //flex: 1,
        padding:  25,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },

    bannerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',  // Optionally, for vertical centering
      width: '100%',
    },

    input: {
        height: 36,
        marginTop: 10,
        width: '80%',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        padding: 10,
    },
    descriptionInput: {
        height: 80,
        width: '100%',
        paddingTop:15,
    },

    //Button

    buttonContainer: {
        alignItems: 'center',
        //marginTop: 20,
    },


    buttonSend: {
        backgroundColor: '#B623A3',
        padding: 10,
        width: '90%',
        borderRadius: 10,
        alignItems: 'center',

    },
    buttonText: {
        
        color: '#000000',
    },
    generatebuttonText: {
        
      color: '#ffffff',
  },

    //Gender und count

    containerGenNum: {
        flexDirection: 'row',
        //alignItems: 'center',
        width: '50%',
        //justifyContent: 'space-between',
        //width: '100%',
        marginBottom: 10,
    },

    talkingTo: {
      fontFamily:'Montserrat_300Light',
        marginRight: 10,
        width: '100%',
    },

        //Counter
    containerCount: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        marginTop: 10,
      },

      countTextContainer: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        height: 50,
        backgroundColor: '#B623A3',
        borderColor: '#B623A3',
      },

      buttonCount: {
        margin: 3,
        width: '22%',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#B623A3',
        backgroundColor: '#ffffff',
      },

      buttonCountText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#B623A3',
      },
      countText: {
        fontSize: 18,
        color: 'white',
      },

    //Situation 
    
    situationContainer: {
      
    },

    tellGoTok: {
        //flexDirection: 'row',
        //alignItems: 'center',
 
    },

    tellGoTokText: {
        fontSize: 10,
        color: 'grey',
        marginTop: 2,
    },

    examplesContainer: {
        marginLeft: 10,
      },
    

    //Icons bzw. Style  
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        width: '90%',
        zIndex: 100,
    },

    icon: {
        padding: 1,
        marginLeft: 5,
        elevation: 10,
        paddingLeft: 0,
        shadowColor: '#B623A3',
        shadowOffset: { width: 3, height: 5 },
        shadowOpacity: 1,
        
        zIndex: 100,
    },

    firstIcon:{
        padding: 1,
        paddingLeft: 0,
        elevation: 10,
        marginLeft: 0,
        shadowColor: '#B623A3',
        shadowOffset: { width: 3, height: 5 },
        shadowOpacity: 1,
        zIndex: 100,
        
    },

    
    
    selectedIcon: {
        borderRadius: 16,
        shadowColor: '#B623A3',
        shadowOffset: { width: 3, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 15,
        transform: [{ scale: 1.07 }],
      },

    

    image: {
        width: 75,
        height: 75, 
        alignSelf: 'center', 
        resizeMode: 'contain',
        marginLeft: 1,
    },

    ageContainer: {
        marginBottom: 20,
        marginTop: 40,
    },

    buttonBack: { //------>
      padding: 10,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#B623A3',
      width: '90%',
      marginTop: 10,
    },

    buttonBackText: {//------>
      color: '#B623A3',
      textAlign: 'center',
      //fontSize: 16,
    },

    modalView: {
      position: 'absolute',
      top: '40%',
      left: '10%',
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      width: '80%', // This makes the modal 80% of the screen width
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    openButton: {
      backgroundColor: '#B623A3',
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      width: '80%', // This makes the button 80% of the modal width
      alignSelf: 'center', // This centers the button within the modal
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    

    

});

export default ConversationStarterPrem;