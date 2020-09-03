import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'

import { init } from './perfilActions'
import labelAndInput from '../../common/form/labelAndInput'

class PerfilForm extends Component {

    render() {
        const { handleSubmit, readOnly = false, keyRO = true } = this.props
        return (
            <form onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name='PerfilCod' component={labelAndInput} readOnly={readOnly || keyRO}
                        label='Código' cols='12 6' placeholder='Informe o código' type='number' />
                    <Field name='PerfilDes' component={labelAndInput} readOnly={readOnly}
                        label='Descrição' cols='12 6' placeholder='Informe a descrição, ex: Administrador' />
                </div>
                <div className='box-footer'>
                    <button type='submit' className={`btn ${this.props.submitClass}`}>
                        {this.props.submitLabel}
                    </button>
                    <button type='button' className='btn btn-default' onClick={this.props.init}>Cancelar</button>
                </div>
            </form>
        )
    }
}

PerfilForm = reduxForm({ form: 'perfilForm', destroyOnUnmount: false })(PerfilForm)
const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch)
export default connect(null, mapDispatchToProps)(PerfilForm)