//用户相关请求模块
import request from '@/utils/request'
export const login = data => {
    // return的还是一个axios对象
    return request({
        method: 'POST',
        url: '/login',
        // 请求体
        data
    })
}
