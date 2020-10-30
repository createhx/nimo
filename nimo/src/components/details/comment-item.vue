<template>
  <div>
    <van-cell
      class="comment-item"
      v-for="(comment, index) of comments"
      :key="index"
    >
      <van-image
        class="avatar"
        slot="icon"
        width="36"
        height="36"
        round
        fit="cover"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      <div slot="title">
        <div class="title-wrap">
          <div class="name">{{ comment.name }}</div>
          <div class="like-wrap">
            <van-icon
              class="like-icon"
              :color="comment.isGood ? 'orange' : '#777'"
              :name="comment.isGood ? 'good-job' : 'good-job-o'"
              @click="onGood(index)"
            ></van-icon>
            <span class="like-count">{{ comment.like_count }}</span>
          </div>
        </div>

        <div class="content">{{ comment.content }}</div>
        <div>
          <span class="time">{{ comment.time }} </span>
          <van-button class="reply-btn" round size="mini"
            >{{ comment.reply_count }}回复</van-button
          >
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
import { debounce } from "loadsh";
export default {
  // 子组件接收父组件的传值
  inject: ["details"],
  data() {
    return {
      comments: [
        {
          name: "南风知我意",
          like_count: 12,
          content: "这个房间很不错，挺大的",
          time: "2020-05-23",
          reply_count: 18,
          isGood: false,
        },
        {
          name: "南风知我意",
          like_count: 12,
          content: "这个房间很不错，挺大的",
          time: "2020-05-23",
          reply_count: 18,
          isGood: false,
        },
        {
          name: "南风知我意",
          like_count: 12,
          content: "这个房间很不错，挺大的",
          time: "2020-05-23",
          reply_count: 18,
          isGood: false,
        },
      ],
      isclick_two: this.details.isClick,
    };
  },
  methods: {
    onGood(index) {
      if (this.comments[index].isGood == true) {
        this.comments[index].isGood = false;
        this.comments[index].like_count--;
        this.$toast({
          message: "取消点赞成功",
        });
      } else {
        this.comments[index].isGood = true;
        this.comments[index].like_count++;
        this.$toast({
          message: "点赞成功",
        });
      }
      console.log(this.isclick_two);
    },
  },

  watch: {
    isclick_two() {
      let arr = [
        {
          name: "南风知我意",
          like_count: 12,
          content: "",
          time: "2020-05-23",
          reply_count: 18,
          isGood: false,
        },
      ];
      arr.content = this.details.message;
      this.comments.unshift(...arr);
    },
  },
};
</script>

<style>
.avatar {
  width: 36px;
  height: 36px;
  margin-right: 13px;
}
.name {
  font-size: 14px;
  color: #406599;
}
.content {
  font-size: 16px;
  color: #222222;
}
.time {
  font-size: 10px;
  margin-right: 10px;
}
.title-wrap {
  display: flex;
  justify-content: space-between;
}
.like-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}
.like-icon.liked {
  color: #ff69b4;
}
</style>