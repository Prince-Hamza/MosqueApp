import React, { Component } from 'react'
import st from './../assets/styles'

import {
  Input,
  Item,
} from 'native-base'

class ArchInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      backgroundColor: 'transparent'
    }
  }

  componentDidMount() {
    this.getPlaceholder(this.props.name)
  }

  getPlaceholder = (name) => {
    switch (name) {
      case 'email':
        this.setState({
          placeholder: 'Email Address'.toUpperCase()
        })
        break;
      case 'password':
        this.setState({
          placeholder: 'Password'.toUpperCase()
        })
        break;
      case 'newPassword':
        this.setState({
          placeholder: 'New Password'.toUpperCase()
        })
        break;
      case 'mobile':
        this.setState({
          placeholder: 'Mobile'.toUpperCase()
        })
        break;
      case 'location':
        this.setState({
          placeholder: 'Location'.toUpperCase()
        })
        break;
      case 'address':
        this.setState({
          placeholder: 'Address'.toUpperCase()
        })
        break;
      default:
        this.setState({
          placeholder: 'Username'.toUpperCase()
        })
    }
  }

  onFocus = () => {
    this.setState({
      backgroundColor: '#fff'
    })
  }

  onBlur = () => {
    this.setState({
      backgroundColor: 'transparent'
    })
  }

  render() {
    const getContentType = (name) => {
      switch (name) {
        case 'email':
          return 'emailAddress'
          break;
        case 'password':
          return 'password'
          break;
        case 'newPassword':
          return 'password'
          break;
        case 'mobile':
          return 'telephoneNumber'
          break;
        case 'location':
          return 'addressCity'
          break;
        case 'address':
          return 'fullStreetAddress'
          break;
        default:
          return 'none'
          break;
      }
    }

    return (
      <Item rounded style={st.loginInput}>
        <Input placeholder={this.state.placeholder}
          placeholderTextColor='white'
          onChangeText={(text)=>this.props.onchangetext(text)}
          secureTextEntry={(this.props.name == 'password' || this.props.name == 'newPassword') ? true : false}
          textContentType={getContentType(this.props.name)}
          autoCapitalize={(this.props.name == 'password' || this.props.name == 'newPassword' || this.props.name == 'username' || this.props.name == 'email') ? 'none' : 'sentences'}
          style={{ color: 'white', textAlign: 'center', backgroundColor: this.state.backgroundColor }}
          onFocus={() => this.onFocus()}
          onFocus={() => this.onBlur()}
        />
      </Item>
    )
  }
}

export default ArchInput