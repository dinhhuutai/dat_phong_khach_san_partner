import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import moment from 'moment';
import {appColors} from '../../../../constants/appColors';
import {fontFamilies} from '../../../../constants/fontFamilies';
import {useNavigation} from '@react-navigation/native';

const Card = ({data, idHotel}) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        marginTop: 20,
        borderBottomWidth: 1,
        borderColor: appColors.gray,
        paddingBottom: 20,
        backgroundColor: appColors.white,
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('DetailRoomScreen', {
                id: data?._id,
                idHotel: idHotel,
              })
            }>
            <Text
              style={{
                color: appColors.primary1,
                textDecorationLine: 'underline',
              }}>
              {data.name}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: 100,
            height: 30,
            backgroundColor: data.status ? appColors.green1 : appColors.gray,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: appColors.text}}>
            {data.status ? 'Hoạt động' : 'Vô hiệu'}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              color: appColors.text,
            }}>
            Price
          </Text>
        </View>
        <Text style={{color: appColors.text}}>{`${data.price
          .toLocaleString('en-US')
          .replace(/,/g, '.')}.000đ`}</Text>
      </View>
    </View>
  );
};

export default Card;
