import {View, Text, Modal, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import utilHotelAPI from '../../../apis/utilHotelApi';
import {
  ButtonComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import {fontFamilies} from '../../../constants/fontFamilies';
import CheckBox from '@react-native-community/checkbox';

const ModalUtils = ({setModalSelectUtils}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await utilHotelAPI.HandleUtilHotel('/getAll');

    const dataCheckBox = res.data.map(util => ({...util, check: false}));

    setToggleCheckBox(dataCheckBox);
  };

  const handleValueUtil = (value, index) => {
    const data = [...toggleCheckBox];

    const dataNew = data.map(util => {
      if (util._id === index) {
        return {
          ...util,
          check: value,
        };
      } else {
        return util;
      }
    });
    setToggleCheckBox(dataNew);

    let dataId = dataNew.filter(util => util.check);
    dataId = dataId.map(util => util._id);
    // setValueUtil(dataId);
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
          onPress={() => setModalSelectUtils(false)}></TouchableOpacity>
        <View
          style={{
            backgroundColor: appColors.white,
            flex: 1,
            width: '100%',
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            paddingHorizontal: 16,
          }}>
          <SpaceComponent height={8} />
          <View
            style={{
              justifyContent: 'center',
              width: '100%',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: 4,
                width: 50,
                borderRadius: 20,
                backgroundColor: appColors.gray1,
              }}></View>
          </View>
          <SpaceComponent height={26} />
          <TextComponent
            text="Tiện ích"
            font={fontFamilies.semiBold}
            size={16}
          />

          <View style={{paddingHorizontal: 16}}>
            {toggleCheckBox.map(toggle => (
              <RowComponent
                justify="space-between"
                styles={{marginTop: 8}}
                key={toggle._id}>
                <TextComponent
                  text={toggle.name}
                  font={fontFamilies.semiBold}
                />
                <CheckBox
                  tintColors={{
                    true: appColors.primary1,
                    false: appColors.text1,
                  }}
                  value={toggle.check}
                  onValueChange={newValue =>
                    handleValueUtil(newValue, toggle._id)
                  }
                />
              </RowComponent>
            ))}
          </View>

          <SpaceComponent height={24} />
          <ButtonComponent type="primary" text="Áp dụng"></ButtonComponent>
        </View>
      </View>
    </Modal>
  );
};

export default ModalUtils;
