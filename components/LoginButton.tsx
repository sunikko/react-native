import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {TouchableOpacity} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RootStackParamList, RouteNames} from '../routes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const isLoggedIn = false;
const iconName = isLoggedIn ? 'logout' : 'login';

type Props = NativeStackScreenProps<RootStackParamList>;

const LoginButton = () => {
  const navigation = useNavigation<Props>();

  const onPressLogin = useCallback(() => {
    navigation.navigate(RouteNames.LOGIN);
  }, [navigation]);
  const onPressLogout = useCallback(() => {}, []);

  return (
    <TouchableOpacity onPress={isLoggedIn ? onPressLogout : onPressLogin}>
      <MaterialCommunityIcons name={iconName} color="white" size={24} />
    </TouchableOpacity>
  );
};

export default LoginButton;
