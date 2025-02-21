import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import {RootStackParamList} from '../routes';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  safearea: {flex: 1, backgroundColor: 'black'},
});

const LOGIN_URL = 'https://nid.naver.com/nidlogin.login';
type Props = NativeStackScreenProps<RootStackParamList>;

const LoginScreen = () => {
  const navigation = useNavigation<Props>();
  return (
    <SafeAreaView style={styles.safearea}>
      <WebView
        source={{uri: LOGIN_URL}}
        onNavigationStateChange={event => {
          console.log('onNavigationStateChange', event.url);
          if (event.url === 'https://www.naver.com/') {
            navigation.goBack();
          }
        }}
      />
    </SafeAreaView>
  );
};

export default LoginScreen;
