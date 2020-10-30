<template>
  <div>
    <div class="top">
      <h2>旅途打卡，成就好时光</h2>
      <h4>高品质生活,从nimo开始</h4>
    </div>
    <div class="example-3d">
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide v-for="(item, index) of cityOption" :key="index">
          <!-- 图片要实现动态加载 引用require -->
          <img :src="require('../../assets/images/' + item.c_url)" alt="" />
          <div class="intro">
            <h3>{{ item.cname }}</h3>
            <p class="price">{{ item.cintro }}</p>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
export default {
  name: "swiper-example-3d-cube",
  title: "3D Cube effect",
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
      swiperOption: {
        effect: "cube",
        grabCursor: true,
        cubeEffect: {
          // 开启投影
          shadow: true,
          // 开启slide阴影
          slideShadows: true,
          // 投影距离，单位px
          shadowOffset: 20,
          // 投影缩放比例
          shadowScale: 0.94,
        },
        loop: true,
        autoplay: true,
      },
      // 保存从服务器端请求回来的城市数据
      cityOption: [],
    };
  },
  mounted() {
    // 发送客户端请求
    this.axios.get("/cube").then((res) => {
      //接收服务器返回数据并且赋值给属性cityOption
      this.cityOption = res.data.results;
    });
  },
};
</script>

<style  scoped>
.top {
  margin: 5px 20px;
}
.top h2 {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
}
.example-3d {
  overflow: hidden;
  height: 360px;
  padding: 15px;
}
.swiper {
  width: 100% !important;
  height: 320px;
}
.swiper-slide {
  overflow: hidden;
  position: relative;
}

.swiper-slide img {
  width: 100%;
  height: 100%;
}
.swiper-slide .intro {
  position: absolute;
  width: 100%;
  height: 30%;
  bottom: 0;
  left: 0;
  text-align: center;
  color: #fff;
  font-size: 22px;
}
.swiper-slide h3 {
  margin-top: 24px;
}
.swiper-slide .price {
  width: 300px;
  height: 30px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  line-height: 30px;
  background-color: #000;
  opacity: 0.6;
  text-align: center;
  font-size: 16px;
}
</style>