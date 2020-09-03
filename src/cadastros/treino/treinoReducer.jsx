const INITIAL_STATE = {listaTreino:[], listaPessoa:[], listaModalidade:[]}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'TREINO_FETCHED':
            return { ...state, listaTreino: action.payload.data }
        case 'TREINOLISTAPESSOA_FETCHED':
            return { ...state, listaPessoa: action.payload.data }
        case 'TREINOLISTAMODALIDADE_FETCHED':
            return { ...state, listaModalidade: action.payload.data }
        default:
            return state
    }
}