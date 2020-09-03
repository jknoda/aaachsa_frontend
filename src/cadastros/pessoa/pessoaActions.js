import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'
import { showTabs, selectTab } from '../../common/tab/tabActions'

import consts from '../../consts'
const user = JSON.parse(localStorage.getItem(consts.userkey))

const INITIAL_VALUES = { PessoaTipos: [{}], PessoaPerfils: [{}], PessoaModalidades: [{}] }
export function getListPerfil() {
    const request = axios.post(`${consts.API_URL}/perfis/todas`, { EmpIdf: user.EmpIdf })
    return {
        type: 'LISTAPERFIL_FETCHED',
        payload: request
    }
}

export function getListTipo() {
    const request = axios.post(`${consts.API_URL}/tipospessoas/todas`, { EmpIdf: user.EmpIdf })
    return {
        type: 'LISTATIPO_FETCHED',
        payload: request
    }
}

export function getListModalidade() {
    const request = axios.post(`${consts.API_URL}/modalidades/todas`, { EmpIdf: user.EmpIdf })
    return {
        type: 'LISTAMODALIDADE_FETCHED',
        payload: request
    }
}

export function getList() {
    const request = axios.post(`${consts.API_URL}/pessoas/completo`, { EmpIdf: user.EmpIdf })
    return {
        type: 'PESSOA_FETCHED',
        payload: request
    }
}

export function create(values) {
    const dados = {
        EmpIdf: user.EmpIdf,
        PesCod: parseFloat(values.PesCod),
        PesNome: values.PesNome,
        PesNomeResumido: values.PesNomeResumido,
        PesEmail: values.PesEmail,
        PesTipo: 'F', // F=Fisico
        AudCodInc: user.PesCod,
        AudDataInc: new Date,
        PessoaTipos: values.PessoaTipos,
        PessoaPerfils: values.PessoaPerfils,
        PessoaModalidades: values.PessoaModalidades
    }
    return submit('post', 'pessoas/incluir', dados)
}

export function update(values) {
    const dados = {
        EmpIdf: user.EmpIdf,
        PesCod: parseFloat(values.PesCod),
        PesNome: values.PesNome,
        PesNomeResumido: values.PesNomeResumido,
        PesEmail: values.PesEmail,
        PesTipo: 'F', // F=Fisico
        AudCodInc: user.PesCod,
        AudDataInc: new Date,
        AudCodAlt: user.PesCod,
        AudDataAlt: new Date,
        PessoaTipos: values.PessoaTipos,
        PessoaPerfils: values.PessoaPerfils,
        PessoaModalidades: values.PessoaModalidades
    }
    return submit('post', 'pessoas/alterar', dados)
}

export function remove(values) {
    const dados = {
        EmpIdf: user.EmpIdf,
        PesCod: parseFloat(values.PesCod)
    }
    return submit('post', 'pessoas/excluir', dados)
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

export function showUpdate(pessoa) {
    if (pessoa.PessoaPerfils.length === 0) {
        pessoa.PessoaPerfils = [{}]
    }
    if (pessoa.PessoaTipos.length === 0) {
        pessoa.PessoaTipos = [{}]
    }
    if (pessoa.PessoaModalidades.length === 0) {
        pessoa.PessoaModalidades = [{}]
    }
    return [
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('pessoaForm', pessoa)
    ]
}

export function showDelete(pessoa) {
    if (pessoa.PessoaPerfils.length === 0) {
        pessoa.PessoaPerfils = [{}]
    }
    if (pessoa.PessoaTipos.length === 0) {
        pessoa.PessoaTipos = [{}]
    }
    if (pessoa.PessoaModalidades.length === 0) {
        pessoa.PessoaModalidades = [{}]
    }
    return [
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('pessoaForm', pessoa)
    ]
}

export function init() {
    return [
        selectTab('tabList'),
        showTabs('tabList', 'tabCreate'),
        getList(),
        initialize('pessoaForm', INITIAL_VALUES)
    ]
}