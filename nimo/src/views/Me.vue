<template>
  <div class="me-container">
    <van-cell-group v-if="user" class="my-info">
      <van-cell
        class="base-info"
        title="单元格"
        value="内容"
        center
        :border="false"
      >
        <van-image
          class="avatar"
          slot="icon"
          round
          fit="cover"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <div class="nickname" slot="title">昵称</div>
        <van-button class="update-btn" size="small" round>编辑资料</van-button>
      </van-cell>
      <van-grid class="data-info" :border="false">
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{ currentUser.fans_count }}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{ currentUser.follow_count }}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{ currentUser.like_count }}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{ currentUser.grade_count }}</div>
            <div class="text">等级</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <!-- 未登录页面开始 -->
    <div v-else class="not-login">
      <img
        @click="$router.push('/login')"
        class="mobile"
        style="width: 64px; height: 64px; margin-bottom: 5px"
        src="../assets/user.png"
        alt=""
      />
      <div class="text">登录 / 注册</div>
    </div>
    <!-- 未登录页面结束 -->

    <van-grid :column-num="2" class="nav-grid mb-4">
      <van-grid-item icon="star-o" text="文字" class="nav-grid-item" />
      <van-grid-item
        icon="browsing-history-o"
        text="文字"
        class="nav-grid-item"
      />
    </van-grid>

    <van-cell icon="browsing-history-o" title="最近浏览" is-link to="" />
    <van-cell title="待评价" is-link to="" />
    <van-cell title="订单" is-link to="" />
    <van-cell title="联系客服" is-link to="" />
    <van-cell class="mb-4" title="官方认证" is-link to="" />
    <van-cell
      @click="onLogout"
      v-if="user"
      class="logout-cell"
      title="退出登录"
      to=""
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      // 接收登录用户信息
      currentUser: {},
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    onLogout() {
      // 提示用户确认退出
      this.$dialog
        .confirm({
          title: "退出提示",
          message: "确认要退出登录吗",
        })
        .then(() => {
          // on confirm，清除用户登录状态
          this.$store.commit("setUser", null);
        })
        .catch(() => {
          // on cancel
        });
    },

    current() {
      this.currentUser = this.user.results;
    },
  },
  mounted() {
    this.current();
  },
};
</script>

<style scoped>
.my-info {
  background-color: #00848a;
}
.base-info {
  height: 115px;
  box-sizing: border-box;
  padding-bottom: 11px;
  padding-top: 38px;
  background-color: unset;
}
.not-login {
  height: 180px;
  background-color: #00848a;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.text {
  color: #fff;
  font-size: 14px;
}
.avatar {
  width: 66px;
  height: 66px;
  border: 1px solid #fff;
  margin-right: 11px;
  box-sizing: border-box;
}
.nickname {
  font-size: 15px;
  color: #fff;
}
.update-btn {
  height: 16px;
  font-size: 10px;
  color: #666666;
}
.data-info-item {
  height: 65px;
  color: #fff;
}
.text-wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.count {
  font-size: 18px;
}
.text {
  font-size: 11px;
}
.nav-grid-item {
  height: 70px;
}
.nav-grid >>> .van-icon {
  font-size: 22px;
  /* color: #eb5253; */
  color: #00848a;
}
.van-grid-item__text {
  font-size: 14px;
  color: #333333;
}
.my-info >>> .van-grid-item__content {
  background-color: unset;
}
.logout-cell {
  text-align: center;
  color: #d86262;
  margin-bottom: 50px;
}
.mb-4 {
  margin-bottom: 4px;
}
</style>