import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getList, showUpdate, showDelete } from './tipoPessoaActions'

class TipoPessoaList extends Component {
    componentWillMount() {
        this.props.getList()
    }

    renderRows(){
        const list = this.props.list || []
        return list.map(tipoPessoa => (
            <tr key={tipoPessoa.TPessoaCod}>
                <td>{tipoPessoa.TPessoaCod}</td>
                <td>{tipoPessoa.TPessoaDes}</td>
                <td>
                    <button className='btn btn-warning' onClick={()=>this.props.showUpdate(tipoPessoa)}>
                        <i className='fa fa-pencil'></i>
                    </button>
                    <button className='btn btn-danger' onClick={()=>this.props.showDelete(tipoPessoa)}>
                        <i className='fa fa-trash-o'></i>
                    </button>
                </td>
            </tr>
        ))
    }

    render() {
        return (
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Descrição</th>
                            <th className='table-actions'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => ({ list: state.tipoPessoa.list })
const mapDispatchToProps = dispatch => bindActionCreators({ getList, showUpdate, showDelete }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TipoPessoaList)