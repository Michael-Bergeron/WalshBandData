import React ,{ useState } from 'react'
import {Dropdown, Button, Icon} from 'react-materialize';

export default function Primary(props) {
  return (
    <div className = 'col s2'>
      <div>Secondary Band:</div>
      <Dropdown trigger={
        <Button waves="light" style={{marginRight: '5px', width: '150px'}}>{props.submitData.secondaryGroup}</Button>}>
        {props.secondaryGroup.map(item => <a key = {item} onClick = {() => props.dataPress('secondaryGroup', item)} href="#">{item}</a>)}
        <a onClick = {() => props.dataPress('secondaryGroup', 'All')} href="#">All</a>
      </Dropdown>
    </div>
  )
}
