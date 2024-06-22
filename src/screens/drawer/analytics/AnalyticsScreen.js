import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ContainerComponent} from '../../../components';
import {fontFamilies} from '../../../constants/fontFamilies';
import {appColors} from '../../../constants/appColors';
import {globalStyles} from '../../../styles/globalStyles';
import DateTimePicker from '../../../components/DateTimePicker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import bookingAPI from '../../../apis/bookingApi';
import hotelAPI from '../../../apis/hotelApi';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';

const AnalyticsScreen = () => {
  const {getItem} = useAsyncStorage('auth');
  const [analytics, setAnalytics] = useState();
  const [startAt, setStartAt] = useState(new Date());
  const [endAt, setEndAt] = useState(new Date());

  useEffect(() => {
    const today = new Date();
    const firstMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    setStartAt(firstMonth);
    setEndAt(today);

    getData(firstMonth, today);
  }, []);

  const getData = async (s, e) => {
    const resUser = await getItem();
    const userTemp = JSON.parse(resUser);
    console.log(userTemp);

    try {
      const hotel = await hotelAPI.HandleHotel(
        `/getByIdPartner/${userTemp._id}`,
      );


      const analytics = await bookingAPI.HandleBooking(
        '/analytics',
        {
          startDate: {d: s.getDate(), m: s.getMonth(), y: s.getFullYear()},
          endDate: {d: e.getDate(), m: e.getMonth(), y: e.getFullYear()},
          idHotel: hotel.data._id,
        },
        'post',
      );

      setAnalytics(analytics.data);
    } catch (error) {}
  };

  return (
    <ContainerComponent>
      <View style={{marginTop: 20, alignItems: 'center'}}>
        <Image source={require('../../../assets/images/logo.png')} />
        <Text
          style={{
            fontSize: 20,
            fontFamily: fontFamilies.semiBold,
            color: appColors.primary1,
            marginTop: 10,
          }}>
          Partner
        </Text>
      </View>

      <View
        style={{
          marginTop: 50,
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text>Từ</Text>
        <View style={{width: 120}}>
          <DateTimePicker
            type="date"
            onSelect={val => {
              setStartAt(val);
            }}
            selected={startAt}
          />
        </View>

        <Text>đến</Text>
        <View style={{width: 120}}>
          <DateTimePicker
            type="date"
            onSelect={val => setEndAt(val)}
            selected={endAt}
          />
        </View>

        <TouchableOpacity onPress={() => getData(startAt, endAt)}>
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 6,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: appColors.primary1,
            }}>
            <AntDesign name="search1" size={20} color={appColors.white} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={{marginTop: 50}}>
        <View
          style={{
            flexDirection: 'row',
            height: 40,
            alignItems: 'center',
          }}>
          <View
            style={[
              {
                width: 300,
                height: 50,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: appColors.white,
                borderRadius: 6,
                shadowColor: appColors.black,
                shadowOffset: {
                  width: 0,
                  height: 7,
                },
                shadowOpacity: 0.43,
                shadowRadius: 10,
                elevation: 10,
                borderRightWidth: 8,
                borderRightColor: appColors.primary1,
              },
            ]}>
            <View
              style={{
                width: (100 * analytics?.total?.percent) / 100 || 0,
                height: 50,
                backgroundColor: appColors.primary1,
              }}></View>
            <Text
              style={{
                marginRight: 14,
                fontSize: 16,
                fontFamily: fontFamilies.semiBold,
              }}>
              Tổng số khách đặt
            </Text>
          </View>
          <Text
            style={{
              marginLeft: 20,
              fontSize: 20,
              fontFamily: fontFamilies.semiBold,
            }}>
            {analytics?.total?.num}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            height: 40,
            alignItems: 'center',
            marginTop: 30,
          }}>
          <View
            style={[
              {
                width: 300,
                height: 50,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: appColors.white,
                borderRadius: 6,
                shadowColor: appColors.black,
                shadowOffset: {
                  width: 0,
                  height: 7,
                },
                shadowOpacity: 0.43,
                shadowRadius: 10,
                elevation: 10,
              },
            ]}>
            <View
              style={{
                width: (100 * analytics?.booked?.percent) / 100 || 0,
                height: 50,
                backgroundColor: appColors.green1,
              }}></View>
            <Text
              style={{
                marginRight: 14,
                fontSize: 16,
                fontFamily: fontFamilies.medium,
              }}>
              Đã đặt
            </Text>
          </View>
          <Text
            style={{
              marginLeft: 20,
              fontSize: 20,
              fontFamily: fontFamilies.medium,
            }}>
            {analytics?.booked?.num}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            height: 40,
            alignItems: 'center',
            marginTop: 30,
          }}>
          <View
            style={[
              {
                width: 300,
                height: 50,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: appColors.white,
                borderRadius: 6,
                shadowColor: appColors.black,
                shadowOffset: {
                  width: 0,
                  height: 7,
                },
                shadowOpacity: 0.43,
                shadowRadius: 10,
                elevation: 10,
              },
            ]}>
            <View
              style={{
                width: (100 * analytics?.received?.percent) / 100 || 0,
                height: 50,
                backgroundColor: appColors.green2,
              }}></View>
            <Text
              style={{
                marginRight: 14,
                fontSize: 16,
                fontFamily: fontFamilies.medium,
              }}>
              Đã nhận phòng
            </Text>
          </View>
          <Text
            style={{
              marginLeft: 20,
              fontSize: 20,
              fontFamily: fontFamilies.medium,
            }}>
            {analytics?.received?.num}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            height: 40,
            alignItems: 'center',
            marginTop: 30,
          }}>
          <View
            style={[
              {
                width: 300,
                height: 50,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: appColors.white,
                borderRadius: 6,
                shadowColor: appColors.black,
                shadowOffset: {
                  width: 0,
                  height: 7,
                },
                shadowOpacity: 0.43,
                shadowRadius: 10,
                elevation: 10,
              },
            ]}>
            <View
              style={{
                width: (100 * analytics?.notReceived?.percent) / 100 || 0,
                height: 50,
                backgroundColor: appColors.gray,
              }}></View>
            <Text
              style={{
                marginRight: 14,
                fontSize: 16,
                fontFamily: fontFamilies.medium,
              }}>
              Không nhận phòng
            </Text>
          </View>
          <Text
            style={{
              marginLeft: 20,
              fontSize: 20,
              fontFamily: fontFamilies.medium,
            }}>
            {analytics?.notReceived?.num}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            height: 40,
            alignItems: 'center',
            marginTop: 30,
          }}>
          <View
            style={[
              {
                width: 300,
                height: 50,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: appColors.white,
                borderRadius: 6,
                shadowColor: appColors.black,
                shadowOffset: {
                  width: 0,
                  height: 7,
                },
                shadowOpacity: 0.43,
                shadowRadius: 10,
                elevation: 10,
              },
            ]}>
            <View
              style={{
                width: (100 * analytics?.canceled?.percent) / 100 || 0,
                height: 50,
                backgroundColor: appColors.red1,
              }}></View>
            <Text
              style={{
                marginRight: 14,
                fontSize: 16,
                fontFamily: fontFamilies.medium,
              }}>
              Đã hủy
            </Text>
          </View>
          <Text
            style={{
              marginLeft: 20,
              fontSize: 20,
              fontFamily: fontFamilies.medium,
            }}>
            {analytics?.canceled?.num}
          </Text>
        </View>
      </View>
    </ContainerComponent>
  );
};

export default AnalyticsScreen;
