import {View, Text, Image} from 'react-native';
import React from 'react';
import { appColors } from '../constants/appColors';

const CardDebit = ({number, name, exp}) => {
  return (
    <View>
      <Image
        style={{width: '100%', height: 200, borderRadius: 12}}
        source={require('../assets/images/debit-card.png')}
      />
      <Text
        style={{
          position: 'absolute',
          top: 70,
          left: 30,
          color: appColors.white,
          fontSize: 18,
        }}>
        {number
          ? `${number.slice(0, 4)} **** **** ${number.slice(-4)}`
          : 'XXXX XXXX XXXX'}
      </Text>
      <Text
        style={{
          position: 'absolute',
          top: 120,
          left: 30,
          color: appColors.white,
          fontSize: 20,
        }}>
        {name ? name : 'XXXXX XXX X'}
      </Text>
      <Text
        style={{
          position: 'absolute',
          top: 160,
          left: 30,
          color: appColors.white,
          fontSize: 16,
        }}>
        {`exp ${exp ? exp : 'XX/XX'}`}
      </Text>
    </View>
  );
};

export default CardDebit;
