//初始化dayjs的相关配置
import dayjs from 'dayjs.js'

// 配置中文语言包
import 'dayjs/locale/zh-cn'
// 全局使用
dayjs.locale('zh-cn')
// 日期事件格式化
dayjs().format('YYYY-MM-DD')