<template>
  <div class="home">
    <van-pull-refresh
      v-model="refreshLoading"
      @refresh="onRefresh"
      :success-text="successText"
      :success-duration="1500"
    >
      <!-- 轮播图+搜索开始 -->
      <Header></Header>
      <!-- 轮播图+搜索结束 -->
      <!-- 预览开始 -->
      <Cube></Cube>
      <!-- 预览结束 -->
      <!-- hot_city开始 -->

      <CoverFlow></CoverFlow>
      <!-- hot_city结束 -->
    </van-pull-refresh>
  </div>
</template>
<style  scoped>
</style>
<script>
import Header from "../components/index/Header.vue";
import Cube from "../components/index/Cube.vue";
import CoverFlow from "../components/index/CoverFlow.vue";
export default {
  components: {
    Header: Header,
    Cube: Cube,
    CoverFlow: CoverFlow,
  },

  data() {
    return {
      // 下拉刷新
      refreshLoading: false,
      successText: "",
    };
  },

  methods: {
    // 只要上拉刷新，refreshLoading会自动变成true
    onRefresh() {
      console.log("onRefresh");
      this.refreshLoading = false;
      this.successText = "刷新成功";
    },
  },
};
</script>

