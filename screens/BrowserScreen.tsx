import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import {RootStackParamList} from '../routes';

type Props = NativeStackScreenProps<RootStackParamList, 'browser'>;

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: 'black',
  },
  webview: {
    marginTop: 20,
  },
  urlContainer: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  urlText: {
    color: 'white',
  },
});

const BrowserScreen = ({route}: Props) => {
  const initialUrl = route.params?.initialUrl ?? 'https://m.naver.com'; // default url
  const [url, setUrl] = useState(initialUrl);
  const urlTitle = useMemo(
    () => url.replace('https://', '').split('/')[0],
    [url],
  );

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.urlContainer}>
        <Text style={styles.urlText}>{urlTitle}</Text>
      </View>
      <WebView
        source={{uri: initialUrl}}
        style={styles.webview}
        onNavigationStateChange={event => {
          setUrl(event.url);
        }}
      />
    </SafeAreaView>
  );
};

export default BrowserScreen;
