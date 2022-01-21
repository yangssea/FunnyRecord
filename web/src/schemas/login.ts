export interface Login {
    email: string
    password: string
    confirm?: string
    yzm?: number
    errorMsg?: ErrorMsg
    time?: number
    tip?: Msg
}

interface Msg {
    open: boolean
    severity: string
    tipMsg: string
}

interface ErrorMsg {
    email: string
    password: string
    confirm?: string
    yzm?: string
}