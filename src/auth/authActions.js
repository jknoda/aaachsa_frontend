import { toastr } from 'react-redux-toastr'
import axios from 'axios'
import consts from '../consts'

export function login(values) {
    const dados = {
        EmpIdf: consts.EmpIdf,
        LoginUsuario: values.LoginUsuario,
        LoginSenha: values.LoginSenha
    }
    return submit(dados, `${consts.OAPI_URL}/login`)
}

export function signup(values) {
    const dados = {
        EmpIdf: consts.EmpIdf,
        LoginUsuario: values.LoginUsuario,
        LoginSenha: values.LoginSenha,
        PesNome: values.PesNome,
        PesNomeResumido: values.PesNome.length > 50 ? values.PesNome.substring(0,50) : values.PesNome,
        PesCod: values.PesCod,
        PesEmail: values.PesEmail,
        confirm_password: values.confirm_password
    }
    return submit(dados, `${consts.OAPI_URL}/signup`)
}

function submit(values, url) {
    return dispatch => {
        axios.post(url, values)
            .then(resp => {
                localStorage.setItem(consts.userkey, JSON.stringify(resp.data))
                dispatch([
                    { type: 'USER_FETCHED', payload: resp.data }
                ])
            })
            .catch(e => {
                e.response.data.errors.forEach(
                    error => toastr.error('Erro', error))
            })
    }
}

export function logout() {
    return { type: 'TOKEN_VALIDATED', payload: false }
}

export function validateToken(token) {
    return dispatch => {
        if (token) {
            axios.post(`${consts.OAPI_URL}/validateToken`, { token })
                .then(resp => {
                    dispatch({ type: 'TOKEN_VALIDATED', payload: resp.data.valid })
                })
                .catch(e => dispatch({ type: 'TOKEN_VALIDATED', payload: false }))
        } else {
            dispatch({ type: 'TOKEN_VALIDATED', payload: false })
        }
    }
}