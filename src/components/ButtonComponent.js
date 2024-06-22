/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {TextComponent} from '.';
import {appColors} from '../constants/appColors';
import {globalStyles} from '../styles/globalStyles';
import {fontFamilies} from '../constants/fontFamilies';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const ButtonComponent = ({
  icon,
  text,
  type,
  color,
  styles,
  textColor,
  textStyles,
  textFont,
  iconFlex,
  onPress,
}) => {
  return type === 'primary' ? (
    <GestureHandlerRootView style={{width: '100%'}}>
      <TouchableOpacity
        onPress={onPress}>
        <LinearGradient
          style={[
            globalStyles.button,
            globalStyles.shadow,
            {
              backgroundColor: color,
              marginBottom: 17,
              flex: 1
            },
            styles,
          ]}
          colors={['#2D2D2D', '#2194FF']}
          start={{x: 0.5, y: 0.5}}
          end={{x: 1, y: 1}}
          locations={[0, 0.9167]}>
          {icon && iconFlex === 'left' && icon}
          <TextComponent
            text={text}
            color={textColor || appColors.white}
            styles={[
              textStyles,
              {marginLeft: icon ? 12 : 0, textAlign: 'center'},
            ]}
            flex={icon && iconFlex === 'right' ? 1 : 0}
            font={textFont || fontFamilies.medium}
            size={16}
          />
          {icon && iconFlex === 'right' && icon}
        </LinearGradient>
      </TouchableOpacity>
    </GestureHandlerRootView>
  ) : (
    <GestureHandlerRootView>
      <TouchableOpacity onPress={onPress}>
        <TextComponent
          text={text}
          color={type === 'link' ? appColors.text : textColor}
          font={textFont || fontFamilies.medium}
          styles={styles}
        />
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
};

export default ButtonComponent;
