import React, { Component } from 'react'
import Navbar from './Navbar';
import Primary from './Primary';
import Login from './Login';
import Secondary from './Secondary';
import Instrument from './Instrument';
import Grade from './Grade';
import Gender from './Gender';
import HighSchool from './HighSchool';
import { Button } from 'react-materialize';
import axios from 'axios';
import NewStudent from './NewStudent.js';
import EditStudent from './EditStudent.js'

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
      login: '',
      page: {
        'Get Data': 'inherit',
        'Edit': 'none',
        'New Student': 'none'
      },
      searchData: []
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

  redirect(page) {
    let newPage = this.state.page
    newPage['Get Data'] = 'none';
    newPage['Edit'] = 'none';
    newPage['New Student'] = 'none';
    newPage[page] = 'inherit'
    this.setState({page: newPage})
  }

  render() {
    return (
      <>
      <div style = {{height: '150px', width: '100%', 'backgroundColor': '#1c4834'}}>
          <img height = '150' style = {{left: '0', top: '0'}}src="http://walshband.com/img/walsh_logo.jpg" alt=""/>
          <span style = {{position: 'relative', left: '20%', top: '-60px', fontSize: '50px', color: '#fdcc00'}}>Walsh Middle School Band</span>
      </div>
      <Navbar redirect = {this.redirect.bind(this)}/>
      {this.state.login !== 'Logged In' ? (
        <Login login = {this.state.login} loginSubmit = {this.loginSubmit.bind(this)}/>
      ) : (<>
        {this.state.page['Get Data'] === 'inherit' ? (
          <div>
            <h3 className = 'center'>Click items to get Data</h3>
            <div className = 'container row'>
              <Primary submitData = {this.state.submitData} primaryGroup = {this.state.primaryGroup} dataPress = {this.dataPress.bind(this)}/>
              <Secondary submitData = {this.state.submitData} secondaryGroup = {this.state.secondaryGroup} dataPress = {this.dataPress.bind(this)}/>
              <Instrument submitData = {this.state.submitData} instrument = {this.state.instrument} dataPress = {this.dataPress.bind(this)}/>
              <Grade submitData = {this.state.submitData} grade = {this.state.grade} dataPress = {this.dataPress.bind(this)}/>
              <Gender submitData = {this.state.submitData} gender = {this.state.gender} dataPress = {this.dataPress.bind(this)}/>
              <HighSchool submitData = {this.state.submitData} highSchool = {this.state.highSchool} dataPress = {this.dataPress.bind(this)}/>
            </div>
            <div style = {{position: 'relative', left: '100px', width: '80%'}}>Email Output:
              <textarea readOnly style = {{height: '150px'}} value = {this.state.textField} onClick={(e)=>this.selectAll(e)}>
              </textarea>
            </div>
            <Button onClick = {this.submitFields.bind(this)} style={{position: 'relative', left:'40%', marginRight: '5px', width: '150px', 'backgroundColor': '#1c4834', color: '#fdcc00'}}>Submit</Button>
            </div>) 
            : (<></>)}
          <NewStudent display = {this.state.page['New Student']}/>
          <EditStudent display = {this.state.page['Edit']}/>
            </>)}
      </>
    )
  }
}
