import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ContainerComponent,
  SectionComponent,
  SpaceComponent,
} from '../../../components';
import Card from './components/Card';
import DateTimePicker from '../../../components/DateTimePicker';
import {appColors} from '../../../constants/appColors';
import {DocumentFilter} from 'iconsax-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import {fontFamilies} from '../../../constants/fontFamilies';
import ModalFilter from './components/ModalFilter';
import bookingAPI from '../../../apis/bookingApi';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import hotelAPI from '../../../apis/hotelApi';

// const datas = [
//   {
//     _id: '7MCxyPPvo',
//     idUser: {
//       phone: '0123456789',
//     },
//     price: 400,
//     checkIn: new Date(2024, 3, 3),
//     checkOut: new Date(2024, 3, 6),
//     idRoom: {
//       name: 'Room 1',
//     },
//     status: 1,
//     isPaid: false,
//   },
//   {
//     _id: '7MCxyPPsdo',
//     idUser: {
//       phone: '0123456789',
//     },
//     price: 400,
//     checkIn: new Date(2024, 3, 3),
//     checkOut: new Date(2024, 3, 6),
//     idRoom: {
//       name: 'Room 1',
//     },
//     status: 2,
//     isPaid: true,
//   },
//   {
//     _id: '7MCfvyPPvo',
//     idUser: {
//       phone: '0123456789',
//     },
//     price: 400,
//     checkIn: new Date(2024, 3, 3),
//     checkOut: new Date(2024, 3, 6),
//     idRoom: {
//       name: 'Room 1',
//     },
//     status: 3,
//     isPaid: false,
//   },
//   {
//     _id: '7MCxydfhbdPvo',
//     idUser: {
//       phone: '0123456789',
//     },
//     price: 400,
//     checkIn: new Date(2024, 3, 3),
//     checkOut: new Date(2024, 3, 6),
//     idRoom: {
//       name: 'Room 1',
//     },
//     status: 4,
//     isPaid: true,
//   },
//   {
//     _id: '7MCxyghhPvo',
//     idUser: {
//       phone: '0123456789',
//     },
//     price: 400,
//     checkIn: new Date(2024, 3, 3),
//     checkOut: new Date(2024, 3, 6),
//     idRoom: {
//       name: 'Room 1',
//     },
//     status: 5,
//     isPaid: false,
//   },
//   {
//     _id: '7MCxyPfvo',
//     idUser: {
//       phone: '0123456789',
//     },
//     price: 400,
//     checkIn: new Date(2024, 3, 3),
//     checkOut: new Date(2024, 3, 6),
//     idRoom: {
//       name: 'Room 1',
//     },
//     status: 4,
//     isPaid: true,
//   },
// ];

