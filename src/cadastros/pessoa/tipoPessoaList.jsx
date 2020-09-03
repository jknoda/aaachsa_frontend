import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, arrayInsert, arrayRemove } from 'redux-form'
import Grid from '../../common/layout/grid'
import DropdownList from '../../common/form/dropdown'
import 'react-widgets/dist/css/react-widgets.css'
import { getListTipo } from './pessoaActions'
import consts from '../../consts'

class TipoPessoaList extends Component {
    componentWillMount() {
        this.props.getListTipo()
    }

    add(index, item) {
        if (!this.props.readOnly) {
            const newItem = {EmpIdf:item.EmpIdf, TPessoaCod:consts.TPessoaCod, TPessoaDes:''}
            this.props.arrayInsert('pessoaForm', 'PessoaTipos', index, newItem)
        }
    }

    remove(index) {
        if (!this.props.readOnly && this.props.list.length > 1) {
            this.props.arrayRemove('pessoaForm', 'PessoaTipos', index)
        }
    }

    verValue(cod){
        console.log('cod',cod)
        return(cod)

    }
    renderRows() {
        const list = this.props.list || []
        const listaTipo = this.props.listaTipo || []
        return list.map((item, index) => (
            <tr key={index}>
                <td className='col-sm-7'>
                    <Field name={`PessoaTipos[${index}]`}
                        component={DropdownList}
                        data={listaTipo}
                        valueField="TPessoaCod"
                        textField="TPessoaDes"
                    />
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
                    <legend>Tipo de pessoa</legend>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Tipo</th>
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

const mapDispatchToProps = dispatch => bindActionCreators({ arrayInsert, arrayRemove, getListTipo }, dispatch)
const mapStateToProps = state => ({ listaTipo: state.pessoa.listaTipo })
export default connect(mapStateToProps, mapDispatchToProps)(TipoPessoaList)
