import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'

import { init, getListModalidade, getListPessoas } from './treinoActions'
import LabelAndInput from '../../common/form/labelAndInput'
import LabelAndDropdown from '../../common/form/labelAndDropdown'

import TreinoParticipanteList from './treinoParticipanteList'
import consts from '../../consts'
const user = JSON.parse(localStorage.getItem(consts.userkey))

class TreinoForm extends Component {
    componentWillMount() {
        this.props.getListModalidade()
        this.props.getListPessoas()
    }

    render() {
        const { handleSubmit, readOnly = false, keyRO = true, TreinoParticipantes=[{}] } = this.props
        if (TreinoParticipantes[0].PesCod === undefined) {
            TreinoParticipantes[0].EmpIdf = user.EmpIdf
            TreinoParticipantes[0].PesCod = consts.PesCod
            TreinoParticipantes[0].PesNome = 'nome'
        }
        const listaModalidade = this.props.listaModalidade || [{}]
        const listaPessoa = this.props.listaPessoa || [{}]
        return (
            <form role='form' onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name='TrnCod' component={LabelAndInput} readOnly={readOnly || keyRO}
                        label='Código' cols='12 4' placeholder='Código do treino' type='number' />
                    <Field name='TrnDes' component={LabelAndInput} readOnly={readOnly}
                        label='Descrição' cols='12 4' placeholder='Responsável' />
                    <Field name='TrnResp' component={LabelAndDropdown} readOnly={readOnly}
                        label='Responsável' cols='12 4' 
                        data={listaPessoa}
                        valueField="PesCod"
                        textField="PesNome"
                         />

                    <Field name='ModCod' component={LabelAndDropdown} readOnly={readOnly}
                        label='Modalidade' cols='12 4' 
                        data={listaModalidade}
                        valueField="ModCod"
                        textField="ModDes"
                         />
                    <Field name='TrnDataInicial' component={LabelAndInput} readOnly={readOnly}
                        label='Data início' cols='12 2' placeholder='Inicio do treino' type='date' />
                    <Field name='TrnHoraInicial' component={LabelAndInput} readOnly={readOnly}
                        label='Hora início' cols='12 2' placeholder='Inicio do treino' type='time' />
                    <Field name='TrnDataFinal' component={LabelAndInput} readOnly={readOnly}
                        label='Data final' cols='12 2' placeholder='Final do treino' type='date'/>
                    <Field name='TrnHoraFinal' component={LabelAndInput} readOnly={readOnly}
                        label='Hora final' cols='12 2' placeholder='Final do treino' type='time'/>

                    <Field name='TrnRel' component={LabelAndInput} readOnly={readOnly}
                        label='Texto' cols='12 12' placeholder='Detalhes do treino' type='text'/>
                    <TreinoParticipanteList cols='12 12' list={TreinoParticipantes} readOnly={readOnly} />                        
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
TreinoForm = reduxForm({ form: 'treinoForm', destroyOnUnmount: false })(TreinoForm)
const selector = formValueSelector('treinoForm')
const mapStateProps = state => ({ 
    TreinoParticipantes: selector(state, 'TreinoParticipantes'),
    listaModalidade: state.treino.listaModalidade,
    listaPessoa: state.treino.listaPessoa
})
const mapDispatchToProps = dispatch => bindActionCreators({ init, getListModalidade, getListPessoas }, dispatch)
export default connect(mapStateProps, mapDispatchToProps)(TreinoForm)
