import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import {Dropdown} from 'react-native-element-dropdown';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import addressAPI from '../../../apis/addressApi';
import {fontFamilies} from '../../../constants/fontFamilies';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ModalUtils from './Components/ModalUtils';
import ModalImage from './Components/ModalImage';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import hotelAPI from '../../../apis/hotelApi';
import roomAPI from '../../../apis/roomApi';

const AddRoomScreen = () => {
  const {getItem} = useAsyncStorage('auth');

  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [maxPeople, setMaxPeople] = useState();
  const [desc, setDesc] = useState();

  const [utils, setUtils] = useState([]);
  const [modalSelectUtils, setModalSelectUtils] = useState(false);
  const [modalImage, setModalSelectImage] = useState(false);

  const navigation = useNavigation();

  const [idRoom, setIdRoom] = useState('');
  const [idHotel, setIdHotel] = useState('');
  const [user, setUser] = useState('');

  const [imgs, setImgs] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const resUser = await getItem();
    const userTemp = JSON.parse(resUser);

    setUser(userTemp);
    const hotel = await hotelAPI.HandleHotel(`/getByIdPartner/${userTemp._id}`);

    setIdHotel(hotel?.data?._id);
  };

  const handleSave = async () => {
    try {
      const data = {
        name: name,
        price,
        maxPeople,
        desc,
        utils: utils.map(util => util._id),
        idHotel,
        facilities: {
          bed: true,
          bath: true,
          guest: true,
        },
      };

      console.log('data: ', data);

      const room = await roomAPI.HandleRoom('/create', data, 'post');

      console.log('room: ', room);
      if (room.success) {
        // setIdRoom(room?.data?._id);
        setName();
        setPrice();
        setMaxPeople();
        setDesc();

        setUtils([]);
        navigation.navigate('Room');
      }
    } catch (error) {}
  };

  const handleDeleteImg = async idImg => {
    const room = await roomAPI.HandleRoom(
      '/deleteImageRoom',
      {idRoom: idRoom, idPhoto: idImg},
      'post',
    );

    setImgs(room.data.photo);
  };

  return (
    <ContainerComponent isScroll>
      <SectionComponent>
        {idRoom ? (
          <View style={{marginTop: 16}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>Hình ảnh khách sạn</Text>

              <TouchableOpacity onPress={() => setModalSelectImage(true)}>
                <Text style={{color: appColors.primary}}>Xem</Text>
              </TouchableOpacity>

              {modalImage && (
                <ModalImage
                  idRoom={idRoom}
                  setImgs={setImgs}
                  setModalSelectImage={setModalSelectImage}
                />
              )}
            </View>

            <View style={{marginTop: 20}}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}>
                {imgs?.map((img, index) => (
                  <View key={index}>
                    <View style={{marginRight: 20}}>
                      <TouchableOpacity
                        onPress={() => handleDeleteImg(img._id)}
                        style={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          padding: 6,
                          zIndex: 100,
                        }}>
                        <AntDesign
                          name="close"
                          size={24}
                          color={appColors.white}
                        />
                      </TouchableOpacity>
                      <Image
                        source={{
                          uri: img.url,
                        }}
                        style={{borderRadius: 10, width: 300, height: 300}}
                      />
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        ) : (
          ''
        )}

        <View style={{marginTop: 16}}>
          <Text>Tên Phòng</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: appColors.gray,
              borderRadius: 4,
              paddingHorizontal: 10,
              fontSize: 14,
              marginTop: 4,
            }}
            value={name}
            onChangeText={e => setName(e)}
            placeholder="Tên Phòng"
            placeholderTextColor={appColors.gray}
          />
        </View>

        <View style={{marginTop: 16}}>
          <Text>Giá Phòng</Text>
          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <TextInput
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: appColors.gray,
                borderRadius: 4,
                paddingHorizontal: 10,
                fontSize: 14,
                marginTop: 4,
              }}
              value={price}
              onChangeText={e => setPrice(e)}
              placeholder="Giá Phòng"
              placeholderTextColor={appColors.gray}
            />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 16,
                color: appColors.text1,
                fontFamily: fontFamilies.regular,
              }}>
              .000 VNĐ
            </Text>
          </View>
        </View>

        <View style={{marginTop: 16}}>
          <Text>Số người tối đa</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: appColors.gray,
              borderRadius: 4,
              paddingHorizontal: 10,
              fontSize: 14,
              marginTop: 4,
            }}
            value={maxPeople}
            onChangeText={e => setMaxPeople(e)}
            placeholder="Số người tối đa"
            placeholderTextColor={appColors.gray}
          />
        </View>

        <View style={{marginTop: 16}}>
          <Text>Mô tả</Text>
          <TextInput
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: appColors.gray,
              borderRadius: 4,
              paddingHorizontal: 10,
              fontSize: 14,
              marginTop: 4,
              textAlign: 'left',
              textAlignVertical: 'top',
            }}
            multiline={true}
            numberOfLines={4}
            value={desc}
            onChangeText={e => setDesc(e)}
            placeholder="Mô tả"
            placeholderTextColor={appColors.gray}
          />
        </View>

        <View style={{marginTop: 16}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>Tiện ích khách sạn</Text>

            <TouchableOpacity onPress={() => setModalSelectUtils(true)}>
              <Text style={{color: appColors.primary}}>Thêm</Text>
            </TouchableOpacity>

            {modalSelectUtils && (
              <ModalUtils
                setUtils={setUtils}
                utils={utils}
                setModalSelectUtils={setModalSelectUtils}
              />
            )}
          </View>

          <View style={{marginTop: 4}}>
            <RowComponent justify="center" styles={{flexWrap: 'wrap', gap: 10}}>
              {utils?.map((util, index) => (
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
                    <Feather
                      name={util.icon}
                      size={24}
                      color={appColors.text}
                    />
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
                    <Ionicons
                      name={util.icon}
                      size={24}
                      color={appColors.text}
                    />
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
        </View>
      </SectionComponent>

      <SpaceComponent height={30} />
      <SectionComponent styles={{alignItems: 'center'}}>
        <ButtonComponent
          onPress={handleSave}
          type="primary"
          text={`${idHotel ? 'Lưu' : 'Thêm'}`}></ButtonComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default AddRoomScreen;
