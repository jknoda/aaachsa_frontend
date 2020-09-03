import React, { Component } from 'react'
import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import Card from '../common/template/card'
import Upload from '../common/upload/upload/Upload'

class Galeria extends Component {
    render() {
        return (
            <div>
                <ContentHeader title='Galeria' small='Versão 1.0' />
                <Content>
                    <div className="Cards">
                        <div className='col-sm-12'>
                            <Card titulo="Galeria" color="#2FCDD8">
                                <Upload></Upload>
                            </Card>
                        </div>
                        <div className='col-sm-12'>
                            <Card titulo="Galeria" color="#2FCDD8">
                                <div>asdflkj çlasdjkf çlaksf jçal fdjaçlsdf jalsdkf asd çlakdjfçlasd kfçlasdkf jaçls kdfjçlaskfjçals kdfjaçlskfjaçlskfjaçsldkjfaçlk</div>
                            </Card>
                        </div>
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
export default Galeria