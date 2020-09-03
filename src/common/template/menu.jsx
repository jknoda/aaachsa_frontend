import React from 'react'
import MenuItem from './menuItem'
import MenuTree from './menuTree'

export default props => (
    <ul className='sidebar-menu'>
        <MenuItem path='/' label='Dashboard' icon='fa fa-dashboard' />
        <MenuItem path='noticias' label='Notícias' icon='fa fa-dashboard' />
        <MenuItem path='galeria' label='Galeria' icon='fa fa-dashboard' />
        <MenuTree label='Cadastro' icon='fa fa-edit'>
            <MenuTree label='Básico' icon='fa fa-edit'>
                <MenuItem path='cadEmpresas' label='Empresas' icon='fa fa-usd' />
                <MenuItem path='cadModalidades' label='Modalidades' icon='fa fa-usd' />
                <MenuItem path='cadPerfis' label='Perfil usuário' icon='fa fa-usd' />
                <MenuItem path='cadTiposPessoa' label='Tipo de pessoa' icon='fa fa-usd' />
                <MenuItem path='cadAlbuns' label='Album' icon='fa fa-usd' />
            </MenuTree>
            <MenuItem path='cadPessoas' label='Pessoas' icon='fa fa-usd' />
            <MenuItem path='cadTreinos' label='Treinos' icon='fa fa-usd' />
            <MenuItem path='cadEventos' label='Eventos' icon='fa fa-usd' />
            <MenuItem path='cadAvisos' label='Avisos' icon='fa fa-usd' />
            <MenuItem path='cadNewsLetters' label='News letters' icon='fa fa-usd' />
        </MenuTree>
    </ul>
)