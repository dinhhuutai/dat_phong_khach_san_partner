import {View, Text, Modal, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  ButtonComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '../../../../components';
import {appColors} from '../../../../constants/appColors';
import {RadioButton} from 'react-native-paper';
import {fontFamilies} from '../../../../constants/fontFamilies';

const ModalFilter = ({
  setCheckedBooking,
  setIsModalFilter,
  getData,
  startAt,
  endAt,
}) => {
  const [checked, setChecked] = useState(0);

  return (
    <Modal style={[{flex: 1}]} transparent statusBarTranslucent>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.3)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: appColors.white,
            width: 380,
            borderRadius: 10,
          }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: appColors.gray,
              borderRadius: 10,
              paddingHorizontal: 16,
              paddingVertical: 10,
            }}>
            <RowComponent justify="space-between">
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TextComponent
                  text="Tất cả"
                  font={fontFamilies.semiBold}
                  size={14}
                />
              </View>
              <RadioButton
                value={0}
                status={checked === 0 ? 'checked' : 'unchecked'}
                onPress={() => setChecked(0)}
              />
            </RowComponent>
            <SpaceComponent height={10} />
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: appColors.gray,
              }}></View>

            <SpaceComponent height={14} />

            <RowComponent justify="space-between">
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TextComponent
                  styles={{
                    paddingHorizontal: 16,
                    paddingVertical: 4,
                    backgroundColor: appColors.yellow,
                  }}
                  text="Chờ xác nhận"
                  font={fontFamilies.semiBold}
                  size={14}
                />
              </View>
              <RadioButton
                value={1}
                status={checked === 1 ? 'checked' : 'unchecked'}
                onPress={() => setChecked(1)}
              />
            </RowComponent>
            <SpaceComponent height={10} />
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: appColors.gray,
              }}></View>

            <SpaceComponent height={14} />
            <RowComponent justify="space-between">
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TextComponent
                  styles={{
                    paddingHorizontal: 16,
                    paddingVertical: 4,
                    backgroundColor: appColors.green1,
                  }}
                  text="Đã nhận"
                  font={fontFamilies.semiBold}
                  size={14}
                />
              </View>
              <RadioButton
                value={2}
                status={checked === 2 ? 'checked' : 'unchecked'}
                onPress={() => setChecked(2)}
              />
            </RowComponent>
            <SpaceComponent height={10} />
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: appColors.gray,
              }}></View>

            <SpaceComponent height={14} />
            <RowComponent justify="space-between">
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TextComponent
                  styles={{
                    paddingHorizontal: 16,
                    paddingVertical: 4,
                    backgroundColor: appColors.yellow1,
                  }}
                  text="Đã xác nhận"
                  font={fontFamilies.semiBold}
                  size={14}
                />
              </View>
              <RadioButton
                value={4}
                status={checked === 4 ? 'checked' : 'unchecked'}
                onPress={() => setChecked(4)}
              />
            </RowComponent>

            <SpaceComponent height={10} />
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: appColors.gray,
              }}></View>

            <SpaceComponent height={14} />
            <RowComponent justify="space-between">
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TextComponent
                  styles={{
                    paddingHorizontal: 16,
                    paddingVertical: 4,
                    backgroundColor: appColors.gray1,
                  }}
                  text="Đã hủy"
                  font={fontFamilies.semiBold}
                  size={14}
                />
              </View>
              <RadioButton
                value={3}
                status={checked === 3 ? 'checked' : 'unchecked'}
                onPress={() => setChecked(3)}
              />
            </RowComponent>

            <SpaceComponent height={10} />
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: appColors.gray,
              }}></View>

            <SpaceComponent height={14} />
            <RowComponent justify="space-between">
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TextComponent
                  styles={{
                    paddingHorizontal: 16,
                    paddingVertical: 4,
                    backgroundColor: appColors.gray,
                  }}
                  text="Khách không nhận"
                  font={fontFamilies.semiBold}
                  size={14}
                />
              </View>
              <RadioButton
                value={5}
                status={checked === 5 ? 'checked' : 'unchecked'}
                onPress={() => setChecked(5)}
              />
            </RowComponent>
          </View>

          <SpaceComponent height={30} />
          <View
            style={{width: '100%', alignItems: 'center', paddingBottom: 20}}>
            <View style={{width: 200}}>
              <ButtonComponent
                onPress={() => {
                  setCheckedBooking(checked);
                  setIsModalFilter(false);
                  getData(startAt, endAt, checked);
                }}
                type="primary"
                text="Áp dụng"></ButtonComponent>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalFilter;
