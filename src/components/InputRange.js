import React, {useEffect, useState} from 'react';
import {Slider} from '@miblanchard/react-native-slider';
import {AppRegistry, StyleSheet, View, Text} from 'react-native';

const DEFAULT_VALUE = 0.2;

const SliderContainer = ({
  caption,
  children,
  sliderValue,
  trackMarks,
  vertical,
  onValueChange,
}) => {
  const [value, setValue] = useState(sliderValue ? sliderValue : DEFAULT_VALUE);
  let renderTrackMarkComponent;

  if (trackMarks?.length && (!Array.isArray(value) || value?.length === 1)) {
    renderTrackMarkComponent = index => {
      const currentMarkValue = trackMarks[index];
      const currentSliderValue =
        value || (Array.isArray(value) && value[0]) || 0;
      const borderWidth = 2; // Define or replace with a specific value
      const style =
        currentMarkValue > Math.max(currentSliderValue)
          ? {
              borderColor: 'red',
              borderWidth,
              left: -borderWidth / 2,
            }
          : {
              borderColor: 'grey',
              borderWidth,
              left: -borderWidth / 2,
            };
      return <View style={style} />;
    };
  }

  const renderChildren = () => {
    return React.Children.map(children, child => {
      if (!!child && child.type === Slider) {
        return React.cloneElement(child, {
          onValueChange: setValue,
          renderTrackMarkComponent,
          trackMarks,
          value,
        });
      }

      return child;
    });
  };

  useEffect(() => {
    onValueChange(value);
  }, [value]);

  return <View style={styles.sliderContainer}>{renderChildren()}</View>;
};

const InputRange = ({
  min = 0,
  max = 100,
  step = 1,
  maximumTrackTintColor = '#d3d3d3',
  minimumTrackTintColor = '#1fb28a',
  thumbTintColor = '#1a9274',
  thumbBgColor = '#fff',
  thumbBorderColor = '#000',
  thumbBorderWidth = 1,
  thumbWidth = 20,
  thumbHeight = 20,
  thumbRadius = 50,
  onValueChange,
}) => {
  return (
    <View style={styles.container}>
      <SliderContainer onValueChange={onValueChange} sliderValue={[min, max]}>
        <Slider
          animateTransitions
          maximumTrackTintColor={maximumTrackTintColor}
          maximumValue={max}
          minimumTrackTintColor={minimumTrackTintColor}
          minimumValue={min}
          step={step}
          thumbStyle={{
            backgroundColor: thumbBgColor,
            borderColor: thumbBorderColor,
            borderWidth: thumbBorderWidth,
            width: thumbWidth,
            height: thumbHeight,
            borderRadius: thumbRadius,
          }}
        />
      </SliderContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});

export default InputRange;
