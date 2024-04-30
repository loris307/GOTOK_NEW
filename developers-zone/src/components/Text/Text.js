import React from 'react';
import { Text as TXT} from 'react-native';
import useThemeStore from '../../store/index.js';
import { Themestyles } from '../../screens/styles.js';
export  const Text = ({ children, style }) => {
  const { theme } = useThemeStore();
  return (
    <TXT style={[style, theme === 'dark' && Themestyles.darkText]}>{children}</TXT>
  );
};


