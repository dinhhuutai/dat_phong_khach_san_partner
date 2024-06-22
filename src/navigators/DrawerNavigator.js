/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  AccountScreen,
  AddRoomScreen,
  AnalyticsScreen,
  HotelScreen,
  ListBookingScreen,
  RoomScreen,
  RevenueScreen,
} from '../screens';
import {appColors} from '../constants/appColors';
import {fontFamilies} from '../constants/fontFamilies';
import { NavigationContainer } from '@react-navigation/native';

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  return (
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            paddingTop: 50,
          },
        }}>
        <Drawer.Screen
          options={{
            drawerLabel: '',
            drawerIcon: ({focused}) => (
              <View
                style={{
                  paddingLeft: focused ? 20 : 0,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <Text
                  style={{
                    color: focused ? appColors.primary : appColors.text,
                    fontFamily: focused
                      ? fontFamilies.medium
                      : fontFamilies.regular,
                  }}>
                  Analytics
                </Text>
  
                {/* <SimpleLineIcons
                  name="chart"
                  size={20}
                  color={focused ? appColors.primary : appColors.text}
                /> */}
              </View>
            ),
          }}
          name="Analytics"
          component={AnalyticsScreen}
        />
        <Drawer.Screen
          options={{
            drawerLabel: '',
            drawerIcon: ({focused}) => (
              <View
                style={{
                  paddingLeft: focused ? 20 : 0,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <Text
                  style={{
                    color: focused ? appColors.primary : appColors.text,
                    fontFamily: focused
                      ? fontFamilies.medium
                      : fontFamilies.regular,
                  }}>
                  List Booking
                </Text>
  
                {/* <Octicons
                  name="list-unordered"
                  size={20}
                  color={focused ? appColors.primary : appColors.text}
                /> */}
              </View>
            ),
          }}
          name="List Booking"
          component={ListBookingScreen}
        />
        <Drawer.Screen
          options={{
            drawerLabel: '',
            drawerIcon: ({focused}) => (
              <View
                style={{
                  paddingLeft: focused ? 20 : 0,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <Text
                  style={{
                    color: focused ? appColors.primary : appColors.text,
                    fontFamily: focused
                      ? fontFamilies.medium
                      : fontFamilies.regular,
                  }}>
                  Hotel
                </Text>
  
                {/* <Fontisto
                  name="hotel"
                  size={20}
                  color={focused ? appColors.primary : appColors.text}
                /> */}
              </View>
            ),
          }}
          name="Hotel"
          component={HotelScreen}
        />
        <Drawer.Screen
          options={{
            drawerLabel: '',
            drawerIcon: ({focused}) => (
              <View
                style={{
                  paddingLeft: focused ? 20 : 0,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <Text
                  style={{
                    color: focused ? appColors.primary : appColors.text,
                    fontFamily: focused
                      ? fontFamilies.medium
                      : fontFamilies.regular,
                  }}>
                  Room
                </Text>
  
                {/* <Feather
                  name="list"
                  size={20}
                  color={focused ? appColors.primary : appColors.text}
                /> */}
              </View>
            ),
          }}
          name="Room"
          component={RoomScreen}
        />
        <Drawer.Screen
          options={{
            drawerLabel: '',
            drawerIcon: ({focused}) => (
              <View
                style={{
                  paddingLeft: focused ? 20 : 0,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <Text
                  style={{
                    color: focused ? appColors.primary : appColors.text,
                    fontFamily: focused
                      ? fontFamilies.medium
                      : fontFamilies.regular,
                  }}>
                  Add Room
                </Text>
  
                {/* <Entypo
                  name="add-to-list"
                  size={20}
                  color={focused ? appColors.primary : appColors.text}
                /> */}
              </View>
            ),
          }}
          name="Add Room"
          component={AddRoomScreen}
        />
        <Drawer.Screen
          options={{
            drawerLabel: '',
            drawerIcon: ({focused}) => (
              <View
                style={{
                  paddingLeft: focused ? 20 : 0,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <Text
                  style={{
                    color: focused ? appColors.primary : appColors.text,
                    fontFamily: focused
                      ? fontFamilies.medium
                      : fontFamilies.regular,
                  }}>
                  Revenue
                </Text>
  
                {/* <FontAwesome
                  name="money"
                  size={20}
                  color={focused ? appColors.primary : appColors.text}
                /> */}
              </View>
            ),
          }}
          name="Revenue"
          component={RevenueScreen}
        />
        <Drawer.Screen
          options={{
            drawerLabel: '',
            drawerIcon: ({focused}) => (
              <View
                style={{
                  paddingLeft: focused ? 20 : 0,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <Text
                  style={{
                    color: focused ? appColors.primary : appColors.text,
                    fontFamily: focused
                      ? fontFamilies.medium
                      : fontFamilies.regular,
                  }}>
                  Account
                </Text>
  
                {/* <AntDesign
                  name="user"
                  size={20}
                  color={focused ? appColors.primary : appColors.text}
                /> */}
              </View>
            ),
          }}
          name="Account"
          component={AccountScreen}
        />
      </Drawer.Navigator>
  );
};

export default DrawerNavigator;
