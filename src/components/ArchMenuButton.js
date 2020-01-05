import React, { Component } from 'react'
import { View, Image, TouchableHighlight, Text, StyleSheet } from 'react-native'
import {
  Card,
  CardItem,
  Title,
} from 'native-base'
import st from './../assets/styles'
import colors from './../assets/colors'

class ArchMenuButton extends Component {
  getIcon = (icon) => {
    switch(icon) {
      case "broadcast":
        return <Image source={require('./../assets/images/icons/live-hdpi.png')} resizeMode={'contain'} style={style.icon} />;
      break;
      case "prayer":
        return <Image source={require('./../assets/images/icons/dua-hands-hdpi.png')} resizeMode={'contain'} style={style.icon} />;
      break;
      case "qibla":
        return <Image source={require('./../assets/images/icons/qibla-compass-hdpi.png')} resizeMode={'contain'} style={style.icon} />;
      break;
      case "masjid":
        return <Image source={require('./../assets/images/icons/jama-masjid-hdpi.png')} resizeMode={'contain'}  style={style.icon} />;
      break;
      case "quran":
        return <Image source={require('./../assets/images/icons/quran-hdpi.png')} resizeMode={'contain'} style={style.icon} />;
      break;
      default:
        return <Image source={require('./../assets/images/icons/calendar-hdpi.png')} resizeMode={'contain'} style={style.icon} />;
    }
  }

  getText = (icon) => {
    switch(icon) {
      case "broadcast":
        return 'Broadcasting';
      break;
      case "prayer":
        return 'Prayer Schedule';
      break;
      case "qibla":
        return 'Qibla Direction';
      break;
      case "masjid":
        return 'Masjid Finder';
      break;
      case "quran":
        return 'Quran';
      break;
      default:
        return 'Events';
    }
  }

  render() {
    return (
      <TouchableHighlight
        style={style.highButton}
        onPress={() => this.props.onPress(this.props.icon)}
        underlayColor={colors.backgroundColor}
      >
        <View style={{ flex: 1 }}>
          <View style={style.iconButton}>
            {this.getIcon(this.props.icon)}
          </View>
          <Text style={style.menuText} numberOfLines={1}>{this.getText(this.props.icon)}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

const style = {
  highButton: {
    flex: 1,
  },
  iconButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.homeButtonBgColor,
    width:120,
    height:120,
    padding: 15,
    borderRadius:60,
  },
  icon: {
    flex: 1,
    width: 45,
    height: undefined,
  },
  menuText: {
    alignSelf: 'center',
    fontSize: 15,
    marginTop: 10
  }
}

export default ArchMenuButton