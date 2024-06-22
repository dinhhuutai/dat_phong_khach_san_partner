import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Button,
  PermissionsAndroid,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import utilHotelAPI from '../../../../apis/utilHotelApi';
import {
  ButtonComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '../../../../components';
import {appColors} from '../../../../constants/appColors';
import {fontFamilies} from '../../../../constants/fontFamilies';
import CheckBox from '@react-native-community/checkbox';
import {launchCamera} from 'react-native-image-picker';
import {Image} from 'react-native';
import hotelAPI from '../../../../apis/hotelApi';

const ModalImage = ({setModalSelectImage, idHotel, setImgs}) => {
  const [img, setImg] = useState('');
  const [imgUpload, setImgUpload] = useState('');

  const reqCameraPermisson = async () => {
    try {
      const checkPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );

      if (checkPermission === PermissionsAndroid.RESULTS.GRANTED) {
        const rs = await launchCamera({mediaType: 'photo', cameraType: 'back'});
        setImg(rs.assets[0].uri);
        setImgUpload(rs.assets[0]);
        console.log(rs);
      } else {
        console.log('cancel');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdata = async photo => {
    const uri = photo.uri;
    const type = photo.type;
    const name = photo.fileName;
    const src = {uri, type, name};

    const data = new FormData();
    data.append('file', src);
    data.append('upload_preset', 'jz65rwsc');
    data.append('cloud_name', 'dsdbqfn5l');

    const img = await fetch(
      'https://api.cloudinary.com/v1_1/dsdbqfn5l/image/upload',
      {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      },
    )
      .then(res => res.json())
      .then(data => {
        return data;
      })
      .catch(err => {});

    return img.url;
  };

  const handleAddImg = async () => {
    const url = await handleUpdata(imgUpload);

    const hotel = await hotelAPI.HandleHotel(
      '/addImageHotel',
      {idHotel: idHotel, linkImg: url},
      'post',
    );

    console.log(hotel.data.photo);
    setImgs(hotel.data.photo);
    setModalSelectImage(false);
  };

  return (
    <Modal style={[{flex: 1}]} transparent statusBarTranslucent>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.3)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            height: 140,
            width: '100%',
          }}
          onPress={() => setModalSelectImage(false)}></TouchableOpacity>
        <View
          style={{
            backgroundColor: appColors.white,
            flex: 1,
            width: '100%',
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            paddingHorizontal: 16,
          }}>
          <View style={{marginTop: 40}}>
            {img ? (
              <Image
                source={{uri: img}}
                style={{width: '100%', height: 400, borderRadius: 10}}
              />
            ) : (
              <View
                style={{
                  width: '100%',
                  borderWidth: 1,
                  borderColor: appColors.gray1,
                  borderStyle: 'dashed',
                  height: 400,
                  borderRadius: 10
                }}></View>
            )}
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 20,
              left: 0,
              right: 0,
              paddingHorizontal: 40,
            }}>
            <Button onPress={() => reqCameraPermisson()} title="Tải ảnh lên" />
            <SpaceComponent height={20} />
            <Button onPress={() => handleAddImg()} title="Lưu" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalImage;
