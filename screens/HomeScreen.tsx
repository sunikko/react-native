import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  webview: {
    marginTop: 20,
  },
});

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safearea}>
      <WebView
        source={{uri: 'https://www.naver.com'}}
        style={styles.webview}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onShouldStartLoadWithRequest={request => {
          if (
            request.url.startsWith('hppts://m.naver.com') ||
            request.mainDocumentURL?.startsWith('hppts://m.naver.com')
          ) {
            return true;
          }
          if (request.url != null && request.url.startsWith('https://')) {
            return false;
          }
          return true;
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
