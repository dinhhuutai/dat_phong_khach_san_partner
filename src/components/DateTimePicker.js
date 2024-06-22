import {View, Text, TouchableOpacity, Modal} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {ArrowDown2} from 'iconsax-react-native';
import {appColors} from '../constants/appColors';
import moment from 'moment';

const DateTimePicker = ({type, onSelect, selected}) => {
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);
  console.log(selected);

  return (
    <View style={{width: '100%'}}>
      <TouchableOpacity
        onPress={() => {
          setIsShowDatePicker(true);
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: 4,
            borderColor: appColors.gray,
            paddingVertical: 8,
            paddingRight: 2,
          }}>
          <Text style={{flex: 1, textAlign: 'center'}}>{`${moment(
            selected,
          ).format('DD/MM/YYYY')}`}</Text>
          <ArrowDown2 size={18} color={appColors.gray1} />
        </View>
      </TouchableOpacity>
      {isShowDatePicker && (
        <DatePicker
          mode={type}
          open={true}
          date={new Date()}
          modal
          onConfirm={val => {
            setIsShowDatePicker(false);
            onSelect(val);
          }}
          onCancel={val => {
            setIsShowDatePicker(false);
          }}
        />
      )}
    </View>
  );
};

export default DateTimePicker;
