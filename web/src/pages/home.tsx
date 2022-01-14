import React, {Component} from 'react'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import RestoreIcon from '@mui/icons-material/Restore'
import EventNoteIcon from '@mui/icons-material/EventNote'
import NoteAltIcon from '@mui/icons-material/NoteAlt'
// 组件方式
export default class Home extends Component<any, any> {
    constructor(props: any) {
        super(props)
    }
    state = {
        value: 0
    }
    setValue = (e: number) => {
        console.log(e)
        this.setState({ value: e });
    }

    render() {
        return (
            <div className="home-layout">
                <div className="body">
                    <div className="doicon">
                        <img src={require('../static/menu.png')} />
                        <img  src={require('../static/find.png')} />
                    </div>
                    <div className="head">
                        <div className="hl-sub">todo</div>
                        <div className="hl-tab"></div>
                    </div>
                    <div className="content"></div>
                </div>
                <div  className="footer">
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
            </div>
        )
    }
}
// hook方式