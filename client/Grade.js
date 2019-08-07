import React ,{ useState } from 'react'
import {Dropdown, Button} from 'react-materialize';

export default function Primary(props) {
  return (
    <div className = 'col s2'>
      <div>Grade:</div>
      <Dropdown trigger={
        <Button waves="light" style={{marginRight: '5px', width: '150px', 'backgroundColor': '#1c4834', color: '#fdcc00'}}>{props.submitData.grade}</Button>}>
        {props.grade.map(item => <a key = {item} onClick = {() => props.dataPress('grade', item)} href="#">{item}</a>)}
        <a onClick = {() => props.dataPress('grade', 'All')} href="#">All</a>
      </Dropdown>
    </div>
  )
}