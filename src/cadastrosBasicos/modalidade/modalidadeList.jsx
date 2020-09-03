import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getList, showUpdate, showDelete } from './modalidadeActions'

class ModalidadeList extends Component {
    componentWillMount() {
        this.props.getList()
    }

    renderRows(){
        const list = this.props.list || []
        return list.map(modalidade => (
            <tr key={modalidade.ModCod}>
                <td>{modalidade.ModCod}</td>
                <td>{modalidade.ModDes}</td>
                <td>
                    <button className='btn btn-warning' onClick={()=>this.props.showUpdate(modalidade)}>
                        <i className='fa fa-pencil'></i>
                    </button>
                    <button className='btn btn-danger' onClick={()=>this.props.showDelete(modalidade)}>
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

const mapStateToProps = state => ({ list: state.modalidade.list })
const mapDispatchToProps = dispatch => bindActionCreators({ getList, showUpdate, showDelete }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ModalidadeList)