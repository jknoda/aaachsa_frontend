import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, arrayInsert, arrayRemove } from 'redux-form'
import DropdownList from '../../common/form/dropdown'
import Input from '../../common/form/input'
import 'react-widgets/dist/css/react-widgets.css'
import Grid from '../../common/layout/grid'
import { getListModalidade } from './pessoaActions'
import consts from '../../consts'

class ModalidadePessoaList extends Component {
    componentWillMount() {
        this.props.getListModalidade()
    }

    add(index, item) {
        if (!this.props.readOnly) {
            const newItem = { EmpIdf: item.EmpIdf, ModCod: consts.ModCod, ModDes: '' }
            this.props.arrayInsert('pessoaForm', 'PessoaModalidades', index, newItem)
        }
    }

    remove(index) {
        if (!this.props.readOnly && this.props.list.length > 1) {
            this.props.arrayRemove('pessoaForm', 'PessoaModalidades', index)
        }
    }

    renderRows() {
        const list = this.props.list || [{}]
        const listaModalidade = this.props.listaModalidade || [{}]
        return list.map((item, index) => (
            <tr key={index}>
                <td className='col-sm-4'>
                    <Field name={`PessoaModalidades[${index}]`}
                        component={DropdownList}
                        data={listaModalidade}
                        valueField="ModCod"
                        textField="ModDes"
                        readOnly={this.props.readOnly} />
                </td>
                <td className='col-sm-4'>
                    <Field name={`PessoaModalidades[${index}].PesModInicio`}
                        component={Input}
                        type={'date'}
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
                    <legend>Modalidade da pessoa</legend>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Modalidade</th>
                                <th>Início</th>
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

const mapDispatchToProps = dispatch => bindActionCreators({ arrayInsert, arrayRemove, getListModalidade }, dispatch)
const mapStateToProps = state => ({ listaModalidade: state.pessoa.listaModalidade })
export default connect(mapStateToProps, mapDispatchToProps)(ModalidadePessoaList)

