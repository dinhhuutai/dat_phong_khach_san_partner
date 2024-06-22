import {View, Text, StatusBar, Image} from 'react-native';
import React, {useState} from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {fontFamilies} from '../../constants/fontFamilies';
import {appColors} from '../../constants/appColors';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Validate} from '../../utils/validate';
import authenticationAPI from '../../apis/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import { addAuth } from '../../redux/reducers/authReducer';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async () => {

    if (!email) {
      setErrorMessage('Vui lòng nhập email');
      return;
    } else if (!Validate.email(email)) {
      setErrorMessage('Email không đúng định dạng');
      return;
    } else if (!password) {
      setErrorMessage('Vui lòng nhập mật khẩu');
      return;
    }

    try {
      setIsLoading(true);

      const res = await authenticationAPI.HandleAuthentication(
        '/login',
        {email, password},
        'post',
      );
      console.log(res);

      if (!res.success && res.message === 'Incorrect username or password') {
        setErrorMessage('Mật khẩu không chính xác');
      }

      if (res.success) {
        dispatch(addAuth(res.data));
        await AsyncStorage.setItem('auth', JSON.stringify(res.data));
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <ContainerComponent isScroll>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
        <Image source={require('../../assets/images/logo.png')} />
      </View>
      <View
        style={{
          shadowColor: appColors.black,
          shadowOffset: {width: 10, height: 10},
          shadowOpacity: 10,
          shadowRadius: 10,
          elevation: 5, // Thêm elevation cho Android
          backgroundColor: appColors.white,
          marginHorizontal: 16,
          paddingTop: 20,
          borderRadius: 20,
          marginTop: 30,
        }}>
        <SectionComponent
          styles={{
            paddingTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            className="text-[20px]"
            style={{
              fontFamily: fontFamilies.semiBold,
              fontSize: 24,
              color: appColors.text,
            }}>
            Đăng nhập
          </Text>
        </SectionComponent>
        <Text
          style={{
            textAlign: 'center',
            paddingHorizontal: 50,
            marginBottom: 20,
            lineHeight: 20,
            fontSize: 14,
          }}>
          Dễ dàng quản lý khách sạn của bạn trên thiết bị di động
        </Text>
        <SectionComponent
          styles={{
            marginTop: 16,
          }}>
          <View style={{flex: 1, position: 'relative'}}>
            <InputComponent
              value={email}
              onChange={val => {
                setEmail(val);
                setErrorMessage('');
              }}
              allowClear
              affix={
                <MaterialCommunityIcons
                  name="email-outline"
                  size={22}
                  color={appColors.text}
                />
              }
            />
            <Text
              style={{
                color: appColors.text,
                fontFamily: fontFamilies.semiBold,
                fontSize: 14,
                position: 'absolute',
                paddingHorizontal: 4,
                backgroundColor: appColors.white,
                top: -10,
                left: 16,
              }}>
              Email
            </Text>
          </View>
          <View style={{flex: 1, position: 'relative', marginTop: 10}}>
            <InputComponent
              value={password}
              onChange={val => {
                setPassword(val);
                setErrorMessage('');
              }}
              allowClear
              isPassword
              affix={<Octicons name="key" size={22} color={appColors.text} />}
            />
            <Text
              style={{
                color: appColors.text,
                fontFamily: fontFamilies.semiBold,
                fontSize: 14,
                position: 'absolute',
                paddingHorizontal: 4,
                backgroundColor: appColors.white,
                top: -10,
                left: 16,
              }}>
              Set password
            </Text>
          </View>

          {errorMessage && (
            <View>
              <TextComponent text={errorMessage} color={appColors.danger} />
              <SpaceComponent height={6} />
            </View>
          )}
        </SectionComponent>

        <SectionComponent styles={{alignItems: 'center'}}>
          <ButtonComponent
            onPress={handleLogin}
            type="primary"
            text="Log in"></ButtonComponent>
        </SectionComponent>
      </View>

      <SpaceComponent height={4} />

      <View style={{width: '100%'}}>
        <Image
          style={{width: '100%', height: 200}}
          source={require('../../assets/images/login-partner.jpg')}
        />
      </View>
    </ContainerComponent>
  );
};

export default LoginScreen;
