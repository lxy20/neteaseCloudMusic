<template>
  <div class="itemList">
    <div class="top-part">
      <div class="top-left">
        <van-icon name="play-circle-o" size="0.5rem" />
        <div class="text">
          <span style="font-size: 0.35rem; font-weight: 500">播放全部 </span>
          <span style="color: #c0c4cc">(共{{ itemList.length }}首)</span>
        </div>
      </div>
      <div class="top-right">
        <span>+ 收藏({{ sub }})</span>
      </div>
    </div>
    <div class="list-part">
      <div class="item" v-for="(item, i) in itemList" :key="i">
        <div class="item-left" @click="playMusic(i)">
          <span style="font-size: 0.35rem; width: 0.2rem">{{ i + 1 }}</span>
          <div class="name-text">
            <span class="name" style="font-size: 0.35rem; font-weight: 500">{{
              item.name
            }}</span>
            <div class="author">
              <span v-for="(item, i) in item.ar" :key="i">
                {{ i ? " / " : "" }}{{ item.name }}
              </span>
            </div>
          </div>
        </div>
        <div class="item-right">
          <van-icon
            name="video-o"
            color="#c0c4cc"
            v-if="item.mv"
            size=" 0.6rem"
            style="margin-right: 0.3rem"
          />
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-liebiao2"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  setup(props) {},
  props: ["itemList", "sub"],
  methods:{
    playMusic:function(i){
      this.updatePlayList(this.itemList),
      this.updatePlayListIndex(i)
      console.log(i)
      console.log(this.itemList)
    },
    ...mapMutations(['updatePlayList','updatePlayListIndex'])
  },
  
};
</script>

<style lang="less" scoped>
.itemList {
  background-color: #fff;
  width: 100%;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  padding: 0.2rem;
  .top-part {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .top-left {
      display: flex;
      align-items: center;
      .text {
        margin-left: 0.2rem;
      }
    }
    .top-right {
      background-color: #ed5050;
      padding: 0.15rem;
      border-radius: 0.4rem;
      span {
        color: #fff;
      }
    }
  }
  .list-part {

    overflow: scroll;
    margin-top: 0.3rem;
    width: 100%;
    .item {
      width: 100%;
      display: flex;
      height: 1.3rem;
      justify-content: space-between;
      align-items: center;
      
      .item-left {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .name-text {
          display: flex;
          flex-direction: column;
          margin-left: 0.5rem;
          .name {
            display: -webkit-box; /*必须结合的属性,将对象作为弹性伸缩盒子模型显示*/
            -webkit-line-clamp: 1; /*设置多少行*/
            -webkit-box-orient: vertical; /*必须结合的属性,设置或检索伸缩盒对象的子元素的排列方式*/
            overflow: hidden; /*文本会被修剪，并且剩余的部分不可见*/
            text-overflow: ellipsis; /*显示省略号来代表被修剪的文本*/
            width: 4.5rem;
          }
          .author {
            padding-top:3px;
            span {
              color: #c0c4cc;
            }
          }
        }
      }
      .item-right {
        display: flex;
        align-items: center;
        svg {
          font-size: 0.5rem;
        }
      }
    }
  }
}
</style>