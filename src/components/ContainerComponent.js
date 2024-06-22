/* eslint-disable react-native/no-inline-styles */
import {View, ImageBackground, ScrollView, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {globalStyles} from '../styles/globalStyles';
import {useNavigation} from '@react-navigation/native';
import {RowComponent, TextComponent} from '.';
import {ArrowLeft} from 'iconsax-react-native';
import {appColors} from '../constants/appColors';
import {
  TouchableOpacity,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {fontFamilies} from '../constants/fontFamilies';
import {Text} from 'react-native';
import {Add} from 'iconsax-react-native';

const ContainerComponent = ({
  isImageBackground,
  isScroll,
  title,
  children,
  styles,
  back,
  next,
  onNext,
  onScrollPosition,
}) => {
  const navigation = useNavigation();

  const handleScroll = event => {
    const position = event.nativeEvent.contentOffset.y;
    if (onScrollPosition) {
      onScrollPosition(position);
    }
  };

  const headerComponent = () => {
    return (
      <View style={{flex: 1, paddingTop: back ? 30 : 0}}>
        {(title || back) && (
          <RowComponent
            styles={{
              paddingHorizontal: 16,
              paddingVertical: 10,
              minWidth: 48,
              minHeight: 48,
              justifyContent: 'space-between',
            }}>
            {back ? (
              <GestureHandlerRootView>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{
                    marginRight: 12,
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    backgroundColor: appColors.gray,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ArrowLeft size={24} color={appColors.text} />
                </TouchableOpacity>
              </GestureHandlerRootView>
            ) : (
              <View
                onPress={() => navigation.goBack()}
                style={{
                  marginRight: 12,
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}></View>
            )}

            {title && (
              <TextComponent size={18} text={title} font={fontFamilies.bold} />
            )}

            {next ? (
              <GestureHandlerRootView>
                <TouchableOpacity
                  onPress={() => onNext()}
                  style={{
                    marginRight: 12,
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    backgroundColor: appColors.gray,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Add size={24} color={appColors.text} />
                </TouchableOpacity>
              </GestureHandlerRootView>
            ) : (
              <View
                onPress={() => navigation.goBack()}
                style={{
                  marginRight: 12,
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}></View>
            )}
          </RowComponent>
        )}
        {returnContainer}
      </View>
    );
  };

  const returnContainer = isScroll ? (
    <ScrollView
      onScroll={handleScroll}
      showsVerticalScrollIndicator={false}
      style={[globalStyles.container, {backgroundColor: 'transparent'}]}>
      {children}
    </ScrollView>
  ) : (
    <View style={[globalStyles.container, {backgroundColor: 'transparent'}]}>
      {children}
    </View>
  );
  return isImageBackground ? (
    <ImageBackground
      source={require('../assets/images/bg-boarding.png')}
      style={{flex: 1}}
      imageStyle={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>{headerComponent()}</SafeAreaView>
    </ImageBackground>
  ) : (
    <SafeAreaView style={[globalStyles.container]}>
      <View style={{flex: 1}}>{headerComponent()}</View>
    </SafeAreaView>
  );
};

export default ContainerComponent;
