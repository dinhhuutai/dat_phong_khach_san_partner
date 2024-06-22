import {View, Text} from 'react-native';
import React from 'react';
import {RowComponent, SpaceComponent} from '../../../../components';
import {appColors} from '../../../../constants/appColors';
import {fontFamilies} from '../../../../constants/fontFamilies';

const Card = ({data}) => {
  return (
    <View
      style={{
        width: '100%',
        marginTop: 10,
        borderBottomWidth: 1,
        borderColor: appColors.gray,
        paddingBottom: 10,
      }}>
      <RowComponent styles={{justifyContent: 'space-between'}}>
        <Text style={{fontSize: 16, fontFamily: fontFamilies.medium}}>
          {data.name}
        </Text>
        <Text style={{fontSize: 15, fontFamily: fontFamilies.regular}}>
          Tổng đơn: {data.quantityBooking}
        </Text>
      </RowComponent>

      <SpaceComponent height={10} />

      <RowComponent styles={{justifyContent: 'space-between'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 24,
              height: 6,
              borderRadius: 20,
              backgroundColor: data.color,
              marginRight: 8,
            }}></View>
          <Text>{data.percent}%</Text>
        </View>
        <Text style={{fontSize: 15, fontFamily: fontFamilies.regular}}>
          Doanh thu: {data.revenue}
        </Text>
      </RowComponent>
    </View>
  );
};

export default Card;
