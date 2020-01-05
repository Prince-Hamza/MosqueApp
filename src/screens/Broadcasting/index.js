import React, { Component } from 'react'
import { View, Text, Alert, PermissionsAndroid, Image , WebView ,  Button } from 'react-native'
import colors from './../../assets/colors'
import st from './../../assets/styles'
import AudioRecord from 'react-native-audio-record'
import firebase from 'firebase'
import Sound from 'react-native-sound'
import RNFS from 'react-native-fs'


import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Right,
  Body,
  Tabs,
  Tab,
  TabHeading,

  
} from 'native-base'

import ArchHeader from './../../components/ArchHeader'

import LiveBroadcast from './tabs/LiveBroadcast'
import ListBroadcast from './tabs/ListBroadcast'
import Try from './tabs/try.js'




class Broadcasting extends Component {


componentDidMount () {



firebase.database()
.ref("MyAudio").once("value").then((snap) => {
snap.forEach((subsnap)=>{
var data = subsnap.val()

if (data.Name === "what"){

myBase64 = data.Base64

} // if end

}) // each end

//this.GotIt(myBase64)


})  // then end






}

GotIt = (base64) => {

myBase64 = base64 + ""
myBase64 = myBase64.replace(/\s/g, '');

const path = RNFS.DocumentDirectoryPath + '/lasttest.wav'

RNFS.writeFile(path, myBase64, 'base64').then(() => playSound())

const playSound = () => {

const sound = new Sound(path, '', () => Play(sound))

const Play = (sound) => sound.play()


}}

  constructor(props) {
    super(props)
    this.state = {
      Permy:true,
      Recormy:false,     
      RealBlob:[],
      blobURL:'',
      Bname:""
    }
  }


toggle = (BN) => {
alert(BN)
this.setState({Permy:false,Recormy:true , Bname:BN})
this.start()
}


start = () => {
const options = {
  sampleRate: 16000,  // default 44100
  channels: 1,        // 1 or 2, default 1
  bitsPerSample: 16,  // 8 or 16, default 16
  audioSource: 6,     // android only (see below)
  wavFile: 'test.wav' // default 'audio.wav'
};

AudioRecord.init(options);
AudioRecord.start();
}


async stop  ()  {
audioFile = await AudioRecord.stop();
};

async AudioPerm  ()  {
try { const Granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {title:'Microphone Permission',
         message: 'Allow to use your audio Phone',},);

if (Granted === PermissionsAndroid.RESULTS.GRANTED){console.log("Permission Granted");}else{console.log("Denied")} 
} catch (error) {console.warn(error)}
}



UploadDirect2 = (path , nm) => {
// readFile(filepath: string, encoding?: string)
alert(nm)
RNFS.readFile(path, 'base64').then((res) =>  playSound(res))
const playSound = (res) => {
var B64 = res
const sound = new Sound(path, '', () => Play(sound , B64))

const Play = (sound , B64) => {

sound.play()
firebase.database().ref("MyAudio").push({Name:nm , Base64:B64})

}



}

} //d2

UploadDirect = (blob) => {
alert(blob)
 
// get arrayBuffer from blob
let fileReader = new FileReader();

fileReader.readAsArrayBuffer(blob);

fileReader.onload = function(event) {

  let arrayBuffer = fileReader.result;
alert(arrayBuffer)


var binary = '';
    var bytes = new Uint8Array( arrayBuffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }

 var Base64 = window.btoa(binary)
 alert(Base64)




   var Stream = Base64.replace("data:audio/mp3;base64,","")
     console.log(Stream);




firebase.database().ref("MyAudio").push({
Name:Input,
Base64:Stream
}) // push



alert("successfully uploaded")




}; // onload




} // direct

  render() {
    return (
      <Container>
        <ArchHeader title="Broadcasting" isLoading={this.state.isLoading} hasTabs={true} />

        <Tabs tabBarUnderlineStyle={st.tabs}>



<Tab tabStyle={st.tab}   activeTabStyle={st.tabActive}  textStyle={st.tabText} 
heading = { <TabHeading style={st.tab}>
                <Text style={{ color: colors.primaryColor }}>Start</Text>
              </TabHeading>   } >

{this.state.Permy && <Try WhenStop = {this.WaitStop} Toggle = {this.toggle} />}

{ this.state.Recormy &&
 <View style = {{flex:1 }}>
<Image source = {require("./CuteMike.jpg")} style = {{flex:6.6,width:370,height:400}} />
<Text style = {{flex:1,color:"green",justifyContent: 'center', marginTop: 20,marginLeft:145}}>Recording</Text>


<Button title = "Stop" style = {{flex:0.6 , backgroundColor:"green" , marginTop:3,marginBottom:0.1 }} onPress = {()=>{
this.stop();
}} > 

</Button>

<Button title = "Upload" style = {{flex:0.5 , backgroundColor:"green" , marginTop:5,marginBottom:3}} onPress = {()=>{

alert("Click");
var path = RNFS.DocumentDirectoryPath + '/test.wav';
this.UploadDirect2(path , this.state.Bname)


}} />


</View>  }



          </Tab>

          <Tab tabStyle={st.tab}
            activeTabStyle={st.tabActive}
            textStyle={st.tabText}
            heading={
              <TabHeading style={st.tab}>
                <Text style={{ color: colors.primaryColor }}>List</Text>
              </TabHeading>
            }
          >
            <ListBroadcast navigation={this.props.navigation} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default Broadcasting

var audioFile;
var Fin , SS;
var myBase64
//var path = RNFS.DocumentDirectoryPath + '/test3.wav';
