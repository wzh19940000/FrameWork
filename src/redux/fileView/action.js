import type from './type'
import axios from 'axios'
import { message } from 'antd'

export default {
    preview: (uid, fileName) => async dispatch => {
        dispatch({
            type: type.showFileView
        })
        // 预览文件默认url
        const res = await axios.get(`/files/view/${uid}`, {
            responseType: 'arraybuffer'
        })
        if (!res.data || res.data.byteLength === 0) {
            return message.error('文件不存在')
        }
        const blob = new Blob([res.data], { type: 'application/pdf' })
        const url = window.URL.createObjectURL(blob)
        let fileType = fileName.match(/\.(\w+)$/)[1].toLowerCase()
        if (['jpg', 'png', 'jpeg', 'gif', 'svg'].includes(fileType)) {
            fileType = 'IMG'
        } else if (['pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt'].includes(fileType)) {
            fileType = 'PDF'
        }
        dispatch({
            type: type.changeFileView,
            fileType,
            url
        })
    },
    resetFileView: () => dispatch => dispatch({
        type: type.reset
    })
}