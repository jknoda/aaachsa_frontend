import consts from '../consts'
const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem(consts.userkey)),
    validToken: false
}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'TOKEN_VALIDATED':
            if (action.payload) {
                return { ...state, validToken: true }
            } else {
                localStorage.removeItem(consts.userkey)
                return { ...state, validToken: false, user: null }
            }
        case 'USER_FETCHED':
            localStorage.setItem(consts.userkey, JSON.stringify(action.payload))
            return { ...state, user: action.payload, validToken: true }
        default:
            return state
    }
}