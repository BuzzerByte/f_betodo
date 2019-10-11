import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator,
  DrawerItems,
} from 'react-navigation';
const WINDOW_WIDTH = Dimensions.get('window').width;
// import Profile from '../Profile';
import Home from '../Home';

import homeIcon from '../../assets/ic_home/ic_home.png';
import settingsIcon from '../../assets/ic_settings/ic_settings.png';
import Colors from '../../helpers/Colors';
import Components from '../drawer/components';
import Ratings from '../drawer/ratings';
import Pricing from '../drawer/pricing';
import Login from '../drawer/login';
import Profile from '../drawer/profile';
import Lists from '../drawer/lists';
import Payment from '../drawer/payment';
import Settings from '../drawer/settings';

// const iconForTab = ({ state }) => {
//   switch (state.routeName) {
//     case 'Home':
//       return homeIcon;
//     case 'Profile':
//       return settingsIcon;
//     default:
//       return null;
//   }
// };

// const TabIcon = ({ icon, tintColor }) => (// eslint-disable-line
//   <Image
//     source={icon}
//     style={{ tintColor }}
//   />
// );

// const ProfileStack = createStackNavigator({ Profile });
// const HomeStack = createStackNavigator({ Home });
// const AppStack = createBottomTabNavigator(
//   {
//     Home: HomeStack,
//     Profile: ProfileStack,
//   },
//   {
//     tabBarPosition: 'bottom',
//     tabBarOptions: {
//       activeTintColor: Colors.primary,
//       inactiveTintColor: Colors.gray,
//       style: {
//         backgroundColor: Colors.White,
//       },
//     },
//     defaultNavigationOptions: ({ navigation }) => ({
//       tabBarIcon: ({ tintColor }) => (// eslint-disable-line
//         <TabIcon
//           icon={iconForTab(navigation)}
//           tintColor={tintColor}
//         />
//       ),
//     }),
//   },
// );
//added by adrian
const CustomDrawerContentComponent = props => (
  <View style={{ flex: 1, backgroundColor: '#43484d' }}>
    <View
      style={{ marginTop: 40, justifyContent: 'center', alignItems: 'center' }}
    >
      <Image
        source={require('../images/logo.png')}
        style={{ width: Math.min(WINDOW_WIDTH * 0.57, 200) }}
        resizeMode="contain"
      />
    </View>
    <View style={{ marginLeft: 10 }}>
      <DrawerItems {...props} />
    </View>
  </View>
);
const MainRoot = createDrawerNavigator(
  {
    
    // Login: {
    //   path: '/login',
    //   screen: Login,
    // },
    Profile: {
      path: '/profile',
      screen: Profile,
    },
    Lists: {
      path: '/lists',
      screen: Lists,
    },
    Payment: {
      path: '/payment',
      screen: Payment,
    },
    // Components: {
    //   path: '/components',
    //   screen: Components,
    // },
    // Ratings: {
    //   path: '/ratings',
    //   screen: Ratings,
    // },
    // Pricing: {
    //   path: '/pricing',
    //   screen: Pricing,
    // },
    Settings: {
      path: '/settings',
      screen: Settings,
    },
  },
  {
    initialRouteName: 'Lists',
    contentOptions: {
      activeTintColor: '#548ff7',
      activeBackgroundColor: 'transparent',
      inactiveTintColor: '#ffffff',
      inactiveBackgroundColor: 'transparent',
      labelStyle: {
        fontSize: 15,
        marginLeft: 0,
      },
    },
    drawerWidth: Math.min(WINDOW_WIDTH * 0.8, 300),
    contentComponent: CustomDrawerContentComponent,
  }
);
export default MainRoot;
