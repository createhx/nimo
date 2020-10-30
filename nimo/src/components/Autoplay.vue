<template>
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
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
export default {
  name: "swiper-example-autoplay",
  title: "Autoplay",
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
      swiperOption: {
        loop: true,
        centeredSlides: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        speed: 800,
        // 开启反向自动轮播
        reverseDirection: true,
      },
    };
  },
};
</script>
<style  scoped>
.swiper {
  height: 200px;
  width: 100%;
  position: absolute;
}
.swiper-slide {
  display: flex;
  position: relative;
  background-color: white;
}
.slide-1 {
  background: url("../assets/images/city_cd_big.jpg"), no-repeat;
  background-size: 100% 100%;
}
.slide-2 {
  background: url("../assets/images/city_sh.jpg"), no-repeat;
  background-size: 100% 100%;
}
.slide-3 {
  background: url("../assets/images/city_nj.jpg"), no-repeat;
  background-size: 100% 100%;
}

.swiper-text {
  position: absolute;
  color: #fff;
  top: 82px;
  left: 25px;
}
p:first-child {
  font-size: 16px;
  padding-bottom: 5px;
}
p:last-child {
  font-size: 22px;
}
</style>