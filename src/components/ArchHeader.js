import React, { Component } from 'react'
import {
  Header,
  Body,
  Title,
  Left,
  Right,
  Spinner
} from 'native-base'
import st from './../assets/styles'
import colors from './../assets/colors'
import auth from '@react-native-firebase/auth'
import AntDesign from 'react-native-vector-icons/AntDesign';
class ArchHeader extends Component {
  render() {
    return (
      <Header
        style={{ backgroundColor: colors.primaryColor }}
        androidStatusBarColor={colors.secondaryColor}
        hasTabs={this.props.hasTabs ? true : false}
      >
        <Left style={{ flex: 1 }} />
        <Body style={st.centerTitle}>
          <Title style={st.headerTitle}>{this.props.title}</Title>
        </Body>
        <Right style={{ flex: 1 }}>
          {this.props.logout ?
            <AntDesign name="logout" style={{ color: 'white', fontSize:25}} onPress={()=>{
              auth().signOut().then(()=> { 
                this.props.navigation.navigate('LoginStack')
              }, (error)=> {
              });
            }} />
            :
            null
          }
          {this.props.isLoading && <Spinner size='small' color='white' />}
        </Right>
      </Header>
    );
  }
}

export default ArchHeader
