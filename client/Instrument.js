import React ,{ useState } from 'react'
import {Dropdown, Button, Icon} from 'react-materialize';

export default function Primary(props) {
  return (
    <div className = 'col s2'>
      <div>Instrument:</div>
      <Dropdown trigger={
        <Button waves="light" style={{marginRight: '5px', width: '150px', 'backgroundColor': '#1c4834', color: '#fdcc00'}}>{props.submitData.instrument}</Button>}>
        {props.instrument.map(item => <a key = {item} onClick = {() => props.dataPress('instrument', item)} href="#">{item}</a>)}
        <a onClick = {() => props.dataPress('instrument', 'All')} href="#">All</a>
      </Dropdown>
    </div>
  )
}