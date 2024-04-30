import React, { useState } from 'react';
import { TouchableOpacity, Text, Image, View, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Ionicons } from '@expo/vector-icons';

const ImageSelection = ({ setBase64ImageData }) => {
  const [selectedImage, setSelectedImage] = useState(null);

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
        const base64 = `data:${response.assets[0].type};base64,${response.assets[0].base64}`;
        setBase64ImageData(base64);
        setSelectedImage(base64);
      }
    });
  };

  const removeImage = () => {
    setBase64ImageData(null);
    setSelectedImage(null);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={selectedImage ? removeImage : openImagePicker}>
      {selectedImage ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedImage }} style={styles.image} />
          <TouchableOpacity onPress={removeImage} style={styles.closeButton}>
            <Ionicons name="close" size={10} color="white" />
          </TouchableOpacity>
        </View>
      ) : (
        <Ionicons name="image" size={20} color="#B623A3" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',

  },
  buttonText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  closeButton: {
    position: 'absolute',
    top: 3,
    right: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 100,
    padding: 5,
  },
});

export default ImageSelection;
