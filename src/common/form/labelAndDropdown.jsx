import React from 'react'
import Grid from '../layout/grid'
import { DropdownList } from 'react-widgets'

export default props => (
    <Grid cols={props.cols}>
        <div className='form-group'>
            <label htmlFor={props.name}>{props.label}</label>
            <DropdownList {...props.input}
                className='form-control form-dropdown'
                readOnly={props.readOnly}
                data={props.data}
                defaultValue={props.defaultValue}
                valueField={props.valueField}
                textField={props.textField}
            />
        </div>
    </Grid>
)