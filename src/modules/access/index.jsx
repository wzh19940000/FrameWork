import React from 'react'
import connect from '@connect'

@connect('fileView')
export default class Access extends React.Component {
    render() {
        return (
            <button onClick={this.props.preview}>click</button>
        )
    }
}