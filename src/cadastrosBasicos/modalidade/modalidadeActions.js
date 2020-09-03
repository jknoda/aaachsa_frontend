import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'
import { showTabs, selectTab } from '../../common/tab/tabActions'

import consts from '../../consts'
const user = JSON.parse(localStorage.getItem(consts.userkey))

const INITIAL_VALUES = {}

export function getList() {
    const request = axios.post(`${consts.API_URL}/modalidades/todas`, { EmpIdf: user.EmpIdf })
    return {
        type: 'MODALIDADE_FETCHED',
        payload: request
    }
}

export function create(values) {
    const dados = {
        EmpIdf: user.EmpIdf,
        ModCod: parseInt(values.ModCod),
        ModDes: values.ModDes,
        AudCodInc: user.PesCod,
        AudDataInc: new Date
    }
    return submit(values, 'post', 'modalidades/incluir', dados)
}

export function update(values) {
    const dados = {
        EmpIdf: user.EmpIdf,
        ModCod: parseInt(values.ModCod),
        ModDes: values.ModDes,
        AudCodAlt: user.PesCod,
        AudDataAlt: new Date
    }
    return submit(values, 'post', 'modalidades/alterar', dados)
}

export function remove(values) {
    const dados = {
        EmpIdf: user.EmpIdf,
        ModCod: parseInt(values.ModCod)
    }
    return submit(values, 'post', 'modalidades/excluir', dados)
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

export function showUpdate(modalidade) {
    return [
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('modalidadeForm', modalidade)
    ]
}

export function showDelete(modalidade) {
    return [
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('modalidadeForm', modalidade)
    ]
}

export function init() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(),
        initialize('modalidadeForm', INITIAL_VALUES)
    ]
}