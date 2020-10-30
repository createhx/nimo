<template>
  <div class="searc-container">
    <!-- 搜索栏开始
      1.在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮
     -->
    <form action="/">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-actioness
        @search="onSearch(searchText)"
        @cancel="$router.push('/')"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索栏结束 -->

    <!-- 搜索结果开始 -->
    <SearchResult :searchText="searchText" v-if="isResultShow" />
    <!-- 搜索结果结束 -->

    <!-- 联想建议开始 -->
    <!-- @search="onSearch"子组件调用父组件自定义的函数 -->
    <SearchSuggestion
      v-else-if="searchText"
      :searchText="searchText"
      @search="onSearch"
    />
    <!-- 联想建议结束 -->

    <!-- 历史记录开始 -->
    <!-- $evevt是事件参数 -->
    <SearchHistory
      :searchhistories="histories"
      v-else
      @search="onSearch"
      @update-history="histories = $event"
    />
    <!-- 历史记录结束 -->
  </div>
</template>

<script>
import SearchSuggestion from "@/components/search/search-suggestion";
import SearchHistory from "@/components/search/search-history";
import SearchResult from "@/components/search/search-result";
import { setItem, getItem } from "@/utils/storage";
export default {
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResult,
  },
  data() {
    return {
      // 输入框的内容
      searchText: "",
      //   控制搜索结果的状态
      isResultShow: false,
      //   搜索历史记录
      histories: getItem("searchHistory") || [],
    };
  },

  methods: {
    onSearch(searchText) {
      // 把输入框设置为你要搜索的文本
      //   点击联想，也能进行搜索
      this.searchText = searchText;
      // 记录搜索历史
      //   数组去重，历史记录不可以重复
      const index = this.histories.indexOf(searchText);
      //   找的到，说明数组之前就已经存在记录
      if (index !== -1) {
        //   去除重复项
        this.histories.splice(index, 1);
      }
      //   最新的搜素记录排在最前面
      this.histories.unshift(searchText);
      //   历史记录持久化
      setItem("searchHistory", this.histories);
      this.isResultShow = true;
    },
  },

  watch: {
    //   监听histories的变化，只要发生变化，就持久化重置
    histories() {
      setItem("searchHistory", this.histories);
    },
  },
};
</script>