import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getList, showUpdate, showDelete } from './treinoActions'

class TreinoList extends Component {
    componentWillMount() {
        this.props.getList()
    }

    renderRows() {
        const list = this.props.list || []
        return list.map(treino => (
            <tr key={treino.TrnCod}>
                <td>{treino.TrnCod}</td>
                <td>{treino.TrnDes}</td>
                <td>{treino.ModDes}</td>
                <td>{treino.TrnDataInicial} {treino.TrnHoraInicial}</td>
                <td>{treino.TrnDataFinal} {treino.TrnHoraFinal}</td>
                <td>
                    <button className='btn btn-warning' onClick={() => this.props.showUpdate(treino)}>
                        <i className='fa fa-pencil'></i>
                    </button>
                    <button className='btn btn-danger' onClick={() => this.props.showDelete(treino)}>
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
                            <th>Modalidade</th>
                            <th>Inicio</th>
                            <th>Final</th>
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

const mapStateToProps = state => ({ list: state.treino.listaTreino })
const mapDispatchToProps = dispatch => bindActionCreators({ getList, showUpdate, showDelete }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TreinoList)