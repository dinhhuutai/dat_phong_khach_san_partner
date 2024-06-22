import {View, Text} from 'react-native';
import React from 'react';
import {globalStyles} from '../styles/globalStyles';
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from 'react-native-gesture-handler';

const RowComponent = ({justify, styles, children, onPress}) => {
  const localStyle = [globalStyles.row, {justifyContent: justify}, styles];

  return onPress ? (
    <GestureHandlerRootView>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={localStyle}>
        {children}
      </TouchableOpacity>
    </GestureHandlerRootView>
  ) : (
    <View style={localStyle}>{children}</View>
  );
};

export default RowComponent;
