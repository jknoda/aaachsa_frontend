import { combineReducers } from 'redux'
import {reducer as formReducer} from'redux-form'
import {reducer as toastrReducer} from'react-redux-toastr'

import DashboardReducer from '../dashboard/dashboardReducer'
import TabReducer from '../common/tab/tabReducer'
import AuthReducer from '../auth/authReducer'

import ModalidadeReducer from '../cadastrosBasicos/modalidade/modalidadeReducer'
import PessoaReducer from '../cadastros/pessoa/pessoaReducer'
import PerfilReducer from '../cadastrosBasicos/perfil/perfilReducer'
import TPessoaReducer from '../cadastrosBasicos/tipoPessoa/tipoPessoaReducer'
import AlbumReducer from '../cadastrosBasicos/album/albumReducer'
import TreinoReducer from '../cadastros/treino/treinoReducer'

const rootReducer = combineReducers({
    dashboard: DashboardReducer,
    tab: TabReducer,

    modalidade: ModalidadeReducer,
    auth: AuthReducer,
    pessoa: PessoaReducer,
    perfil: PerfilReducer,
    tipoPessoa: TPessoaReducer,
    album: AlbumReducer,
    treino: TreinoReducer,

    form: formReducer,
    toastr: toastrReducer
})

export default rootReducer