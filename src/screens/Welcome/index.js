import React, { Component } from 'react'
import { Text, Alert } from 'react-native'
import { observer, inject } from 'mobx-react'
import moment from 'moment'
import {
  Container,
  Content,
  Spinner
} from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'

import * as calendarService from './../../services/calendar'

import colors from './../../assets/colors'
import st from './../../assets/styles'
import ArchHeader from './../../components/ArchHeader'
import ArchHero from './../../components/ArchHero'
import ArchMenuButton from './../../components/ArchMenuButton'

class WelcomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      nowIs: moment().format('hh:mm A'),
      hijriDate: ''
    }
  }

  componentDidMount() {
    this.getTodayTime()
    this.getTodayDate()
  }

  getTodayDate = () => {
    this.setState({ isLoading: true })
    calendarService.getTodayDate().then(res => {
      const response = res.data
      const hijri = response.data.hijri

      const day = hijri.day
      const month = hijri.month.en
      const year = hijri.year
      const designation = hijri.designation.abbreviated

      const hijriDate = day + ' ' + month + ', ' + year + ' ' + designation

      this.setState({
        hijriDate: hijriDate,
        isLoading: false
      })
    }).catch(error => {
      if (!error.status) {
        Alert.alert('Error', 'Network Error')
      }

      this.setState({ isLoading: false})
    })
  }

  getTodayTime = () => {
    setInterval(() => {
      let date = moment().format('hh:mm A');
      this.setState({
        nowIs: date,
      })
    }, 5000)
  }

  goToMenu = (menu) => {
    const { navigation } = this.props
    navigation.navigate(menu)
  }

  render() {
    const { userStore } = this.props.store;

    return (
      <Container>
        <ArchHeader title="Home" logout={true} isLoading={this.state.isLoading} />
        <Content style={{ backgroundColor: colors.backgroundColor }}>
          <ArchHero for='welcome' currentTime={this.state.nowIs} currentDate={this.state.hijriDate} />
          <Content>
            <Grid>
              <Row style={st.menuRow}>
                <Col style={st.menuCol}>
                  <ArchMenuButton icon="broadcast"  onPress={(menu) => this.goToMenu('Broadcasting')} />
                </Col>
                <Col style={st.menuCol}>
                  <ArchMenuButton icon="prayer" onPress={(menu) => this.goToMenu('Prayer')} />
                </Col>
                <Col style={st.menuCol}>
                  <ArchMenuButton icon="qibla" onPress={(menu) => this.goToMenu('Qibla')} />
                </Col>
              </Row>
              <Row style={st.menuRow}>
                <Col style={st.menuCol}>
                  <ArchMenuButton icon="masjid" onPress={(menu) => this.goToMenu('Masjid')} />
                </Col>
                <Col style={st.menuCol}>
                  <ArchMenuButton icon="quran" onPress={(menu) => this.goToMenu('Quran')} />
                </Col>
                <Col style={st.menuCol}>
                  <ArchMenuButton icon="events" onPress={(menu) => this.goToMenu('Event')} />
                </Col>
              </Row>
            </Grid>
          </Content>
        </Content>
      </Container>
    );
  }
}

export default inject('store')(observer(WelcomeScreen));
