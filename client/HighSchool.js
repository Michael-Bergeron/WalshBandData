import React ,{ useState } from 'react'
import {Dropdown, Button, Icon} from 'react-materialize';

export default function Primary(props) {
  return (
    <div className = 'col s2'>
      <div>High School:</div>
      <Dropdown trigger={
        <Button waves="light" style={{marginRight: '5px', width: '150px'}}>{props.submitData.highSchool}</Button>}>
        {props.highSchool.map(item => <a key = {item} onClick = {() => props.dataPress('highSchool', item)} href="#">{item}</a>)}
        <a onClick = {() => props.dataPress('highSchool', 'All')} href="#">All</a>
      </Dropdown>
    </div>
  )
}