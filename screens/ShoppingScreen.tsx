import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {RouteNames} from '../routes';

const ShoppingScreen = ({navigation}) => {
  return (
    <View>
      <Text>Shopping Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate(RouteNames.BROWSER)}>
        <Text>Go to Browser</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShoppingScreen;
