import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

// import ListsScreen1 from './lists/screen1';
// import ListsScreen2 from './lists/screen2';
// import ListsScreen3 from './lists/screen3';
// import ListsScreen4 from './lists/screen4';
import Tasks from './tasks/tasks';

// export default class Lists extends Component {
export default class TasksContainer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView horizontal pagingEnabled decelerationRate={0.993}>
          <Tasks />
          {/* <ListsScreen2 />
          <ListsScreen3 />
          <ListsScreen4 /> */}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
