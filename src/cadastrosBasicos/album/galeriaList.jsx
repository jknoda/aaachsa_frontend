import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, arrayInsert, arrayRemove } from 'redux-form'
import Grid from '../../common/layout/grid'
import Input from '../../common/form/input'
import InputUpload from '../../common/form/inputUpload'
import 'react-widgets/dist/css/react-widgets.css'
import './album.css'
//import Modal from './albumModal'
//import consts from '../../consts'

class GaleriaList extends Component {
    add(index, item) {
        if (!this.props.readOnly) {
            const newItem = { EmpIdf: 1, AlbumCod: 1, GalCod: 0, GalDes: "des " +index }
            this.props.arrayInsert('albumForm', 'Galeria', index, newItem)
        }
    }

    remove(index) {
        if (!this.props.readOnly && this.props.list.length > 1) {
            this.props.arrayRemove('albumForm', 'Galeria', index)
        }
    }

    renderRows() {
        const list = this.props.list || [];
        return list.map((item, index) => (
            <tr key={index}>
                <td className='col-sm-7'>
                    <Field name={`Galeria[${index}].GalDes`}
                        component={InputUpload}
                        placeholder='Descrição'
                        readOnly={this.props.readOnly} 
                        index={index}/>
                    <div className='galeriahidden'>
                        <Field name={`Galeria[${index}].EmpIdf`} component={Input} />
                        <Field name={`Galeria[${index}].AlbumCod`} component={Input} />
                        <Field name={`Galeria[${index}].GalCod`} component={Input} />
                        <Field name={`Galeria[${index}].GalDes`} component={Input} />
                        <Field name={`Galeria[${index}].GalImagem`} component={Input} />
                        <Field name={`Galeria[${index}].GalPath`} component={Input} />
                        <Field name={`Galeria[${index}].GalArquivo`} component={Input} />
                        <Field name={`Galeria[${index}].GalExtensao`} component={Input} />
                    </div>
                </td>
                <td className='col-sm-5'>
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
                    <legend>Galeria</legend>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Descrição</th>
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

const mapDispatchToProps = dispatch => bindActionCreators({ arrayInsert, arrayRemove }, dispatch)
export default connect(null, mapDispatchToProps)(GaleriaList)


