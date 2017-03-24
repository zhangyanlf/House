/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} from 'react-native';
var SearchPage = require('./SearchPage');

export default class House extends Component {
  render() {
    return (
      <Text style={styles.text}>
        HelloWorld
      </Text>
    );
  }
}


class showNav extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: '搜房',
          component:SearchPage,
        }}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    color: 'red',
    backgroundColor: 'white',
    fontSize: 20,
    margin: 80
  }
});

AppRegistry.registerComponent('House', () => showNav);
