<template>
  <div>
    <!-- {{ cityCount.pname }} -->
    <div class="example-3d">
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide v-for="(item, index) of roomOption" :key="index">
          <img
            :src="require('../../assets/images/inhome/homeimg/' + item.pic)"
            alt=""
            @click="$router.push(`/details/:${item.house_id}`)"
          />
          <div
            class="room-text"
            @click="$router.push(`/details/:${item.house_id}`)"
          >
            <h5>{{ item.title }}</h5>
            <div class="subject">
              {{ item.subtitle }}
            </div>
            <p>
              <span class="new-price" style="color: rgb(72, 72, 72)"
                >￥{{ item.price }}</span
              >
              <span class="old-price"
                ><del> ￥{{ item.oldPrices }}</del></span
              >
              <span> 每晚</span>
            </p>
            <div style="display: inline-block">
              <span class="star-number"></span>
              <span class="value-number">{{ item.evaluate }}</span>
              <span class="host" style="color: rgb(72, 72, 72)">
                <span aria-hidden="true"> · </span>
                超赞房东
              </span>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { getCityRoom } from "@/api/city";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
export default {
  name: "swiper-example-3d-coverflow",
  title: "3D Coverflow effect",
  components: {
    swiper,
    swiperSlide,
  },
  // 在子组件的props属性中，接收父组件传递的自定义属性
  props: {
    cityCount: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      swiperOption: {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        },
      },
      // 接收服务器端返回的房间信息
      roomOption: [],
    };
  },

  methods: {
    async loadCityRoom() {
      const { data } = await getCityRoom({
        //  对应的城市id
        house_id: this.cityCount.pid,
      });
      // 把所有房间信息都放进一个数组，这样已经查看过的面板，再次查看时不需要向服务器发送请求了
      this.roomOption.push(...data.results);
    },
  },
  created() {
    this.loadCityRoom();
  },
};
</script>

<style scoped>
.example-3d {
  width: 100%;
  height: 400px;
  padding-top: 20px;
  padding-bottom: 50px;
}
.swiper {
  height: 100%;
  width: 100%;
}
.swiper-slide {
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 400px;
}
.swiper-slide img {
  width: 100%;
  height: 60%;
  border-radius: 5px;
}
.room-text h5 {
  color: rgb(57, 87, 106);
  font-size: 12px;
  font-weight: bold;
  margin: 10px 0;
}
.room-text .subject {
  color: rgb(72, 72, 72);
  margin: 0px !important;
  word-wrap: break-word !important;
  font-family: Circular, PingFang-SC, "Hiragino Sans GB", 微软雅黑,
    "Microsoft YaHei", "Heiti SC" !important;
  vertical-align: middle !important;
  font-size: 16px !important;
  line-height: 1.375em !important;
  font-weight: 800 !important;
}
.new-price {
  margin: 0px !important;
  font-family: Circular, PingFang-SC, "Hiragino Sans GB", 微软雅黑,
    "Microsoft YaHei", "Heiti SC" !important;
  vertical-align: middle !important;
  font-size: 18px !important;
  line-height: 1.44444em !important;
  font-weight: 600 !important;
}
.old-price {
  margin-left: 5px !important;
  font-size: 14px !important;
  line-height: 18px !important;
  text-decoration: line-through !important;
  color: #484848 !important;
}
.star-number {
  height: 9px !important;
  width: 50px !important;
  display: inline-block !important;
  background-size: auto 9px !important;
  background-repeat: no-repeat !important;
  background-image: url(https://z1.muscache.cn/airbnb/static/packages/star_2x.75f8074a.png) !important;
  background-position: left center !important;
}
.value-number {
  font-family: Circular, PingFang-SC, "Hiragino Sans GB", 微软雅黑,
    "Microsoft YaHei", "Heiti SC" !important;
  display: inline-block !important;
  font-weight: 600 !important;
  color: #484848 !important;
  font-size: 12px !important;
  line-height: 22px !important;
  height: 22px !important;
  margin: 0px !important;
  margin-left: 2px !important;
}
.host {
  margin: 0px !important;
  word-wrap: break-word !important;
  font-family: Circular, PingFang-SC, "Hiragino Sans GB", 微软雅黑,
    "Microsoft YaHei", "Heiti SC" !important;
  vertical-align: middle !important;
  font-size: 12px !important;
  line-height: 1.33333em !important;
  font-weight: 600 !important;
}
</style>