import React ,{ useState } from 'react'
import {Dropdown, Button, Icon} from 'react-materialize';

export default function Primary(props) {
  return (
    <div className = 'col s2'>
      <div>Primary Band:</div>
      <Dropdown trigger={
        <Button waves="light" style={{marginRight: '5px', width: '150px', 'backgroundColor': '#1c4834', color: '#fdcc00'}}>{props.submitData.primaryGroup}</Button>}>
        {props.primaryGroup.map(item => <a key = {item} onClick = {() => props.dataPress('primaryGroup', item)} href="#">{item}</a>)}
        <a onClick = {() => props.dataPress('primaryGroup', 'All')} href="#">All</a>
      </Dropdown>
    </div>
  )
}
