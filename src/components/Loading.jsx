import React from 'react'
import { Spin } from 'antd'
import styled from 'styled-components'

const SpinContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
`

export default class Loading extends React.Component {
    render() {
        return (
            <SpinContainer>
                <Spin delay={200}></Spin>
            </SpinContainer>
        )
    }
}