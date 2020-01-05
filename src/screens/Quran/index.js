import React, { Component } from 'react'
import { Text, Alert } from 'react-native'
import colors from './../../assets/colors'
import { observer, inject } from 'mobx-react'

import {
  Container,
  Content,
  Tabs,
  Tab,
  TabHeading
} from 'native-base'

import * as quranService from './../../services/quran'

import st from './../../assets/styles'
import ArchHeader from './../../components/ArchHeader'

import Surah from './tabs/Surah'
import Juz from './tabs/Juz'

class QuranScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      surahs: [],
    }
  }

  componentDidMount() {
    this.getQuranSurahs()
  }

  getQuranSurahs = () => {
    this.setState({ isLoading: true })
    quranService.getSurahs().then(res => {
      const response = res.data
      if (response.code === 200) {
        this.setState({ surahs: response.data})
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

  goToSurah = (surah) => {
    this.props.navigation.navigate('QuranDetail', {
      isSurah: true,
      surah: surah,
    })
  }

  goToJuz = (juz) => {
    this.props.navigation.navigate('QuranDetail', {
      isSurah: false,
      juz: juz,
    })
  }

  render() {
    const { userStore } = this.props.store;
    return (
      <Container>
        <ArchHeader title="Quran" isLoading={this.state.isLoading} hasTabs={true} />
        <Tabs tabBarUnderlineStyle={st.tabs}>
          <Tab tabStyle={st.tab}
            activeTabStyle={st.tabActive}
            textStyle={st.tabText}
            heading={
              <TabHeading style={st.tab}>
                <Text style={{ color: colors.primaryColor }}>Surah</Text>
              </TabHeading>
            }
          >
            <Surah isLoading={this.state.isLoading}
              surahList={this.state.surahs}
              goToSurah={(surah) => this.goToSurah(surah)}
            />
          </Tab>
          <Tab tabStyle={st.tab}
            activeTabStyle={st.tabActive}
            textStyle={st.tabText}
            heading={
              <TabHeading style={st.tab}>
                <Text style={{ color: colors.primaryColor }}>Juz</Text>
              </TabHeading>
            }
          >
            <Juz isLoading={this.state.isLoading} goToJuz={(juz) => this.goToJuz(juz)} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default inject('store')(observer(QuranScreen));
