import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RootStackParamList, RouteNames} from '../routes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import CookieManager from '@react-native-cookies/cookies';
import {WebViewContext} from './WebViewProvider';

type Props = NativeStackScreenProps<RootStackParamList>;

const LoginButton = () => {
  const navigation = useNavigation<Props>();
  const isFocused = useIsFocused();
  const context = useContext(WebViewContext);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const iconName = isLoggedIn ? 'logout' : 'login';

  console.log('isLoggedIn', isLoggedIn);

  useEffect(() => {
    if (isFocused) {
      CookieManager.get('https://.naver.com', true).then(cookie => {
        if (cookie.NID_SES) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      });
    }
  }, [isFocused]);

  const onPressLogin = useCallback(() => {
    navigation.navigate(RouteNames.LOGIN);
  }, [navigation]);

  const onPressLogout = useCallback(async () => {
    await CookieManager.clearAll(true);
    setIsLoggedIn(false);
    if (context?.webViewRefs.current != null) {
      context.webViewRefs.current.forEach(webView => {
        webView.reload();
      });
    }
  }, [context]);

  return (
    <TouchableOpacity onPress={isLoggedIn ? onPressLogout : onPressLogin}>
      <MaterialCommunityIcons name={iconName} color="white" size={24} />
    </TouchableOpacity>
  );
};

export default LoginButton;
