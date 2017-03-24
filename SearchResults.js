import React, { Component } from 'react';

import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableHighlight,
  ListView,
} from 'react-native';

var ProperView = require('./PropertyView');

class searchResults extends Component {
  constructor(props) {
    super(props);
      var dataSource = new ListView.DataSource(
          {rowHasChanged: (r1, r2) => r1.guid !== r2.guid});
      this.state = {
        dataSource: dataSource.cloneWithRows(this.props.listings)
      };
    }
    renderRow(rowData, sectionID, rowID) {
      return (
        <TouchableHighlight onPress={() => this.rowPressed(rowID)}
          underlayColor= '#dddddd'>
          <View>
            <View style={styles.rowContainer}>
              <Image style={styles.thumb} source={{uri: rowData.img_url}}/>
              <View style = {styles.textContainer}>
                <Text style={styles.price}>${rowData.price}</Text>
                <Text style={styles.title}
                      numberOfLines={2}>{rowData.title}</Text>
              </View>
            </View>
              <View style={styles.separator}/>
          </View>
        </TouchableHighlight>
      );
    }
    rowPressed(propertyGuid) {
      //var property = this.props.listings.filter(prop => prop.guid === propertyGuid);
      var property = this.props.listings[propertyGuid];
      this.props.navigator.push({
        title: '房产详情',
        component: ProperView,
        passProps: {property: property}
      });
      //alert(propertyGuid);
    }

    render () {
      return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow= {this.renderRow.bind(this)}
          />
      );
    }
}

var styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer :{
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  price :{
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title :{
    fontSize:20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  }
})



module.exports = searchResults;
