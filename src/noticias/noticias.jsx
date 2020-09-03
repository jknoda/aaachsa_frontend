import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import ValueBox from '../common/widget/valueBox'
import Row from '../common/layout/row'
import Card from '../common/template/card'

class Noticias extends Component {
    render() {
        return (
            <div>
                <ContentHeader title='Notícias' small='Versão 1.0' />
                <Content>
                    <div className="Cards">
                        <Card titulo="Notícias" color="#2FCDD8">
                            <div>asdflkj çlasdjkf çlaksf jçal fdjaçlsdf jalsdkf asd çlakdjfçlasd kfçlasdkf jaçls kdfjçlaskfjçals kdfjaçlskfjaçlskfjaçsldkjfaçlk</div>
                        </Card>
                    </div>
                </Content>
            </div>
        )
    }
}

// padrao decorator
// const mapStateToProps = state => ({ summary: state.dashboard.summary }) // dashboard está no reducers
// const mapDispatchToProps = dispatch => bindActionCreators({getSummary}, dispatch)

// export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
export default Noticias