import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'

import { init } from './albumActions'
import labelAndInput from '../../common/form/labelAndInput'
import GaleriaList from './galeriaList'

class AlbumForm extends Component {

    render() {
        const { handleSubmit, readOnly = false, keyRO = true, Galeria } = this.props
        return (
            <form onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name='AlbumCod' component={labelAndInput} readOnly={readOnly || keyRO}
                        label='Código' cols='12 6' placeholder='Informe o código' type='number' />
                    <Field name='AlbumDes' component={labelAndInput} readOnly={readOnly}
                        label='Descrição' cols='12 6' placeholder='Informe a descrição' />
                    <GaleriaList cols='12 6' list={Galeria} readOnly={readOnly} />
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

AlbumForm = reduxForm({ form: 'albumForm', destroyOnUnmount: false })(AlbumForm)
const selector = formValueSelector('albumForm')
const mapStateToProps = state => ({
    Galeria: selector(state, 'Galeria')
})
const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(AlbumForm)