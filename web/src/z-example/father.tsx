//父子组件传值


import React, {Component} from 'react'
import Son from './child'
class Father  extends Component<any, any> {
    constructor(props) {
        super(props)
    }
    state = {
        info: 'hhhh',
        info2: ''
    }
    handleChange = (e) => {
        this.setState({
            info: e.target.value,
        })
    }
    callback = (e) => {
        this.setState({info2: e})
    }
    render() {
        return (
            <div>
                <input type='text' value={this.state.info} onChange={this.handleChange} />
                <div>{this.state.info2}</div>
                <div>------子组件---------</div>
                <Son callback={this.callback.bind(this)} info={this.state.info} />
            </div>
        )
    }
}
export default Father

