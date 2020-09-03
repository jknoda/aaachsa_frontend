import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'
import { showTabs, selectTab } from '../../common/tab/tabActions'

import consts from '../../consts'

const user = JSON.parse(localStorage.getItem(consts.userkey))

const INITIAL_VALUES = { Galeria: [{}] }

export function showModal() {
    return {
        type: 'ALBUMMODAL_FETCHED',
        payload: true
    }
}

export function getList() {
    const request = axios.post(`${consts.API_URL}/albuns/completo`, { EmpIdf: user.EmpIdf })
    return {
        type: 'ALBUM_FETCHED',
        payload: request
    }
}

export function create(values) {
    const dados = {
        EmpIdf: user.EmpIdf,
        AlbumCod: parseInt(values.AlbumCod),
        AlbumDes: values.AlbumDes,
        AudCodInc: user.PesCod,
        AudDataInc: new Date,
        Galeria: values.Galeria
    }
    return submit(values, 'post', 'albuns/incluir', dados)
}

export function update(values) {
    const dados = {
        EmpIdf: user.EmpIdf,
        AlbumCod: parseInt(values.AlbumCod),
        AlbumDes: values.AlbumDes,
        AudCodAlt: user.PesCod,
        AudDataAlt: new Date,
        Galeria: values.Galeria
    }
    console.log('dadosupdate',dados)
    return submit(values, 'post', 'albuns/alterar', dados)
}

export function remove(values) {
    const dados = {
        EmpIdf: user.EmpIdf,
        AlbumCod: parseInt(values.AlbumCod)
    }
    return submit(values, 'post', 'albuns/excluir', dados)
}

function submit(values, method, route, dados) {
    return dispatch => {
        axios[method](`${consts.API_URL}/${route}`, dados)
            .then(resp => {
                toastr.success('Sucesso', 'Operação realizada com sucesso.')
                dispatch(init())
            })
            .catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error.message))
            })
    }
}

export function showUpdate(album) {
    return [
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('albumForm', album)
    ]
}

export function showDelete(album) {
    return [
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('albumForm', album)
    ]
}

export function init() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(),
        initialize('albumForm', INITIAL_VALUES)
    ]
}