import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'
import { showTabs, selectTab } from '../../common/tab/tabActions'

import consts from '../../consts'
const user = JSON.parse(localStorage.getItem(consts.userkey))

const INITIAL_VALUES = {}

export function getList() {
    const request = axios.post(`${consts.API_URL}/tipospessoas/todas`, { EmpIdf: user.EmpIdf })
    return {
        type: 'TIPOPESSOA_FETCHED',
        payload: request
    }
}

export function create(values) {
    const dados = {
        EmpIdf: user.EmpIdf,
        TPessoaCod: parseInt(values.TPessoaCod),
        TPessoaDes: values.TPessoaDes,
        AudCodInc: user.PesCod,
        AudDataInc: new Date
    }
    return submit(values, 'post', 'tipospessoas/incluir', dados)
}

export function update(values) {
    const dados = {
        EmpIdf: user.EmpIdf,
        TPessoaCod: parseInt(values.TPessoaCod),
        TPessoaDes: values.TPessoaDes,
        AudCodAlt: user.PesCod,
        AudDataAlt: new Date
    }
    return submit(values, 'post', 'tipospessoas/alterar', dados)
}

export function remove(values) {
    const dados = {
        EmpIdf: user.EmpIdf,
        TPessoaCod: parseInt(values.TPessoaCod)
    }
    return submit(values, 'post', 'tipospessoas/excluir', dados)
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

export function showUpdate(tipoPessoa) {
    return [
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('tipoPessoaForm', tipoPessoa)
    ]
}

export function showDelete(tipoPessoa) {
    return [
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('tipoPessoaForm', tipoPessoa)
    ]
}

export function init() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(),
        initialize('tipoPessoaForm', INITIAL_VALUES)
    ]
}