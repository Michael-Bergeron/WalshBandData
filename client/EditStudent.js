import React, { Component } from 'react'
import { Button } from 'react-materialize';
import axios from 'axios'

export default class EditStudent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      student: '',
      currentStudent: {
        'First Name': '',
        'Last Name': '',
        instrument: '',
        StudentID: 0,
        grade: 6,
        Order: 0,
        primaryGroup: '',
        secondaryGroup: '',
        Locker: 0,
        gender: '',
        'Email 1': '',
        'Email 2': '',
        'Email 3': '',
        'Email 4': '',
        Phone1Name: '',
        Phone1Person: '',
        Phone1: '',
        Phone2Name: '',
        Phone2Person:'',
        Phone2: '',
        Gattiland: '',
        MainEvent: '',
        TShirt: '',
        HighSchool: '',
        PermissionSlip: '',
        DressSize: '',
        AdjustmentsNeeded: '',
        District: '',
        Region: '',
        MadeRegion: '',
        Orchestra: ''
      },
      searchData: [],
      searchList: [],
      showSuggest: false
    }
  }
  componentDidMount() {
    axios.get('/getAll')
      .then((data) => {
      let searchData = []
      for (let i = 0; i < data.data.length; i++){
        if (!data.data[i].StudentID){
          data.data[i].StudentID = '';
        }
        searchData.push(`${data.data[i]['First Name']} ${data.data[i]['Last Name']} ${data.data[i].StudentID}`)
      }
      this.setState({searchData})
    })
  }

  editSubmit(name) {
    let names = name.split(' ');
    let firstName = names[0];
    let lastName = names[1];
    axios.get('/getStudent', {params: {firstName, lastName}})
    .then((res) => {
      let student = this.state.currentStudent;
      for (let key in student){
        student[key] = res.data[key];
      }
      this.setState({currentStudent: student})
    })
  }

  handleSearchChange(e) {
    if (e.target.value === '') {
      this.setState({showSuggest: false})
    }
    let searchList = [];
    for (let i = 0; i < this.state.searchData.length; i++){
      if (this.state.searchData[i].toLowerCase().includes(e.target.value.toLowerCase())){
        searchList.push(this.state.searchData[i]);
      }
    }
    this.setState({searchList, student: e.target.value, showSuggest: true})
  }

  editStudent() {
    console.log(this.state.currentStudent)
    axios.post('/editStudent', {student: this.state.currentStudent})
    .then((res) => {
      console.log('success');
      let student = '';
      let searchData = [];
      let searchList = [];
      let showSuggest = false;
      let currentStudent = {'First Name': '','Last Name': '',instrument: '',StudentID: 0,grade: 6,Order: 0,primaryGroup: '',secondaryGroup: '',Locker: 0,gender: '','Email 1': '','Email 2': '','Email 3': '','Email 4': '',Phone1Name: '',Phone1Person: '',Phone1: '',Phone2Name: '',Phone2Person:'',Phone2: '',Gattiland: '',MainEvent: '',TShirt: '',HighSchool: '',PermissionSlip: '',DressSize: '',AdjustmentsNeeded: '',District: '',Region: '',MadeRegion: '',Orchestra: ''}
      this.setState({student, searchData, searchList, showSuggest, currentStudent})
    })
  }

  handleChange(key, value) {
    let student = this.state.currentStudent;
    student[key] = value;
    this.setState({currentStudent: student});
  }

  render() {
    const listStyle = {
      position: 'absolute',
      left: '0px',
      top: '35px',
      width: '100%',
      'backgroundColor': 'white',
      'opacity': 1,
      'maxHeight': '400px',
      'overflowY': 'scroll',
      'zIndex': 99
    }
  return (<div style = {{display: this.props.display}}>
    {this.state.currentStudent['First Name'] === '' ? (
      <div style = {{width: '600px', paddingLeft: '40px'}}>
        <p>Enter Student to edit</p>
        <input style = {{width: '400px'}} onChange = {(e) => this.handleSearchChange(e)} placeholder = 'StudentID' type="text"/>
        <Button onClick = {() => this.editSubmit(this.state.studentID)} waves="light" style={{marginRight: '5px', width: '150px', 'backgroundColor': '#1c4834', color: '#fdcc00'}}>Submit</Button>
        {this.state.showSuggest === true ? (
          <div style ={{position: 'aboslute', maxHeight: '400px', border: '1px solid black'}}>
            {this.state.searchList.map((name) => 
              <div onClick = {() => {this.editSubmit(name)}} className = 'suggestItem' key = {name}>{name}</div>
            )}
          </div>
        ) : (<></>)}
      </div>) : (
        <div>
          <div className = 'row'>
            <div className = 'col 2' style = {{paddingLeft: '30px'}}>
              <p>First Name:</p>
              <input onChange = {(e) => (this.handleChange('First Name', e.target.value))} value = {this.state.currentStudent['First Name']} ptype="text"/>
            </div>
            <div className = 'col 2' style = {{paddingLeft: '30px'}}>
              <p>Last Name:</p>
              <input onChange = {(e) => (this.handleChange('Last Name', e.target.value))} value = {this.state.currentStudent['Last Name']} ptype="text"/>
            </div>
            <div className = 'col 2' style = {{paddingLeft: '30px'}}>
              <p>Instrument:</p>
              <input onChange = {(e) => (this.handleChange('instrument', e.target.value))} value = {this.state.currentStudent['instrument']} ptype="text"/>
            </div>
            <div className = 'col 2' style = {{paddingLeft: '30px'}}>
              <p>Student ID:</p>
              <input onChange = {(e) => (this.handleChange('StudentID', e.target.value))} value = {this.state.currentStudent['StudentID']} ptype="text"/>
            </div>
            <div className = 'col 2' style = {{paddingLeft: '30px'}}>
              <p>Grade:</p>
              <input onChange = {(e) => (this.handleChange('grade', e.target.value))} value = {this.state.currentStudent['grade']} ptype="text"/>
            </div>
            <div className = 'col 2' style = {{paddingLeft: '30px'}}>
              <p>Order:</p>
              <input onChange = {(e) => (this.handleChange('Order', e.target.value))} value = {this.state.currentStudent['Order']} ptype="text"/>
            </div>
          </div>
          <div className = 'row'>
            <div className = 'col 2' style = {{paddingLeft: '30px'}}>
              <p>Primary Group:</p>
              <input onChange = {(e) => (this.handleChange('primaryGroup', e.target.value))} value = {this.state.currentStudent['primaryGroup']} ptype="text"/>
            </div>
            <div className = 'col 2' style = {{paddingLeft: '30px'}}>
              <p>Secondary Group:</p>
              <input onChange = {(e) => (this.handleChange('secondaryGroup', e.target.value))} value = {this.state.currentStudent['secondaryGroup']} ptype="text"/>
            </div>
            <div className = 'col 2' style = {{paddingLeft: '30px'}}>
              <p>Locker:</p>
              <input onChange = {(e) => (this.handleChange('Locker', e.target.value))} value = {this.state.currentStudent['Locker']} ptype="text"/>
            </div>
            <div className = 'col 2' style = {{paddingLeft: '30px'}}>
              <p>Gender:</p>
              <input onChange = {(e) => (this.handleChange('gender', e.target.value))} value = {this.state.currentStudent['gender']} ptype="text"/>
            </div>
            <div className = 'col 2' style = {{paddingLeft: '30px'}}>
              <p>Email 1:</p>
              <input onChange = {(e) => (this.handleChange('Email 1', e.target.value))} value = {this.state.currentStudent['Email 1']} ptype="text"/>
            </div>
            <div className = 'col 2' style = {{paddingLeft: '30px'}}>
              <p>Email 2:</p>
              <input onChange = {(e) => (this.handleChange('Email 2', e.target.value))} value = {this.state.currentStudent['Email 2']} ptype="text"/>
            </div>
          </div>
          <div className = 'row'>
            <div className = 'col 2' style = {{paddingLeft: '30px'}}>
              <p>Email 3:</p>
              <input onChange = {(e) => (this.handleChange('Email 3', e.target.value))} value = {this.state.currentStudent['Email 3']} ptype="text"/>
            </div>
            <div className = 'col 2' style = {{paddingLeft: '30px'}}>
              <p>Email 4:</p>
              <input onChange = {(e) => (this.handleChange('Email 4', e.target.value))} value = {this.state.currentStudent['Email 4']} ptype="text"/>
            </div>
            <div className = 'col 2' style = {{paddingLeft: '30px'}}>
              <p>Phone 1 Name:</p>
              <input onChange = {(e) => (this.handleChange('Phone1Name', e.target.value))} value = {this.state.currentStudent['Phone1Name']} ptype="text"/>
            </div>
            <div className = 'col 2' style = {{paddingLeft: '30px'}}>
              <p>Phone 1 Person:</p>
              <input onChange = {(e) => (this.handleChange('Phone1Person', e.target.value))} value = {this.state.currentStudent['Phone1Person']} ptype="text"/>
            </div>
            <div className = 'col 2' style = {{paddingLeft: '30px'}}>
              <p>Phone 1:</p>
              <input onChange = {(e) => (this.handleChange('Phone1', e.target.value))} value = {this.state.currentStudent['Phone1']} ptype="text"/>
            </div>
            <div className = 'col 2' style = {{paddingLeft: '30px'}}>
              <p>Phone 2 Name:</p>
              <input onChange = {(e) => (this.handleChange('Phone2Name', e.target.value))} value = {this.state.currentStudent['Phone2Name']} ptype="text"/>
            </div>
          </div>
          <div className = 'row'>
            <div className = 'col 2' style = {{paddingLeft: '30px'}}>
              <p>Phone 2 Person:</p>
              <input onChange = {(e) => (this.handleChange('Phone2Person', e.target.value))} value = {this.state.currentStudent['Phone2Person']} ptype="text"/>
            </div>
            <div className = 'col 2' style = {{paddingLeft: '30px'}}>
              <p>Phone 2:</p>
              <input onChange = {(e) => (this.handleChange('Phone2', e.target.value))} value = {this.state.currentStudent['Phone2']} ptype="text"/>
            </div>
            <div className = 'col 2' style = {{paddingLeft: '30px'}}>
              <p>Gattiland:</p>
              <input onChange = {(e) => (this.handleChange('Gattiland', e.target.value))} value = {this.state.currentStudent['Gattiland']} ptype="text"/>
            </div>
            <div className = 'col 2' style = {{paddingLeft: '30px'}}>
              <p>Main Event:</p>
              <input onChange = {(e) => (this.handleChange('MainEvent', e.target.value))} value = {this.state.currentStudent['MainEvent']} ptype="text"/>
            </div>
            <div className = 'col 2' style = {{paddingLeft: '30px'}}>
              <p>T-Shirt:</p>
              <input onChange = {(e) => (this.handleChange('TShirt', e.target.value))} value = {this.state.currentStudent['TShirt']} ptype="text"/>
            </div>
            <div className = 'col 2' style = {{paddingLeft: '30px'}}>
              <p>High School:</p>
              <input onChange = {(e) => (this.handleChange('HighSchool', e.target.value))} value = {this.state.currentStudent['HighSchool']} ptype="text"/>
            </div>
          </div>
          <div className = 'row'>
            <div className = 'col 2' style = {{paddingLeft: '30px'}}>
              <p>Permission Slip:</p>
              <input onChange = {(e) => (this.handleChange('PermissionSlip', e.target.value))} value = {this.state.currentStudent['PermissionSlip']} ptype="text"/>
            </div>
            <div className = 'col 2' style = {{paddingLeft: '30px'}}>
              <p>Dress Size:</p>
              <input onChange = {(e) => (this.handleChange('DressSize', e.target.value))} value = {this.state.currentStudent['DressSize']} ptype="text"/>
            </div>
            <div className = 'col 2' style = {{paddingLeft: '30px'}}>
              <p>Adjustments Needed:</p>
              <input onChange = {(e) => (this.handleChange('AdjustmentsNeeded', e.target.value))} value = {this.state.currentStudent['AdjustmentsNeeded']} ptype="text"/>
            </div>
            <div className = 'col 2' style = {{paddingLeft: '30px'}}>
              <p>District:</p>
              <input onChange = {(e) => (this.handleChange('District', e.target.value))} value = {this.state.currentStudent['District']} ptype="text"/>
            </div>
            <div className = 'col 2' style = {{paddingLeft: '30px'}}>
              <p>Region:</p>
              <input onChange = {(e) => (this.handleChange('Region', e.target.value))} value = {this.state.currentStudent['Region']} ptype="text"/>
            </div>
            <div className = 'col 2' style = {{paddingLeft: '30px'}}>
              <p>Made Region:</p>
              <input onChange = {(e) => (this.handleChange('MadeRegion', e.target.value))} value = {this.state.currentStudent['MadeRegion']} ptype="text"/>
            </div>
          </div>
          <div className = 'row'>
            <div className = 'col 2' style = {{paddingLeft: '30px'}}>
              <p>Orchestra:</p>
              <input onChange = {(e) => (this.handleChange('Orchestra', e.target.value))} value = {this.state.currentStudent['Orchestra']} ptype="text"/>
            </div>
          <Button onClick = {() => this.editStudent()} waves="light" style={{marginRight: '5px', width: '150px', 'backgroundColor': '#1c4834', color: '#fdcc00'}}>Submit Edit</Button>
          </div>
        </div>
      )}
      </div> 
  )}
}