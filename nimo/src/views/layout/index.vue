<template>
  <div class="lauout-container">
    <!-- 子路由出口 -->
    <router-view />
    <!-- 底部导航栏开始 -->
    <!-- 开启路由模式 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="wap-home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="like-o" to="/love">喜欢</van-tabbar-item>
      <van-tabbar-item icon="chat-o" to="/message">消息</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/me">我的</van-tabbar-item>
    </van-tabbar>
    <!-- 底部导航栏结束 -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
};
</script>