import {Component} from "react";

export default class Nodata extends Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="nodata-layout">
                <img className="img" src={require('../static/nodata.png')}/>
                <div>404</div>
            </div>
        )
    }
}