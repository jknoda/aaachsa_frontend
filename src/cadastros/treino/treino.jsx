import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ContentHeader from '../../common/template/contentHeader'
import Content from '../../common/template/content'
import Tabs from '../../common/tab/tabs'
import TabsHeader from '../../common/tab/tabsHeader'
import TabsContent from '../../common/tab/tabsContent'
import TabHeader from '../../common/tab/tabHeader'
import TabContent from '../../common/tab/tabContent'
import { init, create, update, remove } from './treinoActions'

import List from './treinoList'
import Form from './treinoForm'

class Treino extends Component {

    componentWillMount() {
        this.props.init()
    }

    render() {
        return (
            <div>
                <ContentHeader title='Treinos' small='Cadastro' />
                <Content>
                    <Tabs>
                        <TabsHeader>
                            <TabHeader label='Listar' icon='fa fa-bars' target='tabList' />
                            <TabHeader label='Incluir' icon='fa fa-plus' target='tabCreate' />
                            <TabHeader label='Alterar' icon='fa fa-pencil' target='tabUpdate' />
                            <TabHeader label='Excluir' icon='fa fa-trash-o' target='tabDelete' />
                        </TabsHeader>
                        <TabsContent>
                            <TabContent id='tabList'>
                                <List />
                            </TabContent>
                            <TabContent id='tabCreate'>
                                <Form onSubmit={this.props.create} keyRO={false}
                                    submitLabel='Incluir' submitClass='btn-primary' />
                            </TabContent>
                            <TabContent id='tabUpdate'>
                                <Form onSubmit={this.props.update}
                                    submitLabel='Alterar' submitClass='btn-info' />
                            </TabContent>
                            <TabContent id='tabDelete'>
                                <Form onSubmit={this.props.remove} readOnly={true}
                                    submitLabel='Excluir' submitClass='btn-danger' />
                            </TabContent>
                        </TabsContent>
                    </Tabs>
                </Content>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ init, create, update, remove }, dispatch)
export default connect(null, mapDispatchToProps)(Treino)
