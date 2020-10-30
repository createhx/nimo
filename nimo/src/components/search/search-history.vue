<template>
  <div>
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <!-- 子组件不能直接赋值props里的属性，所以要给父组件定义一个函数 -->
        <span @click="$emit('update-history', [])">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <!-- 删除小图标 -->
      <van-icon v-else name="delete" @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      @click="onDelete(history, index)"
      :title="history"
      v-for="(history, index) of searchhistories"
      :key="index"
    >
      <van-icon name="close" v-show="isDeleteShow" />
    </van-cell>
  </div>
</template>

<script>
import { setItem } from "@/utils/storage";
export default {
  props: {
    searchhistories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isDeleteShow: false,
    };
  },
  methods: {
    onDelete(history, index) {
      // 如果时删除的状态，执行删除操作
      if (this.isDeleteShow) {
        this.searchhistories.splice(index, 1);
        // 把删除过的历史数组，储存在本地
        // return 结束执行
        return setItem("searchHistory", this.searchhistories);
      }
      // 非删除状态
      this.$emit("search", history);
    },
  },
};
</script>

<style>
</style>