<template>
  <div class="login-container">
    <van-nav-bar
      class="app-nav-bar"
      title="注册 / 登录"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 登录表单开始 -->
    <!-- 
      1.在表单中，每个 Field 组件 代表一个表单项，
         使用 Field 的 rules 属性定义校验规则
      2.使用vant-form包裹field
      3.给表单绑定submit事件，提交时触发
      4.failed提交表单且验证不通过后触发
     -->
    <!-- 
       1.show-error 	是否在校验不通过时标红输入框
       2.show-error-message 	是否在校验不通过时在输入框下方展示错误提示
       3.validate-first	是否在某一项校验不通过时停止校验
       4.通过 ref 可以获取到 Form 实例并调用实例方法
      -->
    <van-form
      :show-error="false"
      :show-error-message="false"
      :validate-first="true"
      ref="login-form"
      @submit="onLogin"
      @failed="onFailed"
    >
      <!-- 
        通过 left-icon 和 right-icon 配置输入框两侧的图标，
        通过设置 clearable 在输入过程中展示清除图标 
      -->
      <van-field
        v-model="user.mobile"
        left-icon="phone-o"
        placeholder="请输入手机号"
        label="手机号"
        name="mobile"
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        clearable
        left-icon="envelop-o"
        placeholder="请输入验证码"
        label="短信验证码"
        name="code"
        :rules="formRules.code"
      >
        <!-- 通过 button 插槽可以在输入框尾部插入按钮 -->
        <!-- .prevent阻止表单的默认行为 -->
        <template #button>
          <van-count-down
            :time="1000 * 60"
            format=" ss s"
            v-if="countDownIsShow"
            @finish="countDownIsShow = false"
          />
          <van-button
            v-else
            class="send-btn"
            size="small"
            round
            @click.prevent="onSendSms"
            :loading="isSendSmsLoading"
          >
            发送验证码
          </van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button type="info" class="login-btn" block> 登录 </van-button>
      </div>
    </van-form>
    <!-- 登录表单结束 -->
  </div>
</template>
<script>
import { login } from "@/api/user";
import { Toast } from "vant";
import qs from "qs";
export default {
  data() {
    return {
      user: {
        mobile: "", //手机号
        code: "", //验证码
      },
      // 验证规则
      formRules: {
        // required	是否为必选字段
        mobile: [
          { required: true, message: "请填写手机号" },
          // pattern 	通过正则表达式进行校验
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: "手机号格式不正确" },
        ],
        code: [
          { required: true, message: "请填写验证码" },
          { pattern: /^\d{6}$/, message: "验证码格式不正确" },
        ],
      },
      // 控制显示倒计时和验证码的开关
      countDownIsShow: false,
      // 控制显示验证码按钮加载
      isSendSmsLoading: false,
    };
  },

  methods: {
    // 登录api
    async onLogin() {
      // 使用 Toast.loading 方法展示加载提示，通过 forbidClick 属性可以禁用背景点击
      Toast.loading({
        message: "登陆中...",
        forbidClick: true,
        duration: 0, // 值为0 时，持续展示 toast
      });
      // 1.找到数据接口
      // 2.封装请求方法
      // 3.请求调用登录
      try {
        // 要对传递过来的对象进行处理moblie=122222&code=123456
        const res = await login(qs.stringify(this.user));
        // 4.处理响应结果
        console.log(res);
        if (res.data.code == 201) {
          Toast.success("登录成功");
          // 将后台响应的数据储蓄到vuex容器中
          this.$store.commit("setUser", res.data);
          // 登录成功跳转到上一个页面
          this.$router.back();
        } else {
          Toast.fail("登录失败，手机或者验证码错误");
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 验证失败，触发
    onFailed(err) {
      // console.log(err);
      if (err.errors[0]) {
        Toast({
          message: err.errors[0].message,
          position: "top",
        });
      }
      if (err.errors[1]) {
        Toast({
          message: err.errors[1].message,
          position: "top",
        });
      }
    },

    async onSendSms() {
      // console.log("1111");
      // validate	验证表单，支持传入name来验证单个表单项,refs组件里的
      try {
        const validateRes = await this.$refs["login-form"].validate("mobile");
        // console.log(validateRes);
        // 防止网络慢的情况下，用户触发多次发送验证码请求
        this.isSendSmsLoading = true;
        this.countDownIsShow = true;
      } catch (err) {
        Toast({
          message: err.message,
          position: "top",
        });
      }
      // 验证手机号
      // 验证通过，发送验证码
      // 隐藏发送按钮，开始倒计时
      // 隐藏倒计时，显示发送按钮
      this.isSendSmsLoading = false;
    },
  },
};
</script>

<style scoped>
.send-btn {
  background-color: #ededed;
}
.login-btn-wrap {
  padding: 26px 16px;
}
.login-btn {
  background-color: #00848a;
  /* 默认样式有边框 */
  border: none;
}
.login-btn-wrap .van-button__text {
  font-size: 15px;
}
</style>