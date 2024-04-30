import React, { useState, useEffect, forwardRef } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Menu from '../../utils/dropDownMenu';
import { useNavigation } from '@react-navigation/native';
import { Themestyles } from '../../screens/styles';
import useThemeStore from '../../store';
import ShareButton from '../Share/Share.js';
import {Text} from '../Text/Text';

const Header = forwardRef(({ title, showHeartButton, showShareButton ,back}, ref) => {
  const navigation = useNavigation();
  const { theme, favorites, addToFavorites, removeFromFavorites } = useThemeStore();
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(showHeartButton);
    } else {
      addToFavorites(showHeartButton);
    }
  };

  useEffect(() => {
    const foundFavorite = favorites.find(item => item.quote === showHeartButton);
    setIsFavorite(foundFavorite ? true : false);
  }, [favorites, showHeartButton]);

  return (
    <SafeAreaView style={[styles.container, theme === 'dark' && Themestyles.darkContainer]}>
      <View style={styles.topBar}>
        <View style={{flex:1}}>

      
        {back ? (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#B623A3" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Ionicons name="menu" size={24} color="#B623A3" />
          </TouchableOpacity>
        )}
        </View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.iconsContainer}>
        {showShareButton && <ShareButton />}
          {/* Add additional icons here */}
          {showHeartButton && (
            <TouchableOpacity onPress={toggleFavorite}>
              <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={24} color="#B623A3" />
            </TouchableOpacity>
          )}
      
        </View>
      </View>
    </SafeAreaView>
  );
});

const styles = {
  container: {
    backgroundColor: 'white',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,


  },
  title: {
    flex: 1,
    fontSize: 18,

    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
  },
  iconsContainer: {

    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    
    justifyContent: 'space-evenly',
  },
};

export default Header;
