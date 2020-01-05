import React, { Component } from 'react'
import { View, Text, Alert, PermissionsAndroid } from 'react-native'
import colors from './../../assets/colors'
import st from './../../assets/styles'
import moment from 'moment'
import Geolocation from '@react-native-community/geolocation'
import Geocoder from 'react-native-geocoding'

import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Right,
  Body,
  Button
} from 'native-base'

import ArchHeader from './../../components/ArchHeader'

class Qibla extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
    }
  }

  render() {
    return (
      <Container>
        <ArchHeader title="Qibla Direction" isLoading={this.state.isLoading} />
        <Content style={{ backgroundColor: colors.backgroundColor }}>
          
        </Content>
      </Container>
    );
  }
}

export default Qibla
