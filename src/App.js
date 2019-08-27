/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment, useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { store, persist } from './reducers';
import { Provider } from 'react-redux';
import Navigation from './components/navigation';

const App = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    persist(() => {
      setReady(true);
    });
  });
  
  const loading = (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );

  const loaded = (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );

  return ready ? loaded : loading;

  // return (
  //    <Fragment>
  //      <StatusBar barStyle="dark-content" />
  //       <SafeAreaView>
  //         <ScrollView
  //          contentInsetAdjustmentBehavior="automatic"
  //          style={styles.scrollView}>

  //         <Provider store={store}>
  //           <Navigation />
  //         </Provider>
  //        </ScrollView>
  //      </SafeAreaView>
  //    </Fragment>
  // );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
