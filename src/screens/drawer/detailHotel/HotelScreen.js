import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ModalUtils from './Components/ModalUtils';
import ModalImage from './Components/ModalImage';
import hotelAPI from '../../../apis/hotelApi';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {Image} from 'react-native';
import aa from '../../../assets/images/hotel.png';

const HotelScreen = () => {
  const {getItem} = useAsyncStorage('auth');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

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

  const [imgs, setImgs] = useState([]);

  const [idHotel, setIdHotel] = useState('');
  const [user, setUser] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const resUser = await getItem();
    const userTemp = JSON.parse(resUser);

    try {
      setUser(userTemp);
      const hotel = await hotelAPI.HandleHotel(
        `/getByIdPartner/${userTemp._id}`,
      );

      console.log(hotel.data);

      if (hotel.data) {
        handleGetDataDistrict(hotel.data.province?._id);
        handleGetDataCommune(hotel.data.district?._id);

        setName(hotel.data.name);
        setAddress(hotel.data.address);
        setValueProvince(hotel.data.province);
        setValueDistrict(hotel.data.district);
        setValueCommune(hotel.data.communes);
        setUtils(hotel.data.utils);
        setImgs(hotel.data.photo);
        console.log(hotel.data.photo);
      }

      setIdHotel(hotel?.data?._id);
    } catch (error) {}

    const res = await addressAPI.HandleProvince('/getAll');
    setDataProvince(res.provinces);
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

  const handleSave = async () => {
    try {
      const data = {
        name: name,
        address: address,
        province: valueProvince._id,
        district: valueDistrict._id,
        communes: valueCommune._id,
        utils: utils.map(util => util._id),
        idPartner: user._id,
      };

      let hotel;

      if (idHotel) {
        hotel = await hotelAPI.HandleHotel(`/update/${idHotel}`, data, 'put');
      } else {
        hotel = await hotelAPI.HandleHotel('/create', data, 'post');
      }

      if (hotel.success) {
        setName(hotel.data.name);
        setAddress(hotel.data.address);
        setValueProvince(hotel.data.province);
        setValueDistrict(hotel.data.district);
        setValueCommune(hotel.data.communes);
        setUtils(hotel.data.utils);
      }
    } catch (error) {}
  };

  const handleDeleteImg = async idImg => {
    const hotel = await hotelAPI.HandleHotel(
      '/deleteImageHotel',
      {idHotel: idHotel, idPhoto: idImg},
      'post',
    );

    setImgs(hotel.data.photo);
  };

  return (
    <ContainerComponent isScroll>
      <SectionComponent>
        {idHotel ? (
          <View style={{marginTop: 16}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>Hình ảnh khách sạn</Text>

              <TouchableOpacity onPress={() => setModalSelectImage(true)}>
                <Text style={{color: appColors.primary}}>Thêm</Text>
              </TouchableOpacity>

              {modalImage && (
                <ModalImage
                  setModalSelectImage={setModalSelectImage}
                  idHotel={idHotel}
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
        ) : (
          ''
        )}

        <View style={{marginTop: 16}}>
          <Text>Tên khách sạn</Text>
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
            placeholder="Name Hotel"
            placeholderTextColor={appColors.gray}
          />
        </View>

        <View style={{marginTop: 16}}>
          <View>
            <TextComponent
              text="Thành phố / tỉnh"
              font={fontFamilies.semiBold}
              size={16}
              styles={{
                color: appColors.text,
                fontFamily: fontFamilies.regular,
                fontSize: 14,
                paddingHorizontal: 4,
                backgroundColor: appColors.white,
              }}
            />

            <Dropdown
              style={[
                {
                  borderColor: appColors.gray,
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  borderRadius: 8,
                  marginTop: 4,
                },
              ]}
              placeholderStyle={{}}
              selectedTextStyle={{
                fontSize: 14,
                fontFamily: fontFamilies.semiBold,
                color: appColors.text,
              }}
              inputSearchStyle={{}}
              iconStyle={{}}
              data={dataProvince}
              search
              maxHeight={300}
              labelField="name"
              valueField="_id"
              placeholder={!isFocusProvince ? 'Thành phố / tỉnh' : '...'}
              searchPlaceholder="Search..."
              value={valueProvince?._id}
              onFocus={() => setIsFocusProvince(true)}
              onBlur={() => setIsFocusProvince(false)}
              onChange={item => {
                setValueProvince({_id: item._id, name: item.name});
                setIsFocusProvince(false);
                handleGetDataDistrict(item._id);
                setValueDistrict();
                setValueCommune();
              }}
              renderRightIcon={() => (
                <FontAwesome6
                  name={!isFocusProvince ? 'sort-down' : 'sort-up'}
                  size={20}
                  color={appColors.text1}
                />
              )}
            />
          </View>

          <SpaceComponent height={16} />
          <View>
            <TextComponent
              text="Quận / huyện"
              size={16}
              styles={{
                color: appColors.text,
                fontFamily: fontFamilies.regular,
                fontSize: 14,
                paddingHorizontal: 4,
                backgroundColor: appColors.white,
              }}
            />

            <Dropdown
              style={[
                {
                  borderColor: appColors.gray,
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  borderRadius: 8,
                  marginTop: 4,
                },
              ]}
              placeholderStyle={{}}
              selectedTextStyle={{
                fontSize: 14,
                fontFamily: fontFamilies.semiBold,
                color: appColors.text,
              }}
              inputSearchStyle={{}}
              iconStyle={{}}
              data={dataDistrict}
              search
              maxHeight={300}
              labelField="name"
              valueField="_id"
              placeholder={!isFocusDistrict ? 'Quận / huyện' : '...'}
              searchPlaceholder="Search..."
              value={valueDistrict?._id}
              onFocus={() => setIsFocusDistrict(true)}
              onBlur={() => setIsFocusDistrict(false)}
              onChange={item => {
                setValueDistrict({_id: item._id, name: item.name});
                setIsFocusDistrict(false);
                handleGetDataCommune(item._id);
                setValueCommune();
              }}
              renderRightIcon={() => (
                <FontAwesome6
                  name={!isFocusDistrict ? 'sort-down' : 'sort-up'}
                  size={20}
                  color={appColors.text1}
                />
              )}
            />
          </View>

          <SpaceComponent height={16} />
          <View>
            <TextComponent
              text="Phường / xã"
              size={16}
              styles={{
                color: appColors.text,
                fontFamily: fontFamilies.regular,
                fontSize: 14,
                paddingHorizontal: 4,
                backgroundColor: appColors.white,
              }}
            />

            <Dropdown
              style={[
                {
                  borderColor: appColors.gray,
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  borderRadius: 8,
                  marginTop: 4,
                },
              ]}
              placeholderStyle={{}}
              selectedTextStyle={{
                fontSize: 14,
                fontFamily: fontFamilies.semiBold,
                color: appColors.text,
              }}
              inputSearchStyle={{}}
              iconStyle={{}}
              data={dataCommune}
              search
              maxHeight={300}
              labelField="name"
              valueField="_id"
              placeholder={!isFocusCommune ? 'Phường / xã' : '...'}
              searchPlaceholder="Search..."
              value={valueCommune?._id}
              onFocus={() => setIsFocusCommune(true)}
              onBlur={() => setIsFocusCommune(false)}
              onChange={item => {
                setValueCommune({_id: item._id, name: item.name});
                setIsFocusCommune(false);
              }}
              renderRightIcon={() => (
                <FontAwesome6
                  name={!isFocusCommune ? 'sort-down' : 'sort-up'}
                  size={20}
                  color={appColors.text1}
                />
              )}
            />
          </View>
        </View>

        <View style={{marginTop: 16}}>
          <Text>Địa chỉ khách sạn</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: appColors.gray,
              borderRadius: 4,
              paddingHorizontal: 10,
              fontSize: 14,
              marginTop: 4,
            }}
            value={address}
            onChangeText={e => setAddress(e)}
            placeholder="Address Hotel"
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
                setModalSelectUtils={setModalSelectUtils}
                setUtils={setUtils}
                utils={utils}
              />
            )}
          </View>

          <View style={{marginTop: 20}}>
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

export default HotelScreen;
