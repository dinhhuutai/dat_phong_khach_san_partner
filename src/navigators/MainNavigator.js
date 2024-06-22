/* eslint-disable prettier/prettier */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';
import {
  DetailBookingScreen,
  DetailRoomScreen,
  EditRoomScreen,
  RoomScreen,
} from '../screens';

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Main" component={DrawerNavigator} />
      <Stack.Screen
        name="DetailBookingScreen"
        component={DetailBookingScreen}
      />
      <Stack.Screen name="DetailRoomScreen" component={DetailRoomScreen} />
      <Stack.Screen name="EditRoomScreen" component={EditRoomScreen} />
      {/* <Stack.Screen name="RoomScreen" component={RoomScreen} /> */}
    </Stack.Navigator>
  );
};

export default MainNavigator;
