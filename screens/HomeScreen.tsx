import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import {RouteNames, RootStackParamList} from '../routes';
import {WebViewContext} from '../components/WebViewProvider';

type Props = NativeStackScreenProps<RootStackParamList>;

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
});

const HomeScreen = ({navigation}: Props) => {
  const context = useContext(WebViewContext);

  return (
    <SafeAreaView style={styles.safearea} edges={['left', 'right', 'bottom']}>
      <WebView
        ref={ref => {
          if (ref != null) {
            context?.addWebView(ref);
          }
        }}
        source={{uri: 'https://m.naver.com'}}
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
