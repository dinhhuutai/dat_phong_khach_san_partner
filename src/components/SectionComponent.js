import {View, Text} from 'react-native';
import React from 'react';
import {globalStyles} from '../styles/globalStyles';

const SectionComponent = ({children, styles}) => {
  return <View style={[globalStyles.section, styles]}>{children}</View>;
};

export default SectionComponent;
