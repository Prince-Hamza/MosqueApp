import React, { Component } from 'react'
import { Text, Alert ,View , FlatList} from 'react-native'
import st from './../../../assets/styles'
import colors from './../../../assets/colors'
import firebase from 'firebase'
import {  Content,  List,  ListItem,  Left,  Thumbnail,  Right,  Body,  Button,  Icon,ListView} from 'native-base'
import RNFS from 'react-native-fs'
import Sound from 'react-native-sound'

export default class FlatListBasics extends React.Component {

componentDidMount () {

//this.Voice()
firebase.database().ref("MyAudio").once('value')
.then((snap) => {
snap.forEach((subsnap) => {

var data = subsnap.val() 
this.state.Nemium.push(data)

}) // each
this.setState({Nemium:this.state.Nemium})
alert(this.state.Nemium)


})


}

constructor(){
super()
this.state = ({
Nemium : []
})



}




Voice = (Query) => {

firebase.database()
.ref("MyAudio").once("value").then((snap) => {
snap.forEach((subsnap)=>{
var data = subsnap.val()

if (data.Name === Query){

myBase64 = data.Base64

} // if end

}) // each end

this.Convert(myBase64)


})  // then end



} // voice end


Convert = (base64) => {

myBase64 = base64 + ""
myBase64 = myBase64.replace(/\s/g, '');

const path = RNFS.DocumentDirectoryPath + '/lasttest.wav'

RNFS.writeFile(path, myBase64, 'base64').then(() => playSound())

const playSound = () => {

const sound = new Sound(path, '', () => Play(sound))

const Play = (sound) => sound.play()


}}



  render() {
    return (
      <View>
        <FlatList
          data={this.state.Nemium}
          renderItem={({item}) => 

                  <View style = {{flex:1 , backgroundColor:'black' , height:60 , borderStyle:'solid' , borderColor:'white'}}>

                  <Text style = {{flex:1 , color:'white' , fontSize:18, marginLeft:150}} 
                  onPress={() => {
                                      
alert(item.Name)
 this.Voice(item.Name)   


                 }}>{item.Name}</Text>
                 </View>


}
/>
      </View>
    );
  }

}

var myBase64
