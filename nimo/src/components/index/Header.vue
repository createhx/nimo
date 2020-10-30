<template>
  <div class="header">
    <!-- 轮播图开始 -->
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide class="slide-1">
        <div class="swiper-text">
          <p>热情四川</p>
          <p>打卡照片里的小巷</p>
        </div>
      </swiper-slide>
      <swiper-slide class="slide-2">
        <div class="swiper-text">
          <p>精致上海</p>
          <p>领取精属房源专属券</p>
        </div>
      </swiper-slide>
      <swiper-slide class="slide-3">
        <div class="swiper-text">
          <p>绝美南京</p>
          <p>南京公路自驾游</p>
        </div>
      </swiper-slide>
    </swiper>
    <!-- 轮播图结束 -->

    <!-- 搜索部分开始 -->
    <div class="search">
      <div class="wrapper">
        <!-- 定位地点 -->
        <div class="location">
          <div class="location_choosed">
            <span>武汉</span>
          </div>
          <div class="position">
            <img src="../../assets/images/position.png" alt="" />
            <span>查看定位</span>
          </div>
        </div>
        <!-- 时间 -->
        <div class="data" @click="selectDate">
          <!-- 入住时间 -->
          <div class="room_into">
            <span>{{ startDate }}</span>
            <span>入住</span>
          </div>
          <!-- 入住天数 -->
          <div class="room_days">
            <span>{{ roomDays }}晚</span>
          </div>
          <!-- 退房时间 -->
          <div class="room_out">
            <span>{{ endDate }}</span>
            <span>退房</span>
          </div>
        </div>
        <!-- 我的附近 -->
        <div>
          <van-button
            slot="title"
            class="button"
            icon="search"
            type="default"
            size="large"
            round
            to="/search"
          >
            输入酒店名/地点/关键词
          </van-button>
        </div>
        <!-- 按钮查找 -->
      </div>
    </div>
    <calendar
      :minDate="minDate"
      :show.sync="show"
      :defaultDate="defaultDate"
      mode="during"
      @change="onChange"
    />
    <!-- 搜索部分结束 -->
  </div>
</template>

<style  scoped>
.header {
  position: relative;
}
.swiper {
  height: 200px;
  width: 100%;
  /* position: absolute; */
}
.swiper-slide {
  /* display: flex; */
  position: relative;
  /* background-color: white; */
}
.slide-1 {
  background: url("../../assets/images/city_cd_big.jpg"), no-repeat;
  background-size: 100% 100%;
}
.slide-2 {
  background: url("../../assets/images/city_sh.jpg"), no-repeat;
  background-size: 100% 100%;
}
.slide-3 {
  background: url("../../assets/images/city_nj.jpg"), no-repeat;
  background-size: 100% 100%;
}

.swiper-text {
  position: absolute;
  color: #fff;
  top: 125px;
  left: 25px;
}
p:first-child {
  font-size: 16px;
  padding-bottom: 5px;
}
p:last-child {
  font-size: 22px;
}
/* 搜索部分 */
.search {
  width: 82%;
  margin: 0px auto;
  margin-bottom: 20px;
  background-color: #fff;
  box-shadow: 0px 5px 15px 0px #ddd;
  border-radius: 5px;
  padding: 15px;
  color: #333;
  font-size: 16px;
}
/* 定位部分 */
.wrapper {
  width: 100%;
  margin: 0 auto;
}
.location {
  display: flex;
  /* 主轴排列方式 */
  justify-content: space-between;
  /* 侧轴排列方式 */
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 1px solid #ebebeb;
}
.location_choosed {
  line-height: 20px;
}
/* 时间部分 */
.data {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* color: #333; */
  /* font-size: 16px; */
  padding: 15px 0 15px 0;
  border-bottom: 1px solid #ebebeb;
}
.room_into span:last-child,
.room_out span:last-child {
  font-size: 12px;
}
/* 我的附近部分 */
.input {
  display: block;
  width: 100%;
  height: 44px;
  font-size: 16px;
  color: #999;
  line-height: 44px;
  border: 0;
  border-bottom: 1px solid #ebebeb;
}
/* 按钮部分 */
.button {
  margin: 15px 0 15px 0;
  background-color: pink;
  border-radius: 5px;
  font-size: 16px;
}
</style>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import Autoplay from "../Autoplay.vue";
import dayjs from "dayjs";
export default {
  name: "swiper-example-autoplay",
  title: "Autoplay",
  components: {
    swiper,
    swiperSlide,
    Autoplay,
  },
  data() {
    return {
      swiperOption: {
        // 滑块的间距
        // spaceBetween: 30,
        loop: true,
        centeredSlides: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        speed: 2000,
        // 开启反向自动轮播
        reverseDirection: true,
      },
      minDate: new Date(), //设置过期时间为当天
      show: false,
      date: [],
      startDate: "",
      endDate: "",
      roomDays: 1,
      defaultDate: ["2019-07-02", "2019-07-05"],
    };
  },
  methods: {
    selectDate() {
      this.show = true;
      this.defaultDate = [];
      this.date = [];
    },
    onChange(date) {
      this.date = date;
      this.startDate = date[0].$y + "/" + (date[0].$M + 1) + "/" + date[0].$D;

      if (this.date.length != 1) {
        this.endDate =
          this.date[1].$y + "/" + (this.date[1].$M + 1) + "/" + this.date[1].$D;
        console.log(this.endDate);
        this.roomDays = this.date[1].$D - this.date[0].$D;
      }
    },
  },
  mounted() {
    let d = new Date();
    this.startDate =
      d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
    this.endDate =
      d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + (d.getDate() + 1);
  },
};
</script> 