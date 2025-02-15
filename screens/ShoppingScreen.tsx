import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {RouteNames, RootStackParamList} from '../routes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList>;

const ShoppingScreen = ({navigation}: Props) => {
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
