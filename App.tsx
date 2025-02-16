import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ShoppingScreen from './screens/ShoppingScreen';
import {RouteNames, RootStackParamList} from './routes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BrowserScreen from './screens/BrowserScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeIcon = ({color, focused}: {color: string; focused: boolean}) => {
  const iconeName = focused ? 'home' : 'home-outline';
  return <MaterialCommunityIcons name={iconeName} size={26} color={color} />;
};

const HomeTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'black',
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      }}>
      <Tab.Screen
        name={RouteNames.HOME}
        component={HomeScreen}
        options={{tabBarLabel: 'Dashboard', tabBarIcon: HomeIcon}}
      />
      <Tab.Screen
        name={RouteNames.SHOPPING}
        component={ShoppingScreen}
        options={{tabBarLabel: 'Shop'}}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={RouteNames.HOMETAB}
          component={HomeTab}
          options={{headerShown: false}}
        />
        <Stack.Screen name={RouteNames.BROWSER} component={BrowserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
