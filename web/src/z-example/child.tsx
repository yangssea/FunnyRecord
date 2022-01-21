import React, {Component} from "react";

interface IProps {
    info?: string,
    callback?: any
}
export default class Son  extends Component<IProps>{
    constructor(props) {
        super(props)
        console.log(props,  props.callback)
    }
    change(e) {
        this.props.callback(e.target.value)
    }
    render() {
        return (
            <div>
                <p>{this.props.info}</p>
                <input onChange={this.change.bind(this)} />
            </div>
        )
    }
}