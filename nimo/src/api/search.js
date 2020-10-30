// 搜索模块
import request from '@/utils/request'

// 获取搜索联想建议
// get传参，只有一个参数
export const getSuggestion = q => {
    return request({
        method: "GET",
        url: '/suggestion',
        params: {
            q
        }
    })
}
// 获取搜索结果
//
export const getResults = q => {
    return request({
        method: "GET",
        url: '/searchresult',
        params: {
            q
        }
    })
}