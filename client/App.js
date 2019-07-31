import React, { Component } from 'react'

import Primary from './Primary';
import Login from './Login';
import Secondary from './Secondary';
import Instrument from './Instrument';
import Grade from './Grade';
import Gender from './Gender';
import HighSchool from './HighSchool';
import { Button } from 'react-materialize';
import axios from 'axios';

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      primaryGroup: [1,2,3,4],
      secondaryGroup: [1, 2, 3, 4],
      instrument: ['Sax', 'Clarinet', 'Trumpet'],
      grade: [6, 7, 8],
      gender: ['Male', 'Female'],
      highSchool: [],
      submitData: {
        primaryGroup: 'All',
        secondaryGroup: 'All',
        instrument: 'All',
        grade: 'All',
        gender: 'All',
        highSchool: 'All'
      },
      textField: '',
      login: ''
    }
  }
  componentDidMount() {
    axios.get('/categories')
    .then((results) => {
      let {gender, secondaryGroup, primaryGroup, instrument, grade, highSchool} = results.data
      this.setState({gender, secondaryGroup, primaryGroup, instrument, grade, highSchool})
      axios.get('/checkCookie')
      .then((res) => {
        this.setState({login: res.data})
      })
    })
  }

  submitFields() {
    axios.get('/emails', {params: {submitData: this.state.submitData}})
    .then((res) => {
      this.setState({textField: res.data})
    })
  }

  selectAll(e) {
    e.target.focus();
    e.target.select();
  }

  dataPress(type, item) {
    let newSubmitData = this.state.submitData;
    newSubmitData[type] = item;
    this.setState({submitData: newSubmitData});
  }

  loginSubmit(user, pass) {
    axios.get('/login', {params: {user, pass}})
    .then((res) => {
      this.setState({login: res.data})
    })
  }

  render() {
    return (
      <>
      {this.state.login !== 'Logged In' ? (
        <Login login = {this.state.login} loginSubmit = {this.loginSubmit.bind(this)}/>
      ) : (<div>
        <h1 className = 'center'>Walsh Band</h1>
        <h3 className = 'center'>Click itemes to get Data</h3>
        <div className = 'container row'>
          <Primary submitData = {this.state.submitData} primaryGroup = {this.state.primaryGroup} dataPress = {this.dataPress.bind(this)}/>
          <Secondary submitData = {this.state.submitData} secondaryGroup = {this.state.secondaryGroup} dataPress = {this.dataPress.bind(this)}/>
          <Instrument submitData = {this.state.submitData} instrument = {this.state.instrument} dataPress = {this.dataPress.bind(this)}/>
          <Grade submitData = {this.state.submitData} grade = {this.state.grade} dataPress = {this.dataPress.bind(this)}/>
          <Gender submitData = {this.state.submitData} gender = {this.state.gender} dataPress = {this.dataPress.bind(this)}/>
          <HighSchool submitData = {this.state.submitData} highSchool = {this.state.highSchool} dataPress = {this.dataPress.bind(this)}/>
        </div>
        <div>Email Output:<textarea value = {this.state.textField} onClick={(e)=>this.selectAll(e)}></textarea></div>
        <Button onClick = {this.submitFields.bind(this)} waves="light" style={{marginRight: '5px', width: '150px'}}>Submit</Button>
      </div>)}
      </>
    )
  }
}
