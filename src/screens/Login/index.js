//import auth from '@react-native-firebase/auth'
import { inject, observer } from 'mobx-react'
import { Button } from 'native-base'
import React, { Component } from 'react'
import { Image, StatusBar, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import st from './../../assets/styles'
import ArchInput from './../../components/ArchInput'
import ArchRoundedButton from './../../components/ArchRoundedButton'
import * as firebase from 'firebase'


class LoginScreen extends Component {
  state = {
    email: '',
    password: '',
    error: '',
  }
  componentDidMount () {

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

  render() {
   // const { userStore } = this.props.store;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#004e00" barStyle="light-content" />
        <LinearGradient colors={['#004e00', '#00c004', '#001900']} style={st.centerView}>
          <View style={st.contentForm}>
            <Image source={require(`./../../assets/images/logo.png`)} resizeMode='contain' style={st.logoImage} />

            <View style={st.separator} />

            <ArchInput name='email' onchangetext={(text) => { this.setState({ email: text }) }} />
            <ArchInput name='password' onchangetext={(text) => { this.setState({ password: text }) }} />
            <View style={{ flexDirection: 'row' }}>
              <Button transparent >
                <Text style={{ color: 'white' }}>Forgot your password?</Text>
              </Button>
              <Button transparent style={{ marginLeft: 5 }} onPress={() => {
                this.props.navigation.navigate('ResetPassword')
              }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Click Here</Text>
              </Button>
            </View>

            <ArchRoundedButton text='LOGIN' navigation={this.props.navigation} onpress={() => {

           



 if (this.state.email && this.state.password) {

firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
        .then((result)=>{
            console.log('Success : ',result)
           // var login = firebase.database().ref().child('users')
           // login.orderByChild('email').equalTo(result.user.email).once('value',snap => {
                console.log('Query Result')
              
                           this.props.navigation.navigate('MainStack')
           // })
        })
        .catch((error) => {
            console.log('Login Error',error)

        })             

          }

           }}

 />
            {this.state.error ?
              <Text style={{ color: 'white', paddingTop: 15 }}>{this.state.error}</Text>
              : null}
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Button transparent>
              <Text style={{ color: 'white' }}>New here?</Text>
            </Button>
            <Button transparent style={{ marginLeft: 5 }} onPress={() => this.props.navigation.navigate('Register')}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Register Now</Text>
            </Button>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

export default LoginScreen


 

//export default inject('store')(observer(LoginScreen))
