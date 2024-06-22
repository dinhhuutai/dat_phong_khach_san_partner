/* eslint-disable prettier/prettier */
import { Text } from 'react-native';
import React from 'react';
import { appColors } from '../constants/appColors';
import { fontFamilies } from '../constants/fontFamilies';
import { globalStyles } from '../styles/globalStyles';

const TextComponent = ({ text, color, size, flex, font, styles, title }) => {
  return (
    <Text
      style={[
        globalStyles.text,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          fontSize: size || (title ? 24 : 14),
          flex: flex || 0,
          color: color || appColors.text,
          fontFamily:
            font || (title ? fontFamilies.bold : fontFamilies.regular),
        },
        styles,
      ]}>
      {text}
    </Text>
  );
};

export default TextComponent;
