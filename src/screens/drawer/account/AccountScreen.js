import {View, Text, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import {fontFamilies} from '../../../constants/fontFamilies';
import AsyncStorage, {
  useAsyncStorage,
} from '@react-native-async-storage/async-storage';
import userAPI from '../../../apis/userApi';
import authenticationAPI from '../../../apis/authApi';
import {useDispatch} from 'react-redux';
import {removeAuth} from '../../../redux/reducers/authReducer';

const AccountScreen = () => {
  const [mk, setMk] = useState('');

  const [user, setUser] = useState();

  const {getItem} = useAsyncStorage('auth');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const resUser = await getItem();
    const userTemp = JSON.parse(resUser);

    setUser(userTemp);
  };

  const handleSaveTK = async () => {
    const data = {
      email: user.email,
      password: mk,
    };

    const req = await authenticationAPI.HandleAuthentication(
      `/changePasswordNew`,
      data,
      'post',
    );

    if (req.success) {
      setMk('');
      Alert.alert('Thay đổi mật khẩu thành công.');
    }

    console.log(user._id);
  };

  const dispatch = useDispatch();

  const handleLogout = async () => {
    // await AsyncStorage.clear();
    // dispatch(removeAuth());

    await AsyncStorage.clear();
    dispatch(removeAuth());
  };

  return (
    <ContainerComponent isScroll>
      <SectionComponent>
        <SpaceComponent height={20} />
        <View
          style={{
            flex: 1,
            width: '100%',
          }}>
          <SectionComponent
            styles={{
              marginBottom: -20,
            }}>
            <TextComponent
              text="Tài khoản"
              size={16}
              font={fontFamilies.medium}
            />
            <SpaceComponent height={4} />
            <Text>{user?.email}</Text>
          </SectionComponent>

          <SpaceComponent height={16} />

          <SectionComponent
            styles={{
              marginBottom: -20,
            }}>
            <TextComponent
              text="Mật khảu"
              size={16}
              font={fontFamilies.medium}
            />
            <SpaceComponent height={4} />
            <InputComponent
              stylesInput={{
                fontFamily: fontFamilies.semiBold,
                fontSize: 16,
              }}
              value={mk}
              onChange={val => {
                setMk(val);
              }}
              isPassword
            />
          </SectionComponent>
        </View>
      </SectionComponent>

      <SpaceComponent height={30} />

      <SectionComponent styles={{alignItems: 'center'}}>
        <ButtonComponent
          onPress={handleSaveTK}
          type="primary"
          text="Lưu"></ButtonComponent>
      </SectionComponent>

      <SectionComponent styles={{alignItems: 'center'}}>
        <ButtonComponent
          onPress={handleLogout}
          type="primary"
          text="Log out"></ButtonComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default AccountScreen;
