import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RootStackParamList, RouteNames} from '../routes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import CookieManager from '@react-native-cookies/cookies';

type Props = NativeStackScreenProps<RootStackParamList>;

const LoginButton = () => {
  const navigation = useNavigation<Props>();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const iconName = isLoggedIn ? 'logout' : 'login';

  useEffect(() => {
    CookieManager.get('https://.naver.com', true).then(cookie => {
      console.log(cookie);
      if (cookie.NID_SES) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

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
