<template>
  <div>
    <van-cell icon="search" v-for="(val, index) of suggestions" :key="index">
      <!-- 高亮搜索词 -->
      <div slot="title" v-html="highlight(val.title)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestion } from "@/api/search";
import { debounce } from "loadsh";
export default {
  props: {
    //   输入框的值
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      suggestions: [],
    };
  },
  watch: {
    //   输入第一个不会监听
    // searchText() {
    //   console.log("hello");
    // },
    searchText: {
      // 当监听的数据发生变化，会执行handler处理函数
      //   debounce函数防抖
      handler: debounce(async function () {
        const { data } = await getSuggestion(this.searchText);
        this.suggestions = data.results;
      }, 200),

      //  监听开始后，立即调用
      immediate: true,
    },
  },
  methods: {
    highlight(str) {
      return str.replace(
        new RegExp(this.searchText, "gi"),
        `<span style="color:red;">${this.searchText}</span>`
      );
    },
  },
};
</script>

<style>
</style>