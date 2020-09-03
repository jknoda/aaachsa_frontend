import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getSummary } from './dashboardActions'
import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import ValueBox from '../common/widget/valueBox'
import Row from '../common/layout/row'

class Dashboard extends Component {

    componentWillMount(){
        this.props.getSummary()
    }

    render() {
        const { atletas, treinos, eventos } = this.props.summary
        return (
            <div>
                <ContentHeader title='Dashboard' small='Versão 1.0' />
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

// padrao decorator
const mapStateToProps = state => ({ summary: state.dashboard.summary }) // dashboard está no reducers
const mapDispatchToProps = dispatch => bindActionCreators({getSummary}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
