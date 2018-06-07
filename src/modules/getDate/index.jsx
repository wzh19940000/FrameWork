import React from 'react'
import connect from '@connect'
import styled from 'styled-components'

const Root = styled.div``

@connect('getDate')
export default class GetDate extends React.Component {
    async componentDidMount() {
        await this.props.loadDate()
    }
    render() {
        return (
            <Root>
                <span>{this.props.nowDate}</span>
                <br/>
                <button onClick={this.props.loadDate}>Load nowDate</button>
            </Root>            
        )
    }
}