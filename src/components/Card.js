import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {RowComponent, SpaceComponent, TextComponent} from '../components';
import {fontFamilies} from '../constants/fontFamilies';
import {appColors} from '../constants/appColors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {globalStyles} from '../styles/globalStyles';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const Card = ({item}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('DetailHotelScreen', {id: item._id})}>
      <View
        style={[
          {
            marginBottom: 26,
            borderRadius: 16,
            backgroundColor: appColors.white,
          },
          globalStyles.shadow,
        ]}>
        <Image
          style={[
            {
              width: '100%',
              height: 260,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              resizeMode: 'cover',
            },
          ]}
          source={{
            uri:
              item?.photo?.length < 0
                ? item?.photo[0]?.url
                : 'https://res.cloudinary.com/dsdbqfn5l/image/upload/v1715231860/ulj4pos7t6kcrzvtn7mp.jpg',
          }}
        />

        <SpaceComponent height={12} />

        <View style={{paddingHorizontal: 16, paddingBottom: 16}}>
          <RowComponent justify="space-between">
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                fontFamily: fontFamilies.bold,
                fontSize: 18,
                width: 200,
                color: appColors.text,
              }}>
              {item?.name}
            </Text>
            <TextComponent
              font={fontFamilies.bold}
              text={`${item.priceMin
                .toLocaleString('en-US')
                .replace(/,/g, '.')}.000đ/Night`}
              size={16}
              color={appColors.red1}
            />
          </RowComponent>

          <SpaceComponent height={12} />

          <RowComponent justify="space-between">
            <RowComponent>
              <Octicons name="location" size={18} color={appColors.text} />

              <SpaceComponent width={8} />

              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  fontSize: 14,
                  fontFamily: fontFamilies.semiBold,
                  color: appColors.text1,
                  width: 200,
                }}>
                {`${item?.district?.name}, ${item?.province?.name}`}
              </Text>
            </RowComponent>

            <RowComponent>
              <AntDesign name="star" size={18} color={appColors.yellow} />

              <SpaceComponent width={8} />

              <TextComponent
                text={item?.rating}
                font={fontFamilies.medium}
                color={appColors.text}
              />
            </RowComponent>
          </RowComponent>

          <SpaceComponent height={20} />
          <RowComponent justify="space-between">
            {item?.utils?.length > 0 &&
              item?.utils?.map(
                (util, index) =>
                  index < 4 && (
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
                  ),
              )}
          </RowComponent>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
