import React, { Component } from 'react'
import { View, Text, Alert } from 'react-native'
import colors from './../../assets/colors'
import st from './../../assets/styles'
import moment from 'moment'
import Geocoder from 'react-native-geocoding'

import * as locationService from './../../services/location'
import * as calendarService from './../../services/calendar'

import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Right,
  Body,
} from 'native-base'

import ArchHeader from './../../components/ArchHeader'
import ArchHero from './../../components/ArchHero'

class Prayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      nowDate: moment().format('DD MMMM YYYY'),
      timings: {},
      cityName: ''
    }
  }

  componentDidMount() {
    locationService.requestLocationPermission(isGranted => {
      if (isGranted) {
        this.setState({ isLoading: true })
        locationService.getLocation(coords => {
          if (coords != null) {
            this.getCity(coords.latitude, coords.longitude)
            this.getPrayerTimes(coords.latitude, coords.longitude)
          }
        })
      }
    })
  }

  getCity = (lat, long) => {
    Geocoder.from(lat, long).then(res => {
      let addressComponent = res.results[0].address_components[4]
      this.setState({
        cityName: addressComponent.long_name
      })
    }).catch(error => {
      console.log(error)
    })
  }

  getPrayerTimes = (lat, long) => {
    calendarService.getPrayerTimes(null, lat, long).then(res => {
      const response = res.data
      if (response.code === 200) {
        this.setState({
          timings: response.data.timings,
          isLoading: false
        })
      } else {
        Alert.alert('Error', response.status)
      }

      this.setState({ isLoading: false})
    }).catch(error => {
      if (!error.status) {
        Alert.alert('Error', 'Network Error')
      }

      this.setState({ isLoading: false})
    })
  }

  render() {
    const getTiming = (name, time) => {
      if (!this.state.isLoading) {
        return (
          <ListItem icon noBorder style={{ marginTop: 5, marginBottom: 10 }}>
            <Left style={{ borderLeftWidth: 3, borderLeftColor: colors.primaryColor }} />
            <Body>
              <Text style={st.txtBoldLarge}>{name}</Text>
            </Body>
            <Right>
              <View style={{ width: 100, alignItems: 'flex-end' }}>
                <Text style={st.txtBoldLarge}>{time}</Text>
              </View>
            </Right>
          </ListItem>
        )
      } else {
        return <View />
      }
    }

    return (
      <Container>
        <ArchHeader title="Prayer Schedule" isLoading={this.state.isLoading} />
        <Content style={{ backgroundColor: colors.backgroundColor }}>
          <ArchHero for='prayer' currentDate={this.state.nowDate} cityName={this.state.cityName} timings={this.state.timings} />
          <Content>
            <List>
              {getTiming('Fajr', this.state.timings.Fajr)}
              {getTiming('Sunrise', this.state.timings.Sunrise)}
              {getTiming('Dhuhr', this.state.timings.Dhuhr)}
              {getTiming('Asr', this.state.timings.Asr)}
              {getTiming('Maghrib', this.state.timings.Maghrib)}
              {getTiming('Isha', this.state.timings.Isha)}
              {getTiming('Imsak', this.state.timings.Imsak)}
            </List>
          </Content>
        </Content>
      </Container>
    );
  }
}

export default Prayer