<template>
  <div>
    <!-- 头部开始 -->
    <van-nav-bar
      class="app-nav-bar"
      title="房间详情"
      left-arrow
      @click-left="$router.back()"
    >
    </van-nav-bar>
    <!-- 头部结束 -->

    <!-- 轮播查看图片 -->
    <div class="room_wrap">
      <div class="thumb-example">
        <!-- swiper1 -->
        <swiper
          class="swiper gallery-top"
          :options="swiperOptionTop"
          ref="swiperTop"
        >
          <swiper-slide class="slide-1"></swiper-slide>
          <swiper-slide class="slide-2"></swiper-slide>
          <swiper-slide class="slide-3"></swiper-slide>
          <swiper-slide class="slide-4"></swiper-slide>
          <swiper-slide class="slide-5"></swiper-slide>
          <div
            class="swiper-button-next swiper-button-white"
            slot="button-next"
          ></div>
          <div
            class="swiper-button-prev swiper-button-white"
            slot="button-prev"
          ></div>
        </swiper>
        <!-- swiper2 Thumbs -->
        <swiper
          class="swiper gallery-thumbs"
          :options="swiperOptionThumbs"
          ref="swiperThumbs"
        >
          <swiper-slide class="slide-1"></swiper-slide>
          <swiper-slide class="slide-2"></swiper-slide>
          <swiper-slide class="slide-3"></swiper-slide>
          <swiper-slide class="slide-4"></swiper-slide>
          <swiper-slide class="slide-5"></swiper-slide>
        </swiper>
      </div>

      <!-- 轮播查看图片结束 -->
      <!-- 评论区 -->
      <CommentList />
    </div>
    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        @click="isPostShow = true"
        class="comment-btn"
        type="default"
        round
        size="small"
        >写评论
      </van-button>
      <van-icon name="comment-o" color="#777" />
      <van-icon
        :color="isStart ? 'orange' : '#777'"
        :name="isStart ? 'star ' : 'star-o'"
        @click="onStart"
      />
      <van-icon
        :color="isGood ? 'orange' : '#777'"
        :name="isGood ? 'good-job' : 'good-job-o'"
        @click="onGood"
      />
      <van-icon name="share" color="#777777"></van-icon>
    </div>

    <!-- 发表评论 -->
    <van-popup v-model="isPostShow" position="bottom">
      <div class="post-comment">
        <van-field
          v-model.trim="message"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="请输入留言"
          show-word-limit
        />
        <van-button size="small" @click="onPost" :disabled="!message"
          >发布</van-button
        >
      </div>
    </van-popup>
  </div>
</template>

<script>
// 在组件中动态获取路由参数
// 1.this.$route.params
// 2.props传参
import { Toast } from "vant";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import CommentList from "@/components/details/comment-list";
import { getUserState } from "@/api/user";
export default {
  props: {
    roomid: {
      type: String,
      required: true,
    },
  },

  components: {
    swiper,
    swiperSlide,
    CommentList,
  },
  // 父组件向子组件传值
  provide() {
    return {
      details: this,
    };
  },
  data() {
    return {
      swiperOptionTop: {
        loop: true,
        loopedSlides: 5, // looped slides should be the same
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      swiperOptionThumbs: {
        loop: true,
        loopedSlides: 5, // looped slides should be the same
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: "auto",
        touchRatio: 0.2,
        slideToClickedSlide: true,
      },
      //是否收藏的状态标识
      isStart: false,
      isGood: false,
      // 弹出层状态
      isPostShow: false,
      // 评论内容
      message: "",
      isClick: 0,
    };
  },
  mounted() {
    this.$nextTick(() => {
      const swiperTop = this.$refs["swiperTop"].swiper;
      const swiperThumbs = this.$refs["swiperThumbs"].swiper;
      swiperTop.controller.control = swiperThumbs;
      swiperThumbs.controller.control = swiperTop;
    });
  },
  methods: {
    onStart() {
      if (this.isStart == true) {
        this.isStart = false;
        Toast.success({
          message: "取消收藏成功",
        });
      } else {
        this.isStart = true;
        Toast.success({
          message: "收藏成功",
        });
      }
    },

    onGood() {
      if (this.isGood == true) {
        this.isGood = false;
        Toast.success({
          message: "取消点赞成功",
        });
      } else {
        this.isGood = true;
        Toast.success({
          message: "点赞成功",
        });
      }
    },

    onPost() {
      Toast.loading({
        message: "发布中",
        forbidClick: true, // 禁止背景点击
      });
      // console.log(this.message);
      Toast.success("发布成功");
      // 发布成功，清空文本框内容
      this.message = "";
      this.isClick++;
    },
  },
};
</script>

<style  scoped>
.room_wrap {
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 44px;
  overflow-y: auto;
}
.thumb-example {
  height: 380px;
  background-color: black;
}

.swiper-slide {
  background-size: cover;
  background-position: center;
}
.slide-1 {
  background-image: url("../assets/images/detail/rec01.jpg");
}
.slide-2 {
  background-image: url("../assets/images/detail/rec02.jpg");
}
.slide-3 {
  background-image: url("../assets/images/detail/rec04.jpg");
}
.slide-4 {
  background-image: url("../assets/images/detail/rec05.jpg");
}
.slide-5 {
  background-image: url("../assets/images/detail/rec06.jpg");
}

.gallery-top {
  height: 70%;
  width: 100%;
}
.gallery-thumbs {
  height: 30%;
  box-sizing: border-box;
  padding: 10px 0;
}
.gallery-thumbs .swiper-slide {
  width: 25%;
  height: 100%;
  opacity: 0.4;
}
.gallery-thumbs .swiper-slide-active {
  opacity: 1;
}

.article-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  height: 44px;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
}
.article-bottom .comment-btn {
  width: 141px;
  height: 23px;
  border: 1px solid #eeeeee;
  font-size: 15px;
  line-height: 23px;
  color: #a7a7a7;
}
.van-icon {
  font-size: 20px;
}
.van-info {
  font-size: 11px;
  background-color: #e22829;
}

.post-comment {
  padding: 14px;
  display: flex;
  align-items: center;
}
</style>