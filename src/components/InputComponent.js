/* eslint-disable prettier/prettier */
import {View, Text, TextInput, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {globalStyles} from '../styles/globalStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {EyeSlash} from 'iconsax-react-native';
import {appColors} from '../constants/appColors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const InputComponent = ({
  value,
  onChange,
  affix,
  placeholder,
  suffix,
  isPassword,
  allowClear,
  type,
  stylesO,
  stylesInput,
  maxLength,
}) => {
  const [isShowPass, setIsShowPass] = useState(isPassword ?? false);

  return (
    <View style={[styles.inputContainer, stylesO]}>
      {affix ?? affix}
      <TextInput
        style={[styles.input, globalStyles.text, stylesInput]}
        value={value}
        placeholder={placeholder || ''}
        onChangeText={val => onChange(val)}
        secureTextEntry={isShowPass}
        placeholderTextColor={'#747688'}
        keyboardType={type || 'default'}
        autoCapitalize="none"
        maxLength={maxLength}
      />
      {suffix ?? suffix}
      <GestureHandlerRootView style={{justifyContent: 'flex-end'}}>
        <TouchableOpacity
          onPress={
            isPassword ? () => setIsShowPass(prev => !prev) : () => onChange('')
          }>
          {isPassword ? (
            <FontAwesome
              name={isShowPass ? 'eye-slash' : 'eye'}
              size={22}
              color={appColors.text}
            />
          ) : (
            value &&
            value.length > 0 &&
            allowClear && (
              <AntDesign name="close" size={22} color={appColors.text} />
            )
          )}
        </TouchableOpacity>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appColors.text,
    minHeight: 56,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: appColors.white,
    marginBottom: 19,
  },

  input: {
    padding: 0,
    margin: 0,
    flex: 1,
    paddingHorizontal: 14,
    color: appColors.text,
  },
});

export default InputComponent;
