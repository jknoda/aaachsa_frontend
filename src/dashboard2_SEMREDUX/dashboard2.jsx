// EXEMPLO SEM REDUX

import React, { Component } from 'react'
import axios from 'axios'

import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import ValueBox from '../common/widget/valueBox'
import Row from '../common/layout/row'

const BASE_URL = 'http://localhost:3003/api'
const EmpIdf = { EmpIdf: 1 }

export default class Dashboard2 extends Component {

    constructor(props) {
        super(props)
        this.state = { atletas: 0, treinos: 0, eventos: 0 }
    }

    componentWillMount() {
        axios.post(`${BASE_URL}/general/summary`, EmpIdf)
            .then(resp => this.setState(resp.data))
    }

    render() {
        const { atletas, treinos, eventos } = this.state
        return (
            <div>
                <ContentHeader title='Dashboard' small='Versão 2.0' />
                <Content>
                    <Row>
                        <ValueBox cols='12 4' color='bg-green' icon='fa fa-bank'
                            value={atletas} text='Total de atletas' />
                        <ValueBox cols='12 4' color='bg-red' icon='fa fa-credit-card'
                            value={treinos} text='Total de treinos' />
                        <ValueBox cols='12 4' color='bg-blue' icon='fa fa-money'
                            value={eventos} text='Total de eventos' />
                    </Row>

                </Content>
            </div>
        )
    }
}