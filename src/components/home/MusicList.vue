<template>
  <div class="musiclist">
    <div class="musictop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="musicContent">
      <van-swipe
        :loop="false"
        :width="150"
        class="my-swiper"
        :show-indicators="false"
      >
        <van-swipe-item
          v-for="item in state.musicList"
          :key="item"
          class="swipe-item"
        >
          <router-link :to="{path:'/itemMusic', query:{id:item.id}}">
          <span class="playCount">
            <van-icon name="play" color="white" />
            {{ changeCount(item.playCount) }}</span
          >
          <img :src="item.picUrl" />
          <span class="listname">{{ item.name }}</span>
          </router-link>
          
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { getMusicList } from "../../request/api/home";
import { onMounted, reactive, computed } from "vue";
export default {
  setup() {
    const state = reactive({
      musicList: [],
    });
    function changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(0) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(0) + "万";
      }
    }
    onMounted(async () => {
      state.musicList = (await getMusicList()).data.result;
    });
    return { state, changeCount };
  },
};
</script>

<style lang="less" scoped>
.musiclist {
  width: 100%;
  padding: 0.2rem;
  .musictop {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .title {
      font-size: 0.45rem;
      font-weight: 900;
    }
    .more {
      border: 1px solid #ccc;
      line-height: 0.5rem;
      border-radius: 0.3rem;
      padding: 0 0.1rem;
    }
  }
  .musicContent {
    width: 100%;
    .my-swiper {
      width: 100%;
      .swipe-item {
        height: 200px;
        position: relative;
        &:not(:last-child) {
          padding-right: 0.1rem;
        }
        img {
          width: 100%;
          border-radius: 0.2rem;
        }
        .playCount {
          font-size: 0.27rem;
          font-weight: 700;
          color: #fff;
          position: absolute;
          right: 13px;
          top: 3px;
        }
        .listname {
          display: -webkit-box; /*必须结合的属性,将对象作为弹性伸缩盒子模型显示*/
          -webkit-line-clamp: 2; /*设置多少行*/
          -webkit-box-orient: vertical; /*必须结合的属性,设置或检索伸缩盒对象的子元素的排列方式*/
          overflow: hidden; /*文本会被修剪，并且剩余的部分不可见*/
          text-overflow: ellipsis; /*显示省略号来代表被修剪的文本*/
        }
      }
    }
  }
}
</style>