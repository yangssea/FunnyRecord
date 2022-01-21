import React, {Component} from 'react'

export default class Sidebar extends Component<any, any> {
    constructor(props: any) {
        super(props)
    }

    tabArr = [
        {name: '全部应用', img: require('../static/download.png')},
        {name: '收藏', img: require('../static/do.png')},
        {name: '站点变更', img: require('../static/ndo.png')},
        {name: '设置', img: require('../static/confim.png')}
    ]

    state = {
        view: false,
        animate: 'sidebar-home animate__fadeInLeftBig animate__animated'
    }

    //弹框开关
    setView(): void {
        this.state.view ?this.setState({
                animate: 'sidebar-home animate__fadeOutLeftBig animate__animated'
            }) :this.setState({
                animate: 'sidebar-home animate__fadeInLeftBig animate__animated'
            })
        setTimeout(() => {
            this.setState({
                view: !this.state.view
            })
        }, 400)
    }

    noSetView(e: any):void {
        e.stopPropagation();
    }

    componentDidMount() {
        this.props.onRef(this)
    }

    render() {
        return (
            <div>
                {
                    !this.state.view ? '' : (<div className="sidebar-layout" onClick={this.setView.bind(this)}>
                        <div
                            className={this.state.animate}
                            onClick={(e) => this.noSetView.bind(this)(e)}>
                            <div className="header">
                                <img src={require('../static/portrait.jpg')}/>
                                <div className="name">JronShangiop</div>
                                {/*<div className="sub">Will turn into sunlight</div>*/}
                            </div>
                            <div className="center">
                                {
                                    this.tabArr.map(e => {
                                            return <div className="bar-one">
                                                <img src={e.img}/>
                                                <div>{e.name}</div>
                                                <img className="last-img" src={require('../static/right.png')}/>
                                            </div>
                                        }
                                    )
                                }
                            </div>
                            <div className="login">登录/注册</div>
                        </div>
                    </div>)
                }
            </div>
        )
    }
}