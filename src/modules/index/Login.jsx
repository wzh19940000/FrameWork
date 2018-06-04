import React from 'react'
import connect from '@connect'

@connect('user')
export default class Login extends React.Component {
    signIn = async () => {
        await this.props.signIn()
        this.props.history.push('/access')
    }
    render() {
        return (
            <div>
                <button onClick={this.signIn}>Login</button>
            </div>
        )
    }
}