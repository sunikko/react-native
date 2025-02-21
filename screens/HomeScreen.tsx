import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import {RouteNames, RootStackParamList} from '../routes';

type Props = NativeStackScreenProps<RootStackParamList>;

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  webview: {
    // marginTop: 20,
  },
});

const HomeScreen = ({navigation}: Props) => {
  return (
    <SafeAreaView style={styles.safearea}>
      <WebView
        source={{uri: 'https://m.naver.com'}}
        // style={styles.webview}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onShouldStartLoadWithRequest={request => {
          if (
            request.url.startsWith('https://m.naver.com') ||
            request.mainDocumentURL?.startsWith('https://m.naver.com')
          ) {
            return true;
          }
          if (request.url != null && request.url.startsWith('https://')) {
            navigation.navigate(RouteNames.BROWSER, {initialUrl: request.url});
            return false;
          }
          return true;
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
