<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) of list"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getResults } from "@/api/search";

export default {
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
    };
  },
  methods: {
    async onLoad() {
      const { data } = await getResults(this.searchText);
      this.list.push(...data.results);
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.search-result {
  position: fixed;
  left: 0;
  right: 0;
  top: 54px;
  bottom: 0;
  /* 出现滚动条 */
  overflow-y: auto;
}
</style>