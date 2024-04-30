import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useVoiceRecognition } from '../../hooks/useVoiceRecognition';

const RecordButton = ({ receivedText ,style}) => {
  const { state, startRecognizing, stopRecognizing, destroyRecognizer } = useVoiceRecognition();
  const [previousSentence, setPreviousSentence] = useState('');

  const handlePressIn = () => {
    startRecognizing(); 
  };

  const handlePressOut = () => {
    stopRecognizing(); 
  };

  useEffect(() => {
    if (state?.partialResults?.length > 0) {
      const newSentence = state.partialResults[0];
      const newWord = getNewWord(newSentence,previousSentence);
      setPreviousSentence(newSentence);
      receivedText(newWord);
    }
  }, [state]);


  const getNewWord = (newSentence, oldSentence) => {
    const newSentenceArray = newSentence.split(' ');
    const oldSentenceArray = oldSentence.split(' ');

    const newWord = newSentenceArray.find(word => !oldSentenceArray.includes(word));

    return newWord ? newWord : '';
  };

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
     
    >
      <View style={styles.iconContainer}>
        <Ionicons name={state.isRecording ? 'mic' : 'mic-outline'} size={20} color="#B623A3" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    borderWidth: 0,
    height: 50,
    borderColor : '#f9c2ff',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  iconContainer: {
    
    borderRadius: 10,
    padding: 5,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
    color: 'white',
  },
});

export default RecordButton;
