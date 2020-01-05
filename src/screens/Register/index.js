import { inject, observer } from 'mobx-react'
import { Button } from 'native-base'
import React, { Component, Fragment } from 'react'
import { Image, ScrollView, StatusBar, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import st from './../../assets/styles'
import ArchInput from './../../components/ArchInput'
import ArchRoundedButton from './../../components/ArchRoundedButton'
import * as firebase from 'firebase'

//import auth from '@react-native-firebase/auth';

class RegisterScreen extends Component {

  componentDidMount() {
try {
  firebase.database()
 }
catch(err) {
  // Initialize Firebase
   var firebaseConfig = {
      apiKey: "AIzaSyBFHmY8DjVykA5G8oVABKfxCT9UIFEyAHM",
      authDomain: "arline-fernandez.firebaseapp.com",
      databaseURL: "https://arline-fernandez.firebaseio.com",
      projectId: "arline-fernandez",
      storageBucket: "arline-fernandez.appspot.com",
      messagingSenderId: "19529955435",
      appId: "1:19529955435:web:77a134e9974d4311b2d92e"
    };firebase.initializeApp(firebaseConfig)

}



 }
  state = {
    error: '',
    username: '',
    email: 'sdfsdfsdf',
    location: '',
    mobile: '',
    address: '',
    password: 'sdfsdfadsfads',
    newPassword: '',
  }
  render() {
    const { userStore } = this.props.store;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#004e00" barStyle="light-content" />
        <LinearGradient colors={['#004e00', '#00c004', '#001900']} style={st.centerView}>
          <View style={{ marginTop: 10 }} />
          <Image source={require(`./../../assets/images/logo.png`)} resizeMode='contain' style={st.logoImage} />
          <View style={st.contentFormScroll}>
            <View style={st.separator} />

            <ScrollView style={{ flex: 1 }}>
              <ArchInput name='username' onchangetext={(text) => { this.setState({ username: text, error: '' }); }} />
              <ArchInput name='email' onchangetext={(text) => this.setState({ email: text, error: '' })} />
              <ArchInput name='location' onchangetext={(text) => this.setState({ location: text, error: '' })} />
              <ArchInput name='address' onchangetext={(text) => this.setState({ address: text, error: '' })} />
              <ArchInput name='mobile' onchangetext={(text) => this.setState({ mobile: text, error: '' })} />
              <ArchInput name='password' onchangetext={(text) => this.setState({ password: text, error: '' })} />
              <ArchInput name='newPassword' onchangetext={(text) => this.setState({ newPassword: text, error: '' })} />

              <ArchRoundedButton text='REGISTER' navigation={this.props.navigation} onpress={() => {
                if (this.state.email && this.state.password) {
                  firebase.auth()
                    .createUserWithEmailAndPassword(this.state.email, this.state.password)
                    .then(() => this.props.navigation.navigate('MainStack'))
                    .catch(error => {
console.log("Failed to register : " + error)
                      let err = error + 'sdf';
                      err = err.split('] ')[1];
                      this.setState({ error: err });
                    })
                } else {
                  this.setState({ error: 'Kindly provide email address and password' })
                }

              }} />
            </ScrollView>

          </View>
          <Fragment>
            {this.state.error ?
              <Text style={{ color: 'white', paddingTop: 15 }}>{this.state.error}</Text>
              : null}

            <View style={{ flexDirection: 'row' }}>
              <Button transparent>

                <Text style={{ color: 'white' }}>Have an account?</Text>
              </Button>
              <Button transparent style={{ marginLeft: 5 }} onPress={() => this.props.navigation.navigate('Login')}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Login Here</Text>
              </Button>
            </View>
          </Fragment>
        </LinearGradient>
      </View>
    );
  }
}

export default inject('store')(observer(RegisterScreen))
