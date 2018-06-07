import React from 'react'
import styled from 'styled-components'
import { hot } from 'react-hot-loader'
import connect from '@connect'

const Root = styled.div`
    color: red;
`

@hot(module)
@connect('access', 'fileView')
export default class Access extends React.Component {
    render() {
        return (
            <Root>
                access
            </Root>
        )
    }
}