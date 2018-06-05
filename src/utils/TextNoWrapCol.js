import React from 'react'
import {render} from 'react-dom'
import styled from 'styled-components'
import {Col as _Col,Tooltip } from 'antd'
const Col = styled(_Col)`
    .textNowrap{
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`

/**
 * 提取了TextNoWrapCol组件，所有类似的不换行省略号显示且带有tips的col 都可复用该组件。
 * eg: <TextNoWrapCol span={2} showItem={item.thick}  />
 * 
 * */ 
export default class extends React.Component{

	render(){
        const { span,showItem,placement }=this.props
		return(
			<Col span={span}>
                <Tooltip arrowPointAtCenter
                    placement={placement?placement:'top'}
                    title={showItem} >
                    <div className='textNowrap'>{showItem}</div >
                </Tooltip>
            </Col>
		)
	}
}

