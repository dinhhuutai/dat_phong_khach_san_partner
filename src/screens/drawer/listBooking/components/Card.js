import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import moment from 'moment';
import {appColors} from '../../../../constants/appColors';
import {fontFamilies} from '../../../../constants/fontFamilies';
import {useNavigation} from '@react-navigation/native';

const Card = ({data}) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        marginTop: 20,
        borderBottomWidth: 1,
        borderColor: appColors.gray,
        paddingBottom: 20,
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('DetailBookingScreen', {id: data?._id})
            }>
            <Text
              style={{
                color: appColors.primary1,
                textDecorationLine: 'underline',
              }}>
              {data.encodeId}
            </Text>
          </TouchableOpacity>
          <Text style={{marginLeft: 6, color: appColors.text}}>
            ({data.idUser.phone})
          </Text>
        </View>
        <Text style={{color: appColors.text}}>{`${data.price
          .toLocaleString('en-US')
          .replace(/,/g, '.')}.000đ`}</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 8,
        }}>
        <Text>{data.idRoom.name}</Text>

        <View style={{flexDirection: 'row'}}>
          <Text>{`${moment(data.checkIn).format('DD/MM/YYYY')}`}</Text>
          <Text style={{paddingHorizontal: 6}}>-</Text>
          <Text>{`${moment(data.checkOut).format('DD/MM/YYYY')}`}</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 8,
        }}>
        <Text
          style={{
            color: data.isPaid ? appColors.yellow : appColors.text1,
            fontFamily: fontFamilies.semiBold,
          }}>
          {data.isPaid ? 'Đã trả trước' : 'Trả tại khách sạn'}
        </Text>
        <Text
          style={{
            paddingHorizontal: 16,
            paddingVertical: 4,
            backgroundColor:
              data.status === 1
                ? appColors.yellow
                : data.status === 3
                ? appColors.gray1
                : data.status === 4
                ? appColors.yellow1
                : data.status === 2
                ? appColors.green1
                : appColors.gray,
            color: appColors.text,
          }}>
          {data.status === 1
            ? 'Chờ xác nhận'
            : data.status === 3
            ? 'Đã hủy'
            : data.status === 4
            ? 'Đã xác nhận'
            : data.status === 2
            ? 'Đã nhận'
            : 'Khách không nhận phòng'}
        </Text>
      </View>
    </View>
  );
};

export default Card;
