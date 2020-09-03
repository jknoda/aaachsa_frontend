import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'
import { showTabs, selectTab } from '../../common/tab/tabActions'

import consts from '../../consts'
const user = JSON.parse(localStorage.getItem(consts.userkey))

const INITIAL_VALUES = {}

export function getList() {
    const request = axios.post(`${consts.API_URL}/perfis/todas`, { EmpIdf: user.EmpIdf })
    return {
        type: 'PERFIL_FETCHED',
        payload: request
    }
}

export function create(values) {
    const dados = {
        EmpIdf: user.EmpIdf,
        PerfilCod: parseInt(values.PerfilCod),
        PerfilDes: values.PerfilDes,
        AudCodInc: user.PesCod,
        AudDataInc: new Date
    }
    return submit(values, 'post', 'perfis/incluir', dados)
}

export function update(values) {
    const dados = {
        EmpIdf: user.EmpIdf,
        PerfilCod: parseInt(values.PerfilCod),
        PerfilDes: values.PerfilDes,
        AudCodAlt: user.PesCod,
        AudDataAlt: new Date
    }
    return submit(values, 'post', 'perfis/alterar', dados)
}

export function remove(values) {
    const dados = {
        EmpIdf: user.EmpIdf,
        PerfilCod: parseInt(values.PerfilCod)
    }
    return submit(values, 'post', 'perfis/excluir', dados)
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

export function showUpdate(perfil) {
    return [
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('perfilForm', perfil)
    ]
}

export function showDelete(perfil) {
    return [
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('perfilForm', perfil)
    ]
}

export function init() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(),
        initialize('perfilForm', INITIAL_VALUES)
    ]
}