import React, { useRef } from 'react';
import { TouchableOpacity, Text, Alert, View } from 'react-native';
import * as Sharing from 'expo-sharing';
import { SvgXml } from 'react-native-svg';
import { captureRef } from 'react-native-view-shot';
import ViewShot from 'react-native-view-shot';
import { Text as CustomText} from '../Text/Text';
import { Ionicons } from '@expo/vector-icons';
const SVG_WIDTH = 1000;
const SVG_HEIGHT = 1000;



const ShareButton = ({ text1 = "What is the thing that actuallly loves you uncondtionally and makes you tick ?", text2 = "I love everrtything about , what if we hit a couple of bars and get some bitches wet willies ?" }) => {
  const ref = useRef(null);




  const convertAndShare = async () => {
    try {
      const uri = await captureSvgAsPng();
      await Sharing.shareAsync('file://' + uri);
    } catch (error) {
      console.error('Error converting and sharing:', error);
      Alert.alert('Error', 'Failed to share image. Please try again.');
    }
  };

  const captureSvgAsPng = async () => {
    try {
      const uri = await captureRef(ref, {
        format: 'png',
        quality: 1,
      });
      return uri;
    } catch (error) {
      console.error('Error capturing SVG as PNG:', error);
      throw error;
    }
  };

  return (
    <TouchableOpacity onPress={convertAndShare}>
      <ViewShot ref={ref} style={{ flex:1, position: 'absolute', right: -(SVG_WIDTH + 5) }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{  height: SVG_HEIGHT, borderRadius: 20, backgroundColor: 'linear-gradient(90deg, rgb(148,87,235), rgb(88,78,160))' }}>
            <View style={{ margin: SVG_HEIGHT * 0.03, width: SVG_WIDTH * 0.7, height: SVG_HEIGHT * 0.5, borderRadius: 20, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 50, fontFamily: 'Verdana', textAlign: 'center' }}>{text1}</Text>
            </View>
        
          <View >
            <Text style={{ fontSize: 50, fontFamily: 'Verdana', textAlign: 'center', color: 'white' }}>{text2}</Text>
          </View>
            </View>
        </View>
      </ViewShot>
      <Ionicons name={'share-outline'} size={25}  />

  
    </TouchableOpacity>
  );
};

export default ShareButton;
