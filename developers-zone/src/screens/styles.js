
import React from 'react';
import { StyleSheet } from 'react-native';

export const Themestyles = StyleSheet.create({
    darkContainer: {
        backgroundColor: '#333333', // Dark mode background color
    },
    darkBorderContainerTextColor:{


    },
    darkText: {

        color: '#ffffff'
    },
    darkContent: {

        color: '#ffffff'
    },
    darkButton: {


        padding: 10,
        borderColor: '#FFFFFF', // Adjust border color for better contrast
        backgroundColor: '#333333', // Dark background color


    },
    darkBorderContainer: {
        backgroundColor: '#333333', // Dark mode background color
        borderColor: '#ffffff'
    },
    darkTextInput:{
        color: 'red'
    },

    darkImage: {
        tintColor: '#ffffff'
    },
    darkIcon: {

        borderRadius: 16,
        shadowColor: '#FFFFFF', // Adjusted shadow color for better contrast
        shadowOffset: { width: 3, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 15,
        transform: [{ scale: 1.07 }],
        backgroundColor: '#333333', // Dark background color
    }
    
})