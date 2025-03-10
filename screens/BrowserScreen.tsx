import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useContext, useMemo, useRef, useState} from 'react';
import {
  Animated,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import {RootStackParamList} from '../routes';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {WebViewContext} from '../components/WebViewProvider';
import {useBackHandler} from '@react-native-community/hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'browser'>;

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: 'black',
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
  navigator: {
    flexDirection: 'row',
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 40,
    justifyContent: 'space-between',
  },
  button: {
    width: 30,
    height: 30,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homebuttonIconOutline: {
    borderWidth: 1,
    borderColor: 'white',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homebuttonIconText: {
    color: 'white',
  },
});

const NavButton = ({
  iconName,
  disabled,
  onPress,
}: {
  iconName: string;
  disabled?: boolean;
  onPress?: () => void;
}) => {
  const color = disabled ? 'gray' : 'white';
  return (
    <TouchableOpacity
      style={styles.button}
      disabled={disabled}
      onPress={onPress}>
      <MaterialCommunityIcons name={iconName} size={24} color={color} />
    </TouchableOpacity>
  );
};

const DISABLE_PINCH_ZOOM = `(function() {
  const meta = document.createElement('meta');
  meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
  meta.setAttribute('name', 'viewport');
  document.getElementsByTagName('head')[0].appendChild(meta);

  document.body.style['user-select'] = 'none';
  document.body.style['-webkit-user-select'] = 'none';
})();`;

const BrowserScreen = ({route, navigation}: Props) => {
  const context = useContext(WebViewContext);
  const initialUrl = route.params?.initialUrl ?? 'https://m.naver.com'; // default url
  const [url, setUrl] = useState(initialUrl);
  const urlTitle = useMemo(
    () => url.replace('https://', '').split('/')[0],
    [url],
  );
  const progressAnim = useRef(new Animated.Value(0)).current; // Animated.Value created;0 is the initial value; and saved while keeping the reference
  const [isLoading, setIsLoading] = useState(false);
  const webViewRef = useRef<WebView | null>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  useBackHandler(() => {
    if (canGoBack) {
      webViewRef.current?.goBack();
      return true;
    }
    return false;
  });

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
        ref={ref => {
          webViewRef.current = ref;
          if (ref != null) {
            context?.addWebView(ref);
          }
        }}
        source={{uri: initialUrl}}
        onNavigationStateChange={event => {
          setCanGoBack(event.canGoBack);
          setCanGoForward(event.canGoForward);
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
        injectedJavaScript={DISABLE_PINCH_ZOOM}
        onMessage={() => {}}
        allowsLinkPreview={false}
      />
      <View style={styles.navigator}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.goBack();
          }}>
          <View style={styles.homebuttonIconOutline}>
            <Text style={styles.homebuttonIconText}>N</Text>
          </View>
        </TouchableOpacity>
        <NavButton
          iconName="arrow-left"
          disabled={!canGoBack}
          onPress={() => {
            webViewRef.current?.goBack();
          }}
        />
        <NavButton
          iconName="arrow-right"
          disabled={!canGoForward}
          onPress={() => {
            webViewRef.current?.goForward();
          }}
        />
        <NavButton
          iconName="refresh"
          onPress={() => {
            webViewRef.current?.reload();
          }}
        />
        <NavButton
          iconName="share-outline"
          onPress={() => {
            Share.share({message: url});
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default BrowserScreen;
