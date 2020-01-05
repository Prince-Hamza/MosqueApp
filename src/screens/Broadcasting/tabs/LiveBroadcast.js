import React, { Component } from 'react'
import { View, Text, Alert, TouchableHighlight } from 'react-native'
import colors from './../../../assets/colors'
import AudioRecord from 'react-native-audio-record'
import {PermissionsAndroid} from 'react-native'
import Sound from 'react-native-sound';
import RNFS from 'react-native-fs';

import * as firebase from 'firebase'



import {
  Content,
  Icon,
  Item,
  Input
} from 'native-base'

class LiveBroadcast extends Component {

 constructor(props) {
    super(props)
    this.state = {
      recordedFiles: []
    }

  }


  componentDidMount(){

    this.sound = new Sound('https://firebasestrage.googleapis.com/v0/b/influence-8f6f6.appspot.com/o/mf.mp3?alt=media&token=5d2157b1-3397-4600-aed6-796d2af346c0');



    }

    
 RDF () {

  RNFS.readDir(RNFS.DocumentDirectoryPath)
    .then((result) => {

       this.setState({recordedFiles: result});

       return Promise.all([RNFS.stat(result[0].path), result[0].path]).then(function(values){

            alert(JSON.stringify(values))
            alert(this.state.recordedFiles)

})

       
    })
    .catch((err) => {
      console.log(err.message, err.code);
    });

   
     

   }




  



async AudioPerm  ()  {
try { const Granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {title:'Microphone Permission',
         message: 'Allow to use your audio Phone',},);

if (Granted === PermissionsAndroid.RESULTS.GRANTED){console.log("success");alert("Permission Granted");}else{console.log("Denied")} 
} catch (error) {console.warn(error)}
}



async WaitStop () {

let audioFile = await AudioRecord.stop()

setTimeout (() => {

AudioRecord.stop()

console.log(JSON.stringify(audioFile))

alert("Stopped")


var path = RNFS.DocumentDirectoryPath + '/test3.wav';

this._uploadFile(path)










},3000)
 



}









async Process () {

this.AudioPerm()

AudioRecord.init({sampleRate:16000,channels:1,bitsPerSample:16,audiosource:6,wavFile:'test3.wav'})

AudioRecord.start()

AudioRecord.on('data' , data => {
console.log(data)
})

await this.WaitStop()

setTimeout(() => {

AudioRecord.stop()

},5000)






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
            <Input placeholder="Broadcast Name" placeholderTextColor='white' />
          </Item>
        </View>
        <View style={{
          flex: 1,
          marginTop: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <TouchableHighlight
          style={style.highButton}
          underlayColor={colors.backgroundColor}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={style.iconButton}>
              <Icon name='ios-microphone' style={{fontSize: 60, color: 'white'}} onPress = {()=>{

alert("press")

this.Process()

//this.props.Toggle()

//this.sound.play()




//this.RDF()


//var path = RNFS.DocumentDirectoryPath + '/test3.wav';




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

export default LiveBroadcast

var AudioBase64

//https://stackoverflow.com/questions/39282752/upload-to-firebase-storage-from-react-native?rq=1

//https://stackoverflow.com/questions/59082540/react-native-base64-image-upload-to-firebase-storage?rq=1

//https://stackoverflow.com/questions/59550764/react-native-upload-file-from-local-storage-to-firebase-network-request-failed


