import React from 'react'
import connect from '@connect'
import styled from 'styled-components'
import { hot } from 'react-hot-loader'

const Root = styled.div``

@hot(module)
@connect('organization')
export default class Organization extends React.Component {
    async componentDidMount() {
        await this.props.inc()
    }
    render() {
        return (
            <Root>
                <span>{this.props.count}</span>
                <br/>
                <button onClick={this.props.inc}>+</button>
                <br/>
                <button onClick={this.props.dec}>-</button>
            </Root>            
        )
    }
}