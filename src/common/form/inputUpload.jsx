import React, { useState } from 'react'
import Upload from '../upload/upload/Upload'
import './form.css'

export default props => {
    const [name, setName] = useState(props.input.value)
    const [path, setPath] = useState('')
    const [type, setType] = useState('')

    function informarUpload(dados) {
        setName(dados.name)
        setPath(dados.path)
        setType(dados.type)
    }

    return (
        <div>
            <Upload
                className='form-control form-upload'
                retorno={informarUpload}
            >
            </Upload>
            <input {...props.input}
                className='form-control form-upload'
                readOnly={true}
                value={name}
            />
            <div className='displaynone'>
                <input name={`Galeria[${props.index}].GalPath`} type='text' id='path' value={path} />
                <input name={`Galeria[${props.index}].GalExtensao`} type='text' id='type' value={type} />
            </div>
        </div>
    )
}