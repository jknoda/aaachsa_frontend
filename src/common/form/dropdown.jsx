import React from 'react'
import { DropdownList } from 'react-widgets'
import './form.css'

export default props => (
    <DropdownList {...props.input}
        className='form-control form-dropdown'
        readOnly={props.readOnly}
        data={props.data}
        defaultValue={props.defaultValue}
        valueField={props.valueField}
        textField={props.textField}
    />
)