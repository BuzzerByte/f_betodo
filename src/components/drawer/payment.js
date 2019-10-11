import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

// import Lists from '../views/lists';
import PaymentController from '../views/payment';

const PaymentDrawerItem = createStackNavigator(
  {
    Playground: {
      screen: PaymentController,

      navigationOptions: ({ navigation }) => ({
        title: 'Payment',
        headerLeft: (
          <Icon
            name="menu"
            size={30}
            type="entypo"
            iconStyle={{ paddingLeft: 10 }}
            onPress={navigation.toggleDrawer}
          />
        ),
      }),
    },
  }
);

PaymentDrawerItem.navigationOptions = {
  drawerLabel: 'Payment',
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="list"
      size={30}
      iconStyle={{
        width: 30,
        height: 30,
      }}
      type="material"
      color={tintColor}
    />
  ),
};

export default PaymentDrawerItem;
