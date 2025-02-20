import React from 'react';
import {TouchableOpacity} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const isLoggedIn = false;
const iconName = isLoggedIn ? 'logout' : 'login';

const LoginButton = () => {
  return (
    <TouchableOpacity>
      <MaterialCommunityIcons name={iconName} color="white" size={24} />
    </TouchableOpacity>
  );
};

export default LoginButton;
