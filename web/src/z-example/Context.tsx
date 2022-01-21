import React, {Component} from "react";

//多层组件之间的传值
const {Consumer, Provider} = React.createContext(null) //创建 context 并暴露Consumer和Provide
export default class Context extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        info: 'hello'
    }

    render() {
        return (
            <Provider value={this.state.info}>
                <div>
                    <Son/>
                </div>
            </Provider>
        )
    }
}

class Son extends Component {
    render() {
        return (
            <Consumer>
                {(info) => (
                    // 通过Consumer直接获取父组件的值
                    <div>
                        <p>父组件的值:{info}</p>
                        <GrandSon/>
                    </div>
                )}
            </Consumer>
        )
    }
}

class GrandSon extends Component {
    render() {
        return (
            <Consumer>
                {(info) => (
                    // 通过Consumer直接获取父组件的值
                    <div>
                        <p>父组件的值:{info}</p>
                    </div>
                )}
            </Consumer>
        )
    }
}