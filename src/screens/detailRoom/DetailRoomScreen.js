import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {fontFamilies} from '../../constants/fontFamilies';
import {appColors} from '../../constants/appColors';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useRoute} from '@react-navigation/native';
import roomAPI from '../../apis/roomApi';
import {useDispatch} from 'react-redux';
import {addRoom} from '../../redux/reducers/roomReducer';

// const data = {
//   name: 'Phòng 01',
//   price: 400,
//   maxPeople: 6,
//   utils: [],
//   desc: 'Mô tả của phòng 01',
// };

const dataComment = [];

const DetailRoomScreen = ({navigation}) => {
  const route = useRoute();
  const {id, idHotel} = route.params;

  const [data, setData] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const room = await roomAPI.HandleRoom(`/getById/${id}`);

    if (room.success) {
      setData(room.data);

      const rooms = await roomAPI.HandleRoom(
        '/getByHotel',
        {idHotel: idHotel},
        'post',
      );

      if (rooms.success) {
        dispatch(addRoom(rooms.data));
      }
    }
  };
  console.log(id);

  const handleChangeStatus = async () => {
    const room = await roomAPI.HandleRoom(
      '/changeStatus',
      {idRoom: id, status: !data.status},
      'post',
    );

    if (room.success) {
      setData(room.data);

      const rooms = await roomAPI.HandleRoom(
        '/getByHotel',
        {idHotel: idHotel},
        'post',
      );

      if (rooms.success) {
        dispatch(addRoom(rooms.data));
      }
    }
  };

  const handleDeleteRoom = async () => {
    const room = await roomAPI.HandleRoom(
      '/deleteRoom',
      {idRoom: id},
      'delete',
    );

    if (room.success) {
      const rooms = await roomAPI.HandleRoom(
        '/getByHotel',
        {idHotel: idHotel},
        'post',
      );

      if (rooms.success) {
        dispatch(addRoom(rooms.data));
      }

      navigation.goBack();
    }
  };

  console.log('photo: ', data?.photo);

  return (
    <ContainerComponent isScroll back>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 10,
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('EditRoomScreen', {
              id,
              idHotel,
            })
          }>
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 6,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: appColors.primary1,
            }}>
            <EvilIcons name="pencil" size={32} color={appColors.white} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleChangeStatus()}>
          {data.status === 1 ? (
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 6,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: appColors.red,
              }}>
              <AntDesign name="close" size={20} color={appColors.white} />
            </View>
          ) : (
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 6,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: appColors.green,
              }}>
              <AntDesign name="check" size={20} color={appColors.white} />
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleDeleteRoom()}>
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 6,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: appColors.primary1,
            }}>
            <AntDesign name="delete" size={20} color={appColors.white} />
          </View>
        </TouchableOpacity>
      </View>

      <GestureHandlerRootView>
        <TouchableOpacity onPress={() => navigation.navigate('')}>
          <Image
            style={[
              {
                width: '100%',
                height: 340,
                objectFit: 'cover',
              },
            ]}
            source={{
              uri:
                data?.photo?.length < 0
                  ? data?.photo[0]?.url
                  : 'https://res.cloudinary.com/dsdbqfn5l/image/upload/v1715231860/ulj4pos7t6kcrzvtn7mp.jpg',
            }}
          />
        </TouchableOpacity>
      </GestureHandlerRootView>

      <SectionComponent>
        <SpaceComponent height={20} />
        <RowComponent justify="space-between">
          <TextComponent
            text={data?.name}
            font={fontFamilies.medium}
            size={20}
          />

          <TextComponent
            text={`${data?.price
              ?.toLocaleString('en-US')
              .replace(/,/g, '.')}.000đ/Night`}
            font={fontFamilies.semiBold}
            size={16}
            color={appColors.red1}
          />
        </RowComponent>

        <SpaceComponent height={10} />
        <RowComponent>
          <Octicons name="person" size={18} color={appColors.text} />
          <SpaceComponent width={10} />

          <Text
            style={{
              fontFamily: fontFamilies.semiBold,
              fontSize: 14,
              color: appColors.text,
            }}>
            {data?.maxPeople}
          </Text>
        </RowComponent>

        <SpaceComponent height={34} />

        <View>
          <RowComponent justify="space-between">
            <TextComponent
              text="Public facilities"
              font={fontFamilies.semiBold}
              size={16}
            />
          </RowComponent>

          <SpaceComponent height={10} />
          <RowComponent
            justify="flex-start"
            styles={{flexWrap: 'wrap', gap: 10}}>
            {data?.utils?.map((util, index) => (
              <View
                key={index}
                style={{
                  alignItems: 'center',
                  height: 80,
                  width: 80,
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderColor: appColors.gray1,
                  borderRadius: 10,
                  paddingHorizontal: 4,
                  paddingVertical: 4,
                }}>
                {util.icon === 'wifi' ? (
                  <Feather name={util.icon} size={24} color={appColors.text} />
                ) : util.icon === 'chair-alt' ? (
                  <MaterialIcons
                    name={util.icon}
                    size={24}
                    color={appColors.text}
                  />
                ) : util.icon === 'elevator' ? (
                  <Foundation
                    name={util.icon}
                    size={24}
                    color={appColors.text}
                  />
                ) : util.icon === 'bathtub-outline' ||
                  util.icon === 'iron-outline' ||
                  util.icon === 'hair-dryer-outline' ||
                  util.icon === 'pool' ||
                  util.icon === 'fridge-outline' ? (
                  <MaterialCommunityIcons
                    name={util.icon}
                    size={24}
                    color={appColors.text}
                  />
                ) : util.icon === 'television' ? (
                  <FontAwesome
                    name={util.icon}
                    size={24}
                    color={appColors.text}
                  />
                ) : util.icon === 'restaurant-outline' ||
                  util.icon === 'cafe-outline' ? (
                  <Ionicons name={util.icon} size={24} color={appColors.text} />
                ) : util.icon === 'kitchen-set' ? (
                  <FontAwesome6
                    name={util.icon}
                    size={24}
                    color={appColors.text}
                  />
                ) : (
                  ''
                )}
                <SpaceComponent height={8} />
                <TextComponent
                  text={util.name}
                  size={12}
                  font={fontFamilies.semiBold}
                  styles={{textAlign: 'center'}}
                />
              </View>
            ))}
          </RowComponent>
        </View>

        <SpaceComponent height={34} />
        <View>
          <TextComponent
            text="Description"
            font={fontFamilies.semiBold}
            size={16}
          />

          <SpaceComponent height={10} />
          <TextComponent
            text={data?.desc}
            font={fontFamilies.semiBold}
            size={14}
            color={appColors.text1}
            styles={{lineHeight: 20}}
          />
        </View>

        <SpaceComponent height={34} />
        <View>
          <TextComponent
            text="Comment"
            font={fontFamilies.semiBold}
            size={16}
          />

          {dataComment.length > 0 ? (
            <>
              <SpaceComponent height={14} />

              <RowComponent styles={{alignItems: 'center'}}>
                <TextComponent
                  text={dataHotel?.rating}
                  font={fontFamilies.semiBold}
                  size={34}
                />
                <SpaceComponent width={12} />
                <View>
                  <TextComponent
                    text="Tuyệt vời"
                    font={fontFamilies.semiBold}
                    size={16}
                  />

                  <TextComponent
                    text={`${lengthComment
                      ?.toLocaleString('en-US')
                      .replace(/,/g, '.')} đánh giá`}
                    font={fontFamilies.medium}
                    size={16}
                    color={appColors.text1}
                  />
                </View>
              </RowComponent>
            </>
          ) : (
            <></>
          )}

          <SpaceComponent height={10} />
          {dataComment?.map((com, index) => (
            <View key={index} style={{marginTop: 16}}>
              <RowComponent styles={{justifyContent: 'space-between'}}>
                <RowComponent styles={{gap: 2}}>
                  {[1, 2, 3, 4, 5].map(e => (
                    <AntDesign
                      key={e}
                      name="star"
                      size={18}
                      color={
                        com.rating >= e ? appColors.yellow : appColors.gray
                      }
                    />
                  ))}
                </RowComponent>
                <TextComponent
                  text={com.idUser.name}
                  color={appColors.text1}
                  font={fontFamilies.medium}
                />
              </RowComponent>

              <SpaceComponent height={10} />
              <TextComponent
                text={com.content}
                font={fontFamilies.medium}
                size={16}
                color={appColors.text}
              />

              {index === 0 && (
                <View
                  style={{
                    marginTop: 16,
                    height: 1,
                    width: '100%',
                    backgroundColor: appColors.gray,
                  }}
                />
              )}
            </View>
          ))}

          {dataComment.length > 0 ? (
            <>
              <SpaceComponent height={20} />
              <RowComponent justify="flex-end">
                <GestureHandlerRootView>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('EvaluateScreen', {
                        id: id,
                        rating: dataHotel?.rating,
                        lengthComment: lengthComment,
                      })
                    }
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 4,
                    }}>
                    <TextComponent
                      text="See all"
                      color={appColors.primary}
                      font={fontFamilies.semiBold}
                    />
                    <AntDesign
                      name="right"
                      size={12}
                      color={appColors.yellow}
                    />
                  </TouchableOpacity>
                </GestureHandlerRootView>
              </RowComponent>
            </>
          ) : (
            <></>
          )}
        </View>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default DetailRoomScreen;
