import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

// import Lists from '../views/lists';
import TasksContainer from '../views/tasks';

const ListsDrawerItem = createStackNavigator(
  {
    Playground: {
      screen: TasksContainer,

      navigationOptions: ({ navigation }) => ({
        title: 'Todo Lists',
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

ListsDrawerItem.navigationOptions = {
  drawerLabel: 'To-do',
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

export default ListsDrawerItem;
