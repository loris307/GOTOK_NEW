import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo
import useThemeStore from '../store/index.js'; // Import your Zustand store
import Header from '../components/Header/Header.js';
import i18n from '../../i18n.js';
import { Themestyles } from './styles.js';

const FavoritesScreen = ({ navigation }) => {
  const { favorites, toggleLike, isLive } = useThemeStore(); // Access favorites, toggleLike, and isLive from the store
  const { theme } = useThemeStore(); // Get the current theme
  // Function to render each item in the FlatList
  const renderItem = ({ item }) => {
    console.log('item ==== ',item.quote)
    return(
      <TouchableOpacity onPress={() => navigation.navigate('OutputScreen', { selectedItem: item })}>
        <View style={styles.item}>
          <Text style={styles.title}>{item.quote}</Text>
          <TouchableOpacity onPress={() => toggleLike(item.quote)} style={styles.likeButtonContainer}> 
            <Ionicons name={item.liked ? 'heart' : 'heart-outline'} size={24} color="#B623A3" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  };

  // Render empty list message if favorites is empty
  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{i18n.t('noFavorties')}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.liveIndicatorContainer}>
        {isLive && <Text style={styles.liveIndicator}>Live</Text>}
      </View>
   
      <Header
          title={i18n.t("favorites")} 
          back
        />
  
      <FlatList
      contentContainerStyle={[styles.container,theme === 'dark' && Themestyles.darkContainer]}
        data={favorites}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyList} // Render empty list message
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  
  
  },
  label: {
    fontSize: 25,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    flex: 1, // Allow the title to take up remaining space
  },
  likeButtonContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
  },
  liveIndicatorContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  liveIndicator: {
    backgroundColor: 'red',
    color: 'white',
    padding: 4,
    borderRadius: 8,
    fontWeight: 'bold',
  },
});

export default FavoritesScreen;
