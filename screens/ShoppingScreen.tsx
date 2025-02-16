import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {RouteNames, RootStackParamList} from '../routes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Icon from '@react-native-vector-icons/fontawesome';

type Props = NativeStackScreenProps<RootStackParamList>;

// MaterialCommunityIcons.loadFont();
const ShoppingScreen = ({navigation}: Props) => {
  return (
    <View>
      <Text>Shopping Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate(RouteNames.BROWSER)}>
        <Text>Go to Browser</Text>
      </TouchableOpacity>
      <MaterialCommunityIcons name="shopping" size={24} color="black" />
      {/* <Icon name="rocket" size={30} color="#900" /> */}
    </View>
  );
};

export default ShoppingScreen;
