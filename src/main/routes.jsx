import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Dashboard from '../dashboard/dashboard'
import Noticias from '../noticias/noticias'
import Galeria from '../galeria/galeria'
import Modalidade from '../cadastrosBasicos/modalidade/modalidade'
import Pessoa from '../cadastros/pessoa/pessoa'
import Evento from '../cadastros/evento/evento'
import Aviso from '../cadastros/avisos/aviso'
import NewsLetter from '../cadastros/avisos/newsLetter'
import Empresa from '../cadastrosBasicos/empresa/empresa'
import Treino from '../cadastros/treino/treino'
import TipoPessoa from '../cadastrosBasicos/tipoPessoa/tipoPessoa'
import Perfil from '../cadastrosBasicos/perfil/perfil'
import Album from '../cadastrosBasicos/album/album'

export default props => (
    <div className='content-wrapper'>
        <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/noticias' component={Noticias} />
            <Route path='/galeria' component={Galeria} />
            <Route path='/cadEmpresas' component={Empresa} />
            <Route path='/cadModalidades' component={Modalidade} />
            <Route path='/cadPessoas' component={Pessoa} />
            <Route path='/cadAvisos' component={Aviso} />
            <Route path='/cadNewsLetters' component={NewsLetter} />
            <Route path='/cadTreinos' component={Treino} />
            <Route path='/cadEventos' component={Evento} />
            <Route path='/cadTiposPessoa' component={TipoPessoa} />
            <Route path='/cadPerfis' component={Perfil} />
            <Route path='/cadAlbuns' component={Album} />
            <Redirect from='*' to='/' />
        </Switch>
    </div >
    // <Router history={hashHistory}>
    //     <Route path='/' component={AuthOrApp}>            
    //         <IndexRoute component={Dashboard} />
    //         <Route path='/noticias' component={Noticias} />
    //         <Route path='/galeria' component={Galeria} />
    //         <Route path='/cadEmpresas' component={Empresa} />
    //         <Route path='/cadModalidades' component={Modalidade} />
    //         <Route path='/cadPessoas' component={Pessoa} />
    //         <Route path='/cadAvisos' component={Aviso} />
    //         <Route path='/cadNewsLetters' component={NewsLetter} />
    //         <Route path='/cadTreinos' component={Treino} />
    //         <Route path='/cadEventos' component={Evento} />
    //         <Route path='/cadTiposPessoa' component={TipoPessoa} />
    //         <Route path='/cadPerfis' component={Perfil} />
    //     </Route>
    // </Router>
)