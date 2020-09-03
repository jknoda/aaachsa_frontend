import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getList, showUpdate, showDelete } from './albumActions'

class AlbumList extends Component {
    componentWillMount() {
        this.props.getList()
    }

    renderRows(){
        const list = this.props.list || []
        return list.map(a => (
            <tr key={a.AlbumCod}>
                <td>{a.AlbumCod}</td>
                <td>{a.AlbumDes}</td>
                <td>
                    <button className='btn btn-warning' onClick={()=>this.props.showUpdate(a)}>
                        <i className='fa fa-pencil'></i>
                    </button>
                    <button className='btn btn-danger' onClick={()=>this.props.showDelete(a)}>
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

const mapStateToProps = state => ({ list: state.album.list, show: state.album.show })
const mapDispatchToProps = dispatch => bindActionCreators({ getList, showUpdate, showDelete }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(AlbumList)