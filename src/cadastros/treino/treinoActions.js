import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'
import { showTabs, selectTab } from '../../common/tab/tabActions'

import consts from '../../consts'
const user = JSON.parse(localStorage.getItem(consts.userkey))

const INITIAL_VALUES = { TreinoParticipantes: [{}] }

export function getList() {
    const request = axios.post(`${consts.API_URL}/treinos/completo`, { EmpIdf: user.EmpIdf })
    return {
        type: 'TREINO_FETCHED',
        payload: request
    }
}

export function getListPessoas() {
    const request = axios.post(`${consts.API_URL}/pessoas/todas`, { EmpIdf: user.EmpIdf })
    return {
        type: 'TREINOLISTAPESSOA_FETCHED',
        payload: request
    }
}

export function getListModalidade() {
    const request = axios.post(`${consts.API_URL}/modalidades/todas`, { EmpIdf: user.EmpIdf })
    return {
        type: 'TREINOLISTAMODALIDADE_FETCHED',
        payload: request
    }
}

export function create(values) {
    const dados = {
        // EmpIdf: user.EmpIdf,
        // PesCod: parseFloat(values.PesCod),
        // PesNome: values.PesNome,
        // PesNomeResumido: values.PesNomeResumido,
        // PesEmail: values.PesEmail,
        // PesTipo: 'F', // F=Fisico
        // AudCodInc: user.PesCod,
        // AudDataInc: new Date,
        // PessoaTipos: values.PessoaTipos,
        // PessoaPerfils: values.PessoaPerfils,
        // PessoaModalidades: values.PessoaModalidades
    }
    return submit('post', 'treinos/incluir', dados)
}

export function update(values) {
    const dados = {
        // EmpIdf: user.EmpIdf,
        // PesCod: parseFloat(values.PesCod),
        // PesNome: values.PesNome,
        // PesNomeResumido: values.PesNomeResumido,
        // PesEmail: values.PesEmail,
        // PesTipo: 'F', // F=Fisico
        // AudCodInc: user.PesCod,
        // AudDataInc: new Date,
        // AudCodAlt: user.PesCod,
        // AudDataAlt: new Date,
        // PessoaTipos: values.PessoaTipos,
        // PessoaPerfils: values.PessoaPerfils,
        // PessoaModalidades: values.PessoaModalidades
    }
    console.log('values',values)
    return true; //submit('post', 'treinos/alterar', dados)
}

export function remove(values) {
    const dados = {
        // EmpIdf: user.EmpIdf,
        // PesCod: parseFloat(values.PesCod)
    }
    return submit('post', 'treinos/excluir', dados)
}

function submit(method, route, dados) {
    return dispatch => {
        axios[method](`${consts.API_URL}/${route}`, dados)
            .then(resp => {
                toastr.success('Sucesso', 'Operação realizada com sucesso.')
                dispatch(init())
            })
            .catch(e => {
                console.log('erro:',e)
                e.response.data.errors.forEach(error => toastr.error('Erro', error.message))
            })
    }
}

export function showUpdate(treino) {
    return [
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('treinoForm', treino)
    ]
}

export function showDelete(treino) {
    return [
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('treinoForm', treino)
    ]
}

export function init() {
    return [
        selectTab('tabList'),
        showTabs('tabList', 'tabCreate'),
        getList(),
        initialize('treinoForm', INITIAL_VALUES)
    ]
}