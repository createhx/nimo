// 城市相关模块
import request from '@/utils/request'

// 获取用户城市房间数量信息(推荐房源)
export const getCityCount = () => {
    return request({
        method: "GET",
        url: "/citycount"
    })
}

// 获取城市相对应的房间信息
// 传参
export const getCityRoom = params => {
    return request({
        method: 'GET',
        url: '/recommend',
        params
    })
}