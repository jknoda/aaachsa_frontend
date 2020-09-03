import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, arrayInsert, arrayRemove } from 'redux-form'
import DropdownList from '../../common/form/dropdown'
import 'react-widgets/dist/css/react-widgets.css'
import Grid from '../../common/layout/grid'
import { getListPerfil } from './pessoaActions'
import consts from '../../consts'

class PerfilPessoaList extends Component {
    componentWillMount() {
        this.props.getListPerfil()
    }

    add(index, item) {
        if (!this.props.readOnly) {
            const newItem = {EmpIdf:item.EmpIdf, PerfilCod:consts.PerfilCod, PerfilDes:''}
            this.props.arrayInsert('pessoaForm', 'PessoaPerfils', index, newItem)
        }
    }

    remove(index) {
        if (!this.props.readOnly && this.props.list.length > 1) {
            this.props.arrayRemove('pessoaForm', 'PessoaPerfils', index)
        }
    }

    renderRows() {
        const list = this.props.list || [{}]
        const listaPerfil = this.props.listaPerfil || [{}]
        return list.map((item, index) => (
            <tr key={index}>
                <td className='col-sm-7'>
                    <Field name={`PessoaPerfils[${index}]`}
                        component={DropdownList}
                        data={listaPerfil}
                        valueField="PerfilCod"
                        textField="PerfilDes"
                        readOnly={this.props.readOnly} />
                </td>
                <td className='col-sm-5'>
                    <button type='button' className='btn btn-success'
                        onClick={() => this.add(index + 1,item)}>
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
                    <legend>Perfil da pessoa</legend>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Perfil</th>
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

const mapDispatchToProps = dispatch => bindActionCreators({ arrayInsert, arrayRemove, getListPerfil }, dispatch)
const mapStateToProps = state => ({ listaPerfil: state.pessoa.listaPerfil })
export default connect(mapStateToProps, mapDispatchToProps)(PerfilPessoaList)

