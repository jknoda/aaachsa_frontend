import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'

import { init } from './pessoaActions'
import LabelAndInput from '../../common/form/labelAndInput'

import TipoPessoaList from './tipoPessoaList'
import PerfilPessoaList from './perfilPessoaList'
import ModalidadePessoaList from './modalidadePessoaList'
import consts from '../../consts'
const user = JSON.parse(localStorage.getItem(consts.userkey))

class PessoaForm extends Component {

    render() {
        const { handleSubmit, readOnly = false, keyRO = true, PessoaTipos=[{}], PessoaPerfils=[{}], PessoaModalidades=[{}] } = this.props
        if (PessoaTipos[0].TPessoaCod === undefined) {
            PessoaTipos[0].EmpIdf = user.EmpIdf
            PessoaTipos[0].TPessoaCod = consts.TPessoaCod
            PessoaTipos[0].TPessoaDes = 'des'
        }
        if (PessoaPerfils[0].PerfilCod === undefined) {
            PessoaPerfils[0].EmpIdf = user.EmpIdf
            PessoaPerfils[0].PerfilCod = consts.PerfilCod
            PessoaPerfils[0].PerfilDes = 'des'
        }
        if (PessoaModalidades[0].ModCod === undefined) {
            PessoaModalidades[0].EmpIdf = user.EmpIdf
            PessoaModalidades[0].ModCod = consts.ModCod
            PessoaModalidades[0].PesModInicio = '2020-01-01'
            PessoaModalidades[0].ModDes = 'des'
        }

        return (
            <form role='form' onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name='PesCod' component={LabelAndInput} readOnly={readOnly || keyRO}
                        label='CPF' cols='12 6' placeholder='Informe o CPF' type='number' />
                    <Field name='PesNome' component={LabelAndInput} readOnly={readOnly}
                        label='Nome' cols='12 6' placeholder='Informe o nome' />
                    <Field name='PesNomeResumido' component={LabelAndInput} readOnly={readOnly}
                        label='Apelido' cols='12 6' placeholder='Informe o apelido' />
                    <Field name='PesEmail' component={LabelAndInput} readOnly={readOnly}
                        label='Email' cols='12 6' placeholder='Informe o email' />
                    <TipoPessoaList cols='12 3' list={PessoaTipos} readOnly={readOnly} />
                    <PerfilPessoaList cols='12 3' list={PessoaPerfils} readOnly={readOnly} /> 
                    <ModalidadePessoaList cols='12 6' list={PessoaModalidades} readOnly={readOnly} /> 
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


PessoaForm = reduxForm({ form: 'pessoaForm', destroyOnUnmount: false })(PessoaForm)
const selector = formValueSelector('pessoaForm')
const mapStateProps = state => ({ 
    PessoaTipos: selector(state, 'PessoaTipos'), 
    PessoaPerfils: selector(state, 'PessoaPerfils'),
    PessoaModalidades: selector(state, 'PessoaModalidades')
})
const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch)
export default connect(mapStateProps, mapDispatchToProps)(PessoaForm)
