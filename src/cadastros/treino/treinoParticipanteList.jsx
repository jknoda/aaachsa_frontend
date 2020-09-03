import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, arrayInsert, arrayRemove } from 'redux-form'
import DropdownList from '../../common/form/dropdown'
import Input from '../../common/form/input'
import 'react-widgets/dist/css/react-widgets.css'
import Grid from '../../common/layout/grid'
import { getListPessoas } from './treinoActions'
import consts from '../../consts'

class TreinoParticipanteList extends Component {
    componentWillMount() {
        this.props.getListPessoas()
    }

    add(index, item) {
        if (!this.props.readOnly) {
            const newItem = { EmpIdf: item.EmpIdf, ModCod: consts.ModCod, ModDes: '' }
            this.props.arrayInsert('treinoForm', 'TreinoParticipantes', index, newItem)
        }
    }

    remove(index) {
        if (!this.props.readOnly && this.props.list.length > 1) {
            this.props.arrayRemove('treinoForm', 'TreinoParticipantes', index)
        }
    }

    renderRows() {
        const list = this.props.list || [{}]
        const listaPessoa = this.props.listaPessoa || [{}]
        return list.map((item, index) => (
            <tr key={index}>
                <td className='col-sm-4'>
                    <Field name={`TreinoParticipantes[${index}]`}
                        component={DropdownList}
                        data={listaPessoa}
                        valueField="PesCod"
                        textField="PesNome"
                        readOnly={this.props.readOnly} />
                </td>
                <td className='col-sm-4'>
                    <Field name={`TreinoParticipantes[${index}].TrnParObs`}
                        component={Input}
                        type={'text'}
                        readOnly={this.props.readOnly} />
                </td>
                <td className='col-sm-4'>
                    <button type='button' className='btn btn-success'
                        onClick={() => this.add(index + 1, item)}>
                        <i className="fa fa-plus"></i>
                    </button>
                    <button type='button' className='btn btn-danger'
                        onClick={() => this.remove(index)}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                </td>
            </tr>
        ))
    }

    render() {
        return (
            <Grid cols={this.props.cols}>
                <fieldset>
                    <legend>Participantes do treino</legend>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Participante</th>
                                <th>Observação</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderRows()}
                        </tbody>
                    </table>
                </fieldset>
            </Grid>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ arrayInsert, arrayRemove, getListPessoas }, dispatch)
const mapStateToProps = state => ({ listaPessoa: state.treino.listaPessoa })
export default connect(mapStateToProps, mapDispatchToProps)(TreinoParticipanteList)

