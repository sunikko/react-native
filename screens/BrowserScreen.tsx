import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useMemo, useRef, useState} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
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
  loadingBarBackground: {
    height: 3,
    backgroundColor: 'white',
  },
  loadingBar: {
    height: '100%',
    backgroundColor: 'red',
  },
});

const BrowserScreen = ({route}: Props) => {
  const initialUrl = route.params?.initialUrl ?? 'https://m.naver.com'; // default url
  const [url, setUrl] = useState(initialUrl);
  const urlTitle = useMemo(
    () => url.replace('https://', '').split('/')[0],
    [url],
  );
  const progressAnim = useRef(new Animated.Value(0)).current; // Animated.Value created;0 is the initial value; and saved while keeping the reference
  const [isLoading, setIsLoading] = useState(false);

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.urlContainer}>
        <Text style={styles.urlText}>{urlTitle}</Text>
      </View>
      {isLoading && (
        <View style={styles.loadingBarBackground}>
          <Animated.View
            style={[
              styles.loadingBar,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>
      )}
      <WebView
        source={{uri: initialUrl}}
        style={styles.webview}
        onNavigationStateChange={event => {
          setUrl(event.url);
        }}
        onLoadStart={() => {
          setIsLoading(true);
        }}
        onLoadProgress={event => {
          progressAnim.setValue(event.nativeEvent.progress);
        }}
        onLoadEnd={() => {
          setIsLoading(false);
          progressAnim.setValue(0);
        }}
      />
    </SafeAreaView>
  );
};

export default BrowserScreen;
