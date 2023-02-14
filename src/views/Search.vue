<template>
  <div class="">
    <div class="topSearch">
      <van-icon name="arrow-left" size="0.4rem" @click="$router.go(-1)" />
      <input
        type="text"
        placeholder="陈奕迅"
        v-model="searchKey"
        @keydown.enter="enterKey"
      />
    </div>
    <div class="searchHistory">
      <span class="History">历史纪录</span>
      <div
        class="tags"
        v-for="item in keyWorldList"
        :key="item"
        @click="searchHistorytag(item)"
        
      >
        <span class="names">
          {{ `${item}&nbsp` }}
        </span>
        <div class="del" @click="deltags(item)">x</div>
      </div>
    </div>
    <div class="list-part">
      <div class="item" v-for="(item, i) in searchList" :key="i">
        <div class="item-left" @click="playMusic(item)">
          <span style="font-size: 0.35rem; width: 0.2rem">{{ i + 1 }}</span>
          <div class="name-text">
            <span class="name" style="font-size: 0.35rem; font-weight: 500">{{
              item.name
            }}</span>
            <div class="author">
              <span v-for="(item, i) in item.artists" :key="i">
                {{ i ? " / " : "" }}{{ item.name }}
              </span>
            </div>
          </div>
        </div>
        <div class="item-right">
          <van-icon
            name="video-o"
            color="#c0c4cc"
            v-if="item.mvid"
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
import { mapMutations, mapState } from 'vuex';
import { getSearchMusic } from "../request/api/home";
export default {
  data() {
    return {
        
      keyWorldList: [],
      searchKey: "",
      searchList: [],
    };
  },
  methods: {
      ...mapMutations(["pushPlayList","updatePlayListIndex"]),
    enterKey: async function () {
      if (this.searchKey != "") {
        this.keyWorldList.unshift(this.searchKey);
        this.keyWorldList = [...new Set(this.keyWorldList)];
        if (this.keyWorldList.length > 10) {
          this.keyWorldList.pop();
        }
        localStorage.setItem("keyWorldList", JSON.stringify(this.keyWorldList));
        let res = await getSearchMusic(this.searchKey);
        this.searchList = res.data.result.songs;
        console.log(this.searchList);
        this.searchKey = "";
      }
    },
    deltags(item) {
      this.keyWorldList.splice(this.keyWorldList.indexOf(item), 1);
      localStorage.setItem("keyWorldList", JSON.stringify(this.keyWorldList));
      event.stopPropagation();
    },
    searchHistorytag: async function (item) {
      let res = await getSearchMusic(item);
      this.searchList = res.data.result.songs;
      console.log(this.searchList);
    },
    playMusic(item){
        item.al = item.album
        item.al.picUrl = item.album.artist.img1v1Url
        console.log(item)
        this.pushPlayList(item);
        this.updatePlayListIndex(this.playList.length-1)

    }
  },
  mounted() {
    this.keyWorldList = JSON.parse(localStorage.getItem("keyWorldList")) || [];
  },
  computed:{
    ...mapState(["playList"]),

  }

  
  
};
</script>

<style lang="less" scoped>
.topSearch {
  width: 100%;
  padding: 0.2rem;
  display: flex;
  height: 1rem;
  align-items: center;
  input {
    width: 90%;
    margin-left: 10px;
    border: none;
    border-bottom: 1px solid #999;
    padding: 00.05rem;
  }
}
.searchHistory {
  width: 100%;
  padding: 0.2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  
  .History {
    font-size: 0.4rem;
    font-weight: 500;
    width: 100%;
  }
  .tags {
    display: flex;
    align-items: center;
    position: relative;
    flex-wrap: wrap;
    .names {
      background: #ed5050;
      border-radius: 0.4rem;
      padding: 0.1rem 0.3rem;
      border: none;
      color: #fff;
      margin: 00.1rem 0.05rem;
    }
    .del {
      font-size: 00.2rem;
      position: absolute;
      color: #fff;
      right: 11px;
    }
  }
}
  .list-part {
    overflow: scroll;
    margin-top: 0.1rem;
    padding: 0.2rem;
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
</style>