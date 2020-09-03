const INITIAL_STATE = {summary: {atletas: 0, treinos:0, eventos: 0}}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'AAACHSA_SUMMARY_FETCHED':
            return { ...state, summary: action.payload.data }
        default:
            return state
    }
}