const ListBookingScreen = () => {
  const {getItem} = useAsyncStorage('auth');
  const [startAt, setStartAt] = useState(new Date());
  const [endAt, setEndAt] = useState(new Date());
  const [isModalBooking, setIsModalBooking] = useState(false);
  const [dataModal, setDataModal] = useState();

  const [checkedBooking, setCheckedBooking] = useState(0);
  const [isModalFilter, setIsModalFilter] = useState(false);

  const [datas, setDatas] = useState([]);

  useEffect(() => {
    setIsModalBooking(false);
    setIsModalFilter(false);

    const today = new Date();
    const firstMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    setStartAt(firstMonth);
    setEndAt(today);

    getData(firstMonth, today, 0);
  }, []);

  const handleBooking = data => {
    setIsModalBooking(true);
    setDataModal(data);
    console.log(data);
  };

  const handleChangeStatus = async status => {
    const data = await bookingAPI.HandleBooking(
      `/changeStatus`,
      {idBooking: dataModal._id, status},
      'post',
    );

    if (data.success) {
      getData(startAt, endAt, 0);
      setDataModal(data.data);
    }
  };

  const getData = async (s, e, status) => {
    const resUser = await getItem();
    const userTemp = JSON.parse(resUser);
    console.log(userTemp);

    try {
      const hotel = await hotelAPI.HandleHotel(
        `/getByIdPartner/${userTemp._id}`,
      );

      console.log(hotel.data._id);

      const listBooking = await bookingAPI.HandleBooking(
        '/findBookingsByDateAndStatus',
        {
          startDate: {d: s.getDate(), m: s.getMonth(), y: s.getFullYear()},
          endDate: {d: e.getDate(), m: e.getMonth(), y: e.getFullYear()},
          idHotel: hotel.data._id,
          status,
        },
        'post',
      );

      setDatas(listBooking.data);
    } catch (error) {}
  };

  return (
    <View style={{backgroundColor: appColors.white, height: '100%'}}>
      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          backgroundColor: appColors.white,
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

        <TouchableOpacity
          onPress={() => {
            getData(startAt, endAt, checkedBooking);
            setIsModalBooking(false);
          }}>
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

        <TouchableOpacity
          onPress={() => {
            setIsModalFilter(true);
            setIsModalBooking(false);
          }}>
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 6,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: appColors.primary1,
            }}>
            <DocumentFilter size={18} color={appColors.white} />
          </View>
        </TouchableOpacity>
      </View>

      <SpaceComponent height={20} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: appColors.white}}>
        <View
          style={{
            paddingHorizontal: 16,
            paddingBottom: isModalBooking ? 200 : 100,
          }}>
          {datas.map(data => (
            <TouchableOpacity
              key={data._id}
              onPress={() => handleBooking(data)}>
              <View>
                <Card data={data} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {isModalBooking && (
        <View
          style={{
            height: 200,
            bottom: -70,
            left: 0,
            right: 0,
            position: 'absolute',
          }}>
          <View
            style={{
              backgroundColor: appColors.white,
              borderTopWidth: 1,
              borderColor: appColors.gray,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              paddingHorizontal: 20,
            }}>
            <View
              style={{
                alignItems: 'flex-end',
                justifyContent: 'center',
                height: 200,
                paddingVertical: 10,
                marginRight: 20,
              }}>
              <Text style={{color: appColors.text}}>{`${dataModal.price
                ?.toLocaleString('en-US')
                .replace(/,/g, '.')}.000đ`}</Text>

              <View style={{flexDirection: 'row', marginTop: 12}}>
                <Text>{`${moment(dataModal.checkIn).format(
                  'DD/MM/YYYY',
                )}`}</Text>
                <Text style={{paddingHorizontal: 6}}>-</Text>
                <Text>{`${moment(dataModal.checkOut).format(
                  'DD/MM/YYYY',
                )}`}</Text>
              </View>

              <View style={{flex: 1, marginTop: 16}}>
                <Text
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 4,
                    backgroundColor:
                      dataModal.status === 1
                        ? appColors.yellow
                        : dataModal.status === 3
                        ? appColors.gray1
                        : dataModal.status === 4
                        ? appColors.yellow1
                        : dataModal.status === 2
                        ? appColors.green1
                        : appColors.gray,
                    color: appColors.text,
                  }}>
                  {dataModal.status === 1
                    ? 'Chờ xác nhận'
                    : dataModal.status === 3
                    ? 'Đã hủy'
                    : dataModal.status === 4
                    ? 'Đã xác nhận'
                    : dataModal.status === 2
                    ? 'Đã nhận'
                    : 'Khách không nhận phòng'}
                </Text>
              </View>
            </View>

            {(dataModal?.status === 1 || dataModal?.status === 4) && (
              <View
                style={{
                  flexDirection: 'row',
                  height: 200,
                  gap: 2,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    handleChangeStatus(dataModal?.status === 1 ? 3 : 5)
                  }>
                  <View
                    style={{
                      backgroundColor: appColors.red,
                      width: 60,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginVertical: 10,
                      height: 100,
                      paddingHorizontal: 6,
                    }}>
                    <Text
                      style={{
                        color: appColors.white,
                        textAlign: 'center',
                        lineHeight: 20,
                        fontFamily: fontFamilies.medium,
                      }}>
                      {dataModal?.status === 1 ? 'Không nhận' : 'Hủy phòng'}
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    handleChangeStatus(dataModal?.status === 1 ? 4 : 2)
                  }>
                  <View
                    style={{
                      backgroundColor: appColors.primary1,
                      width: 60,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginVertical: 10,
                      height: 100,
                      paddingHorizontal: 6,
                    }}>
                    <Text
                      style={{
                        color: appColors.white,
                        textAlign: 'center',
                        lineHeight: 20,
                        fontFamily: fontFamilies.medium,
                      }}>
                      {dataModal?.status === 1 ? 'Xác nhận' : 'Đã nhận'}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      )}

      {isModalFilter && (
        <ModalFilter
          setCheckedBooking={setCheckedBooking}
          setIsModalFilter={setIsModalFilter}
          getData={getData}
          startAt={startAt}
          endAt={endAt}
        />
      )}
    </View>
  );
};

export default ListBookingScreen;
