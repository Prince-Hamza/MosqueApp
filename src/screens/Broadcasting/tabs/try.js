
import React, { Component } from 'react'
import colors from './../../../assets/colors'
import RNFS from 'react-native-fs'
import firebase from 'firebase'
import { View, Text, Alert, TouchableHighlight } from 'react-native'
import {  Content,  Icon,  Item,  Input} from 'native-base'
import AudioRecord from 'react-native-audio-record'
import {PermissionsAndroid} from 'react-native'


class Try extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numbers: [1, 2, 3, 4, 5, 6],
      recordedFiles:[],
      BroadCastName:""
    }
  }

  componentDidMount () {

var myPath =  RNFS.DocumentDirectoryPath + "/test.wav"



 //RNFS.readDir(RNFS.DocumentDirectoryPath)


   // .then((result) => {
//alert( JSON.stringify(result[0]))

    //   this.setState({recordedFiles: result});
    //   return Promise.all([RNFS.stat(result[0].path), result[0].path])

     
      // })
      //.catch((err) => {
     //  console.log(err.message, err.code);
    //   });

 } // comp




 getBase64Image(imgUrl, callback) {


}

 

  render() {

    return (
    <Content style={{ backgroundColor: colors.backgroundColor }}>
        <View style={{
          flex: 1,
          marginTop: 20,
          marginLeft: 20,
          marginRight: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{
            paddingBottom: 20,
            paddingTop: 20,
            fontSize: 25,
          }}>Enter Broadcast Name</Text>
          <Item regular>
            <Input placeholder="Broadcast Name" placeholderTextColor='white' onChangeText = {(value)=>{

//alert(value)
 this.setState({BroadCastName:value})


   }} />
          </Item>
        </View>
      <View style={{ flex: 1,    marginTop: 30,  justifyContent: 'center',alignItems:'center',}}>
          <TouchableHighlight
          style={style.highButton}
          underlayColor={colors.backgroundColor}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={style.iconButton}>
              <Icon name='ios-microphone' style={{fontSize: 60, color: 'white'}} onPress = {()=>{



   this.props.Toggle(this.state.BroadCastName)

//const path = RNFS.DocumentDirectoryPath + '/lasttest.mp3'

//RNFS.writeFile(path, myBase64, 'base64').then(() => playSound())

//const playSound = () => {

//const sound = new Sound(path, '', () => Play(sound))

//const Play = (sound) => sound.play()

//}





// readFile(filepath: string, encoding?: string)

//RNFS.readFile(path, 'base64').then((res) =>  playSoundva(res))

//const playSound = (res) => {
//alert()
//const sound = new Sound(path, '', () => Play(sound))

//const Play = (sound) => sound.play()

//}








}} />
            </View>
            <Text style={{
              flex: 1,
              fontSize: 25,
            }}>Start Broadcast</Text>
          </View>
        </TouchableHighlight>
        </View>
      </Content>
    );
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
    backgroundColor: colors.primaryColor,
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

export default Try

var AudioBase64 
