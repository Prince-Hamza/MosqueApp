import React, { Component } from 'react'
import { Container, Content, Spinner } from 'native-base'
import Geocoder from 'react-native-geocoding'
import auth from '@react-native-firebase/auth'
import firebase from 'firebase'
import colors from '../../assets/colors'

class LoadingScreen extends Component {
  // check if user is already logged in
  

 componentDidMount () {

    Geocoder.init('AIzaSyBC0KVa-UF8wZMv9JRMUmbflqVAVP4BktI', {language : 'en'})

    //auth().onAuthStateChanged(user => {
      var user = true
      this.props.navigation.navigate(user ? 'LoginStack' : 'MainStack');

      // this.props.navigation.navigate(user ? 'LoginStack' : 'Quran'); //-- MainStack
    //});
}



  render() {
    return (
      <Container style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Spinner color={colors.primaryColor} />
      </Container>
    );
  }
}

export default LoadingScreen
