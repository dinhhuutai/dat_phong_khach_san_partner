import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {appColors} from '../../../constants/appColors';
import Card from './components/Card';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import roomAPI from '../../../apis/roomApi';
import hotelAPI from '../../../apis/hotelApi';
import { useSelector } from 'react-redux';
import { roomSelector } from '../../../redux/reducers/roomReducer';

// const datas = [
//   {
//     _id: 1,
//     name: 'Room 1',
//     price: 900,
//     status: 1,
//   },
//   {
//     _id: 2,
//     name: 'Room 2',
//     price: 500,
//     status: 0,
//   },
//   {
//     _id: 3,
//     name: 'Room 3',
//     price: 650,
//     status: 1,
//   },
//   {
//     _id: 4,
//     name: 'Room 4',
//     price: 700,
//     status: 1,
//   },
//   {
//     _id: 5,
//     name: 'Room 5',
//     price: 1000,
//     status: 1,
//   },
// ];

const ListRoomScreen = () => {
  const {getItem} = useAsyncStorage('auth');

  const [datas, setDatas] = useState([]);
  const [idHotel, setIdHotel] = useState('');

  const listRoom = useSelector(roomSelector);

  useEffect(() => {
    getData();
  }, [listRoom]);

  const getData = async () => {
    const resUser = await getItem();
    const userTemp = JSON.parse(resUser);

    try {
      const hotel = await hotelAPI.HandleHotel(
        `/getByIdPartner/${userTemp._id}`,
      );

      setIdHotel(hotel?.data?._id);

      if (hotel.success) {
        const rooms = await roomAPI.HandleRoom(
          '/getByHotel',
          {idHotel: hotel?.data?._id},
          'post',
        );
        console.log("123::::", rooms)

        if (rooms.success) {
          setDatas(rooms.data);

        }
      }
    } catch (error) {}
  };

  return (
    <View style={{backgroundColor: appColors.white, flex: 1}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: appColors.white}}>
        <View
          style={{
            paddingHorizontal: 16,
            paddingBottom: 100,
          }}>
          {datas?.map(data => (
            <View key={data._id}>
              <Card data={data} idHotel={idHotel} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ListRoomScreen;
