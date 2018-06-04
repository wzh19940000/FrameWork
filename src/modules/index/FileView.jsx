import React from "react"
import styled, { keyframes } from "styled-components"
import connect from "@connect"
import { Loading } from '@components'

const inFrames = keyframes`
    0% {
        transform: scale(0);
        opacity: 0;
    }
    100% {
        transform: scale(1);
        opacity: 1
    }
`
const outFrames = keyframes`
    0% {
        transform: scale(1);
        opacity: 1
    }
    100% {
        transform: scale(0);
        opacity: 0
    }
`

const Root = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    &.swift-in {
        animation: ${inFrames} 0.5s;
    }
    &.swift-out {
        animation: ${outFrames} 0.4s;
    }
    /* 关闭按钮 CSS */
    .btn-close {
        position: absolute;
        top: -100px;
        right: -100px;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        background: rgba(10, 10, 10, .2);
        color: #fff;
        cursor: pointer;
        .btn-icon {
            position: absolute;
            left: 30px;
            bottom: 30px;
            width: 70px;
            height: 70px;
            text-align: center;
            line-height: 70px;
            font-size: 50px;
        }
        &:hover {
            background: rgba(10, 10, 10, 0.5);
            color: #c00;
        }
    }
    .view {
        max-width: 100%;
        max-height: 100%;
        &.tip-view {
            font-size: 50px;
            text-shadow: 2px 2px 30px #fff;
            color: #000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
`

@connect("fileView")
export default class FileView extends React.Component {
    root = React.createRef()
    componentWillUnmount() {
        this.root.current.removeEventListener('animationend', this.props.resetFileView)
    }
    onClose = () => {
        const node = this.root.current
        node.classList.add('swift-out')
        node.addEventListener('animationend', this.props.resetFileView)
    }
    render() {
        return this.props.active ? (
            <Root innerRef={this.root} className='swift-in'>
                {this.props.loading ? (
                    <Loading />
                ) : (
                    this.props.fileType === 'IMG' ? (
                        <img src={this.props.url} alt="" className='view'/>
                    ) : (this.props.fileType === 'PDF' ? (
                        <embed src={this.props.url} className='view'/>
                    ) : (
                        <div className="view tip-view">暂不支持该类型文件预览……</div>
                    ))
                )}
                <div className="btn-close" onClick={this.onClose}>
                    <span className="btn-icon">&times;</span>
                </div>
            </Root>
        ) : null
    }
}
