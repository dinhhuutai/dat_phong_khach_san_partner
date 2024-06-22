import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ContainerComponent} from '../../../components';
import DateTimePicker from '../../../components/DateTimePicker';
import {appColors} from '../../../constants/appColors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PieChart from 'react-native-pie-chart';
import Card from './components/Card';
import bookingAPI from '../../../apis/bookingApi';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import hotelAPI from '../../../apis/hotelApi';

// const datas = [
//   {
//     name: 'Room 1',
//     percent: 21,
//     revenue: 65000,
//     quantityBooking: 15,
//     color: '#fbd203',
//   },
//   {
//     name: 'Room 2',
//     percent: 11,
//     revenue: 35000,
//     quantityBooking: 8,
//     color: '#ffb300',
//   },
//   {
//     name: 'Room 3',
//     percent: 54,
//     revenue: 105000,
//     quantityBooking: 30,
//     color: '#ff9100',
//   },
//   {
//     name: 'Room 4',
//     percent: 14,
//     revenue: 40000,
//     quantityBooking: 10,
//     color: '#ff6c00',
//   },
// ];

const RevenueScreen = () => {
  const [startAt, setStartAt] = useState(new Date());
  const [endAt, setEndAt] = useState(new Date());
  const [datas, setDatas] = useState([]);
  const [series, setSeries] = useState([]);
  const [sliceColor, setSliceColor] = useState([]);
  const {getItem} = useAsyncStorage('auth');

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

    try {
      const hotel = await hotelAPI.HandleHotel(
        `/getByIdPartner/${userTemp._id}`,
      );

      const revenue = await bookingAPI.HandleBooking(
        '/revenue',
        {
          startDate: {d: s.getDate(), m: s.getMonth(), y: s.getFullYear()},
          endDate: {d: e.getDate(), m: e.getMonth(), y: e.getFullYear()},
          idHotel: hotel.data._id,
        },
        'post',
      );

      const seriesT = revenue?.data?.map(item => item?.revenue);
      setSeries(seriesT);
      const sliceColorT = revenue?.data?.map(item => item?.color);
      setSliceColor(sliceColorT);

      setDatas(revenue?.data);
    } catch (error) {}
  };

  console.log('12345: ', datas);

  return (
    <ContainerComponent isScroll>
      <View
        style={{
          marginTop: 20,
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

      <View
        style={{
          paddingHorizontal: 16,
          marginTop: 44,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {Array.isArray(datas) && datas.length > 0 && datas[0]?.revenue !== 0 ? (
          <PieChart
            widthAndHeight={250}
            series={series}
            sliceColor={sliceColor}
            coverRadius={0.45}
            coverFill={'#FFF'}
          />
        ) : (
          <Text>Không có đơn đặt phòng</Text>
        )}
      </View>

      <View style={{paddingHorizontal: 16, marginTop: 34}}>
        {datas.map((data, index) => (
          <View key={index}>
            <Card data={data} />
          </View>
        ))}
      </View>
    </ContainerComponent>
  );
};

export default RevenueScreen;
