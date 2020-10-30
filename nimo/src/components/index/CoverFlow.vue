<template>
  <div>
    <div class="top">
      <h2>现在开始出发，旅游从心开始</h2>
      <h4>秋冬好季，优惠不断</h4>
    </div>
    <!-- 标签页开始 -->
    <van-tabs class="city-tabs" type="line" v-model="active">
      <van-tab
        :title="cityCount.pname"
        v-for="cityCount in cityCount"
        :key="cityCount.id"
      >
        <!-- 城市对应的房间列表 -->
        <!-- 在子组件上声明一个自定义属性绑定父组件的值 -->
        <cityList :cityCount="cityCount"></cityList>
      </van-tab>
    </van-tabs>

    <!-- 标签页结束 -->
  </div>
</template>

<script>
import { getCityCount } from "@/api/city";
import cityList from "./city-list";
export default {
  components: {
    cityList,
  },
  data() {
    return {
      active: 0,
      // 接收标签页的的城市信息
      cityCount: [],
      // 控制编辑频道
      isCityshow: false,
    };
  },
  created() {
    // 加载页面
    this.loadCityCount();
  },

  methods: {
    async loadCityCount() {
      const { data } = await getCityCount();
      this.cityCount = data.results;
    },
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

.city-tabs >>> .van-tab {
  width: 80px;
  border-right: 1px solid #edeff3;
  border-bottom: 1px solid #edeff3;
}
.city-tabs >>> .van-tabs__line {
  width: 90px;
  background: #00848a !important;
}
</style>