import React, { Component } from 'react';

import{
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image
} from 'react-native';

var searchResults = require('./SearchResults');

class SearchPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchsString: 'london',
      isLoading: false,
      message: ''
    };
  }


  onSearchTextChanged(event) {
    //alert('onSearchTextChanged');
   this.setState({searchsString: event.nativeEvent.text});
    //alert(this.state.searchsString);
  }


  /**添加方法*/
  _executeQuery(query) {
    console.log(query);
    this.setState({isLoading: true});
    fetch(query)
      .then(response => response.json())
      .then(json => this._heandleResponse(json.response))
      .catch(error =>
          this.setState({
              isLoading: false,
              message: 'Something bad happened' + error
          }));
  }

  _heandleResponse(response) {
    this.setState({isLoading: false, message: ''});
    if (response.application_response_code.substr(0,1)=== '1') {
       this.props.navigator.push({
         title: '搜索结果',
         component: searchResults,
         passProps: {listings: response.listings}
       });
    } else {
      this.setState({message: 'Location not recognized; place try again'});
    }
  }


  onSearchPressed () {
      var query = urlForQueryAndPage('place_name', this.state.searchsString, 1);
      this._executeQuery(query);
  }

  onLocationpressed (){
    /*
    navigator.geolocation.getCurrentPosition(
      location => {
        var search = location.coords.latitude + ',' + location.coords.longitude;
        this.setState({searchsString: search});
        var query = urlForQueryAndPage('centre_point', search, 1);
        this._executeQuery(query);
      },
      error => {
        this.setState({
          message: 'There was a problem with obtaining your location: ' + error
        });
      }
    )
    */
    alert('代码中打开onLocationpressed方法');
  }




  render() {

    return(
      <View style={styles.container}>
        <Text style={styles.description}>
          欢迎来到zhangyanlf的搜房App
        </Text>
        <Text style={styles.description}>
          请根据您想居住的城市搜索对应的House
        </Text>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            value={this.state.searchsString}
            onChange={this.onSearchTextChanged.bind(this)}
            placeholder='请输入搜索内容'
            />
          <TouchableHighlight
            style={styles.button}
            underlayColor='#99D9F4'
            onPress={this.onSearchPressed.bind(this)}
            >
            <Text style={styles.buttoText}>搜索</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.flowRight}>
        <TouchableHighlight
          style={styles.button}
          onPress={this.onLocationpressed.bind(this)}
          underlayColor='#99D9F4'
          >
          <Text style={styles.buttoText}>Location</Text>
        </TouchableHighlight>
        </View>
        <Image source={require('./img/house1.png')} style={styles.image} />
        <Text>{this.state.message}</Text>

      </View>

    );
  }
}

function urlForQueryAndPage(key, value, pageNumber) {
  var data = {
    country: 'uk',
    pretty: '1',
    encoding: 'json',
    listing_type: 'buy',
    action: 'search_listings',
    page: pageNumber
  };
  data[key] = value;

  var queryString = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');
  return 'http://api.nestoria.co.uk/api?' + queryString;
};


var styles = StyleSheet.create({
  container: {
    padding: 30,
    marginTop: 80,
    alignItems: 'center'
  },
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#F5FF'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttoText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
  height: 36,
  flex: 1,
  flexDirection: 'row',
  backgroundColor: '#48BBEC',
  borderColor: '#48BBEC',
  borderWidth: 1,
  borderRadius: 8,
  marginBottom: 10,
  alignSelf: 'stretch',
  justifyContent: 'center'
},
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  image: {
    width: 217,
    height: 138
  }
})

module.exports = SearchPage;
