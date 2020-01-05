import { inject, observer } from 'mobx-react'
import { Button } from 'native-base'
import React, { Component } from 'react'
import { Image, ScrollView, StatusBar, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import st from '../../assets/styles'
import ArchInput from '../../components/ArchInput'
import ArchRoundedButton from '../../components/ArchRoundedButton'

import auth from '@react-native-firebase/auth';

class ResetPassword extends Component {
  componentDidMount() { }
  state = {
    error: '',

    username: '',
    email: '',
    location: '',
    mobile: '',
    address: '',
    password: '',
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
              <ArchInput name='email' onchangetext={(text) => this.setState({ email: text, error: '' })} />

              <ArchRoundedButton text='RESET' navigation={this.props.navigation} onpress={() => {
                if (this.state.email) {
                  auth().sendPasswordResetEmail(this.state.email)
                    .then(function (user) {
                      alert('Please check your email...')
                    }).catch((error) => {
                      let err = error + 'sdf';
                      err = err.split('] ')[1];
                      this.setState({ error: err });
                    })
                }
              }} />

              {this.state.error ?
                <Text style={{ color: 'white', paddingTop: 15 }}>{this.state.error}</Text>
                : null}
            </ScrollView>

          </View>
        </LinearGradient>
      </View>
    );
  }
}

export default inject('store')(observer(ResetPassword))
