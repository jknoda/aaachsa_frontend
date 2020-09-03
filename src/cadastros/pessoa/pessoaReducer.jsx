const INITIAL_STATE = { listaPessoa: [], listaPerfil:[], listaTipo:[], listaModalidade:[] }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'PESSOA_FETCHED':
            return { ...state, listaPessoa: action.payload.data }
        case 'LISTAPERFIL_FETCHED':
            return { ...state, listaPerfil: action.payload.data }
        case 'LISTATIPO_FETCHED':
            return { ...state, listaTipo: action.payload.data }
        case 'LISTAMODALIDADE_FETCHED':
            return { ...state, listaModalidade: action.payload.data }
        default:
            return state
    }
}