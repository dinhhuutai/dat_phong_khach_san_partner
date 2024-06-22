import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
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
} from '../../components';
import {appColors} from '../../constants/appColors';
import {Dropdown} from 'react-native-element-dropdown';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation, useRoute} from '@react-navigation/native';
import addressAPI from '../../apis/addressApi';
import {fontFamilies} from '../../constants/fontFamilies';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ModalUtils from './Components/ModalUtils';
import ModalImage from './Components/ModalImage';
import roomAPI from '../../apis/roomApi';
import AntDesign from 'react-native-vector-icons/AntDesign';

const EditRoomScreen = () => {
  const [valueProvince, setValueProvince] = useState({name: '', _id: ''});
  const [dataProvince, setDataProvince] = useState([]);
  const [isFocusProvince, setIsFocusProvince] = useState(false);

  const [valueDistrict, setValueDistrict] = useState({name: '', _id: ''});
  const [dataDistrict, setDataDistrict] = useState([]);
  const [isFocusDistrict, setIsFocusDistrict] = useState(false);

  const [valueCommune, setValueCommune] = useState({name: '', _id: ''});
  const [dataCommune, setDataCommune] = useState([]);
  const [isFocusCommune, setIsFocusCommune] = useState(false);

  const [utils, setUtils] = useState([]);
  const [modalSelectUtils, setModalSelectUtils] = useState(false);
  const [modalImage, setModalSelectImage] = useState(false);

  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [maxPeople, setMaxPeople] = useState();
  const [desc, setDesc] = useState();
  const [idRoom, setIdRoom] = useState('');

  const [imgs, setImgs] = useState([]);

  const navigation = useNavigation();

  const route = useRoute();
  const {id, idHotel} = route.params;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const room = await roomAPI.HandleRoom(`/getById/${id}`);

    if (room.success) {
      console.log('Phong ---------:', room.data);
      setIdRoom(id);
      setImgs(room.data.photo);
      setUtils(room.data.utils);
      setName(room.data.name);
      setPrice(room.data.price);
      setMaxPeople(room.data.maxPeople);
      setDesc(room.data.desc);

      console.log(room.data.price);
    }
  };

  const handleGetDataDistrict = async idProvince => {
    const res = await addressAPI.HandleDistrict(
      '/getByProvince',
      {idProvince},
      'post',
    );

    setDataDistrict(res.districts);
  };

  const handleGetDataCommune = async idDistrict => {
    const res = await addressAPI.HandleCommune(
      '/getByDistrict',
      {idDistrict},
      'post',
    );

    setDataCommune(res.communes);
  };

  const handleDeleteImg = async idImg => {
    const room = await roomAPI.HandleRoom(
      '/deleteImageRoom',
      {idRoom: idRoom, idPhoto: idImg},
      'post',
    );

    setImgs(room.data.photo);
  };

  const handleSave = async () => {
    try {
      const data = {
        name: name,
        price: price,
        maxPeople: maxPeople,
        desc: desc,
        utils: utils.map(util => util._id),
      };

      const room = await roomAPI.HandleRoom(`/update/${idRoom}`, data, 'put');

      if (room.success) {
        console.log('NEW ROOM: ', room.data);
        setUtils(room.data.utils);
        setName(room.data.name);
        setPrice(room.data.price);
        setMaxPeople(room.data.maxPeople);
        setDesc(room.data.desc);

        navigation.navigate('DetailRoomScreen', {
          id: id,
          idHotel: idHotel,
        });
      }
    } catch (error) {}
  };

  return (
    <ContainerComponent isScroll back>
      <SectionComponent>
        <View style={{marginTop: 16}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>Hình ảnh phòng</Text>

            <TouchableOpacity onPress={() => setModalSelectImage(true)}>
              <Text style={{color: appColors.primary}}>Thêm</Text>
            </TouchableOpacity>

            {modalImage && (
              <ModalImage
                idRoom={id}
                setModalSelectImage={setModalSelectImage}
                setImgs={setImgs}
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
            onChangeText={e => setName(e)}
            value={name}
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
              onChangeText={e => setPrice(e)}
              value={price + ''}
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
            onChangeText={e => setMaxPeople(e)}
            value={maxPeople + ''}
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
            <Text>Tiện ích phòng</Text>

            <TouchableOpacity onPress={() => setModalSelectUtils(true)}>
              <Text style={{color: appColors.primary}}>Thêm</Text>
            </TouchableOpacity>

            {modalSelectUtils && (
              <ModalUtils setModalSelectUtils={setModalSelectUtils} />
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
          text={`${idRoom ? 'Lưu' : 'Thêm'}`}></ButtonComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default EditRoomScreen;
