import React, { Component } from 'react'
import { Text, Alert } from 'react-native'
import colors from './../../assets/colors'
import st from './../../assets/styles'

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

import * as quranService from './../../services/quran'

class QuranDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      title: '',
      ayahs: [],
      surah: {}
    }
  }

  componentDidMount() {
    this.init((isSurah, surah, juz) => {
      if (isSurah) {
        this.getAyahsFromSurah(surah.number)
      } else {
        this.getAyahsFromJuz(juz)
      }
    })
  }

  init = (callback) => {
    const params = this.props.navigation.state.params
    this.setState({
      title: params.surah ? params.surah.englishName : 'Juz ' + params.juz,
      surah: params.surah,
      juz: params.juz,
    })

    callback(params.isSurah, params.surah, params.juz)
  }

  getAyahsFromJuz = (number) => {
    this.setState({ isLoading: true})

    const offset = 0
    const limit = 10
    quranService.getAyahFromJuz(number, offset, limit).then(res => {
      const ayahResult = res.data
      
      if (ayahResult.code === 200) {
        const ayahs = ayahResult.data.ayahs
        
        let ayahWithTranslations = []
          ayahs.map((ayah, index) => {
            let ayahWithTranslation = {}
            ayahWithTranslation.numberInSurah = ayah.number
            ayahWithTranslation.textArabic = ayah.text
            ayahWithTranslation.translation = ''
            ayahWithTranslations.push(ayahWithTranslation)
          })

          this.setState({ ayahs: ayahWithTranslations })
      } else {
        Alert.alert('Error', res.status)
      }

      this.setState({ isLoading: false})
    })
  }

  getAyahsFromSurah = (number) => {
    this.setState({ isLoading: true})

    const offset = 0
    const limit = 10
    quranService.getAyahFromSurahID(number, offset, limit).then(res => {
      const ayahResult = res.data
      quranService.getTranslationFromSurah(number, offset, limit).then(res => {
        const transResult = res.data

        if (transResult.code === 200) {
          let ayahs = ayahResult.data
          let translations = transResult.data.ayahs

          let ayahWithTranslations = []
          ayahs.map((ayah, index) => {
            let ayahWithTranslation = {}
            ayahWithTranslation.numberInSurah = ayah.aya_number
            ayahWithTranslation.textArabic = ayah.aya_text
            ayahWithTranslation.translation = translations[index].text
            ayahWithTranslations.push(ayahWithTranslation)
          })

          this.setState({ ayahs: ayahWithTranslations })
        } else {
          Alert.alert('Error', response.status)
        }

        this.setState({ isLoading: false})
      })
    }).catch(error => {
      if (!error.status) {
        Alert.alert('Error', 'Network Error')
      }
      
      this.setState({ isLoading: false})
    })
  }

  render() {
    const getListOfAyah = () => {
      return this.state.ayahs.map((ayah, index) => (
        <ListItem icon key={index} style={st.listAyah}>
          <Left style={{ height: null }}>
            <Button transparent>
              <Text style={{ color: colors.grey }}>{ayah.numberInSurah}</Text>
            </Button>
          </Left>
          <Body style={{ flex: 1, height: null }}>
            <Text style={st.txtArabicBold}>{ayah.textArabic}</Text>
            <Text note>{ayah.translation}</Text>
          </Body>
          <Right style={{ height: null }} />
        </ListItem>
      ))
    }

    const bismillah = 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم'

    return (
      <Container>
        <ArchHeader title={this.state.title} isLoading={this.state.isLoading} />
        <Content style={{ backgroundColor: colors.backgroundColor, marginTop: 10 }}>
          <List>
            {this.state.surah && this.state.surah.number != 1 &&
              <ListItem icon style={st.bismillah} noBorder>
                {/* <Left style={{flex: 1}} /> */}
                <Body style={st.centerTitle}>
                  <Text style={st.txtArabicBold}>{bismillah}</Text>
                </Body>
                {/* <Right style={{flex: 1}} /> */}
              </ListItem> 
            }
            {(!this.state.isLoading && this.state.ayahs.length != 0) &&
              getListOfAyah()
            }
          </List>
        </Content>
      </Container>
    );
  }
}

export default QuranDetail