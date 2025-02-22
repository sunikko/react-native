import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useContext, useRef, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import {RouteNames, RootStackParamList} from '../routes';
import {WebViewContext} from '../components/WebViewProvider';

type Props = NativeStackScreenProps<RootStackParamList>;

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
  contentContainerStyle: {
    flex: 1,
  },
});

const SHOPPING_HOME_URL = 'https://shopping.naver.com/ns/home';

const ShoppingScreen = ({navigation}: Props) => {
  const context = useContext(WebViewContext);
  const webViewRef = useRef<WebView | null>(null);
  //prevent re-generate RefreshControl
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    webViewRef.current?.reload();
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  return (
    <SafeAreaView style={styles.safearea}>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <WebView
          ref={ref => {
            webViewRef.current = ref;
            if (ref != null) {
              context?.addWebView(ref);
            }
          }}
          source={{uri: SHOPPING_HOME_URL}}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onShouldStartLoadWithRequest={request => {
            if (
              request.url.startsWith(SHOPPING_HOME_URL) ||
              request.mainDocumentURL?.startsWith(SHOPPING_HOME_URL)
            ) {
              return true;
            }
            if (request.url != null && request.url.startsWith('https://')) {
              console.log(request.url);
              navigation.navigate(RouteNames.BROWSER, {
                initialUrl: request.url,
              });
              return false;
            }
            return true;
          }}
          onLoad={() => {
            setRefreshing(false);
          }}
          renderLoading={() => <></>}
          startInLoadingState={true}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShoppingScreen;
