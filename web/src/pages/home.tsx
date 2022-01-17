import React, {Component} from 'react'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import RestoreIcon from '@mui/icons-material/Restore'
import EventNoteIcon from '@mui/icons-material/EventNote'
import NoteAltIcon from '@mui/icons-material/NoteAlt'
import Sidebar from "../component/sidebar";
// 组件方式
export default class Home extends Component<any, any> {
    constructor(props: any) {
        super(props)
    }
    state = {
        value: 0,
        sideBarView: false
    }
    setValue = (e: number) => {
        console.log(e)
        this.setState({ value: e });
    }

    child = {setView: () => {}}

    onRef = (ref:any) => {
        this.child = ref
    }

    openSider(): void {
        // this.setState({ sideBarView: !this.state.sideBarView });
        if( this.child && this.child.setView) this.child.setView()
    }

    render() {
        return (
            <div className="home-layout">
                <div className="body">
                    <div className="doicon">
                        <img onClick={this.openSider.bind(this)} src={require('../static/menu.png')} />
                        <img  src={require('../static/find.png')} />
                    </div>
                    <div className="head">
                        <div className="hl-sub">To-do list</div>
                        <div className="hl-sub2">Updated on January 13</div>
                        <div className="hl-tab">
                            <div className="tab-child">
                                <img  src={require('../static/do.png')} />
                                <span>52条</span>
                            </div>
                            <div className="tab-child">
                                <img  src={require('../static/ndo.png')} />
                                <span>23条</span>
                            </div>
                            <div className="tab-child">
                                <img  src={require('../static/cal.png')} />
                                <span>52条</span>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <div className="do-head">
                            <div className="do-one">
                                <img src={require('../static/delete.png')} />
                                <span className="title">清空全部</span>
                                <span className="one-sum">（12）</span>
                            </div>
                            <div className="do-two">
                                <img src={require('../static/download.png')} />
                                <img src={require('../static/do1.png')} />
                            </div>
                        </div>
                        <div className="list">
                             <div className="list-rt">
                                 <img className="sign"  src={require('../static/level3.png')} />
                                 <div className="rt-txt">
                                     <div className="rt-title">今天不去别的地方</div>
                                     <div className="rt-sub">备注：无</div>
                                </div>
                                 <div className="right-txt">03-21</div>
                             </div>
                            <div className="list-rt">
                                <img className="sign"  src={require('../static/snow.png')} />
                                <div className="rt-txt">
                                    <div className="rt-title">今天不去别的地方</div>
                                    <div className="rt-sub">备注：无</div>
                                </div>
                                <div className="right-txt">03-21</div>
                            </div>
                            <div className="list-rt">
                                <img className="sign"  src={require('../static/sun.png')} />
                                <div className="rt-txt">
                                    <div className="rt-title">今天不去别的地方</div>
                                    <div className="rt-sub">备注：无</div>
                                </div>
                                <div className="right-txt">03-21</div>
                            </div>
                            <div className="list-rt">
                                <img className="sign"  src={require('../static/rain_1.png')} />
                                <div className="rt-txt">
                                    <div className="rt-title">今天不去别的地方</div>
                                    <div className="rt-sub">备注：无</div>
                                </div>
                                <div className="right-txt">03-21</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <BottomNavigation
                        showLabels
                        onChange={(event, newValue) => {
                            this.setValue(newValue);
                        }}
                        value={this.state.value}
                    >
                        <BottomNavigationAction label="待办" icon={<RestoreIcon />} />
                        <BottomNavigationAction label="日记" icon={<EventNoteIcon />} />
                        <BottomNavigationAction label="动态" icon={<NoteAltIcon />} />
                    </BottomNavigation>
                </div>
                <Sidebar onRef={this.onRef}></Sidebar>
                {/*{this.state.sideBarView ? <Sidebar></Sidebar> : ''}*/}
            </div>
        )
    }
}
// hook方式