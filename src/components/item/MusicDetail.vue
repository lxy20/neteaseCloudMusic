<template>
  <div>
    <div class="music-detail">
      <img :src="music.al.picUrl" alt="" class="bgimg" />
      <div class="MusicDetailTop">
        <!-- <img :src="playlist.coverImgUrl" alt="" class="bgimg" /> -->
        <div class="itemLeft">
          <van-icon
            name="arrow-left"
            size="0.45rem"
            color="white"
            @click="updateDetailShow"
          />
        </div>
        <div class="itemCenter">
          <div class="center-marquee">
            <Vue3Marquee style="color: #fff">{{ music.name }}</Vue3Marquee>
          </div>
          <div class="authors">
            <span class="author" v-for="(item, i) in music.ar" :key="i">
              {{ i ? " / " : "" }}{{ item.name }}
            </span>
          </div>
        </div>
        <div class="itemRight">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fenxiang"></use>
          </svg>
        </div>
      </div>
    </div>
    <div
      class="music-detail-center"
      v-show="!this.lyricShow"
      @click="changeLyricShow"
    >
      <img src="@/assets/disc-plus.png" class="disc" alt="" />
      <img
        src="@/assets/needle-ab.png"
        :class="this.isbtnShow ? 'needle_active ' : 'needle'"
        alt=""
      />
      <img
        :src="music.al.picUrl"
        alt=""
        :class="this.isbtnShow ? 'cover_active ' : 'cover_paused'"
        class="cover"
      />
    </div>
    <div
      class="lyric"
      ref="musicLyric"
      v-show="this.lyricShow"
      @click="changeLyricShow"
    >
      <p
        v-for="(item, i) in this.lyric_final"
        :key="i"
        :class="{
          active:
            this.currenttime * 1000 > item.time &&
            this.currenttime * 1000 < item.next,
        }"
      >
        {{ item.lrc }}
      </p>
    </div>
    <div class="music-detail-footer">
      <div class="footer-top">
        <van-icon name="like-o" color="#fff" size="0.7rem" />
        <van-icon
          name="upgrade"
          style="transform: rotate(180deg)"
          color="#fff"
          size="0.7rem"
        />
        <van-icon name="music-o" color="#fff" size="0.7rem" />
        <van-icon name="chat-o" color="#fff" size="0.7rem" />
        <van-icon name="ellipsis" color="#fff" size="0.7rem" />
      </div>
      <div class="footer-content">
        <input
          type="range"
          name=""
          :max="this.duration"
          class="range"
          v-model="currenttime"
          min="0"
          steps="0.05"
        />
      </div>
      <div class="footer-bottom">
        <div class="bottom-icon-list">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xunhuan-copy"></use>
          </svg>
          <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
            <use xlink:href="#icon-shangyishoushangyige-copy"></use>
          </svg>
          <svg
            class="icon"
            aria-hidden="true"
            style="font-size: 1.2rem"
            @click="$emit('play')"
            v-if="isbtnShow"
          >
            <use xlink:href="#icon-zanting1-copy"></use>
          </svg>
          <svg
            class="icon"
            aria-hidden="true"
            style="font-size: 1.2rem"
            @click="$emit('play')"
            v-else
          >
            <use xlink:href="#icon-bofang-copy"></use>
          </svg>
          <svg class="icon" aria-hidden="true" @click="goPlay(1)">
            <use xlink:href="#icon-xiayigexiayishou-copy"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-liebiao2-copy"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      lyricShow: false,
    };
  },
  components: {
    Vue3Marquee,
  },
  props: ["music", "addDuration"],
  mounted() {},
  methods: {
    ...mapMutations(["updateDetailShow", "updatePlayListIndex"]),
    changeLyricShow() {
      this.lyricShow = !this.lyricShow;
    },
    goPlay(num) {
      let index = this.playListIndex + num;
      if (index < 0) {
        index = this.playList.length - 1;
      } else if (index == this.playList.lengtyh) {
        index = 0;
      }
      this.updatePlayListIndex(index);
    },
  },
  computed: {
    ...mapState([
      "isbtnShow",
      "lyric",
      "currenttime",
      "playList",
      "playListIndex",
      "duration",
    ]),
    lyric_final: function () {
      let arr;
      if (this.lyric) {
        arr = this.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          let min = item.slice(item.indexOf("[") + 1, item.indexOf(":"));
          let sec = item.slice(item.indexOf(":") + 1, item.indexOf("."));
          let mill = item.slice(item.indexOf(".") + 1, item.indexOf("]"));
          let lrc = item.slice(item.indexOf("]") + 1, item.length);
          let time =
            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          return { min, sec, mill, lrc, time };
        });
        arr.forEach((item, i) => {
          if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
            item.next = 100000;
          } else {
            item.next = arr[i + 1].time;
          }
        });
      }
      console.log(arr);
      return arr;
    },
  },
  mounted() {
    this.addDuration();
  },
  watch: {
    currenttime: function (newValue) {
      let p = document.querySelector("p.active");
      this.$nextTick(() => {
        if (p) {
          if (p.offsetTop > 300) {
            this.$refs.musicLyric.scrollTop = p.offsetTop - 300;
          }
        }
        if (newValue === this.duration) {
          this.goPlay(1);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.music-detail {
  .bgimg {
    z-index: -1;
    position: absolute;
    height: 100%;
    width: 100%;
    filter: blur(50px);
  }
  .MusicDetailTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .itemLeft {
      margin: 0.2rem;
    }
    .itemRight {
      margin: 0.2rem;
      .icon {
        font-size: 0.5rem;
      }
    }
    .itemCenter {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 0.3rem;

      .center-marquee {
        width: 3rem;
        font-size: 0.4rem;
        margin-bottom: 0.05rem;
        margin-top: 0.1rem;
      }
      .authors {
        display: flex;
        .author {
          color: #c0c4cc;
          font-size: 0.3rem;
        }
      }
    }
  }
}

.music-detail-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 11rem;
  position: relative;
  margin-top: 0.6rem;
  .disc {
    height: 5rem;
    width: 5rem;
    position: absolute;
    top: 22%;
    z-index: 1;
  }
  .needle {
    width: 2rem;
    position: absolute;
    top:5%;
    left: 45%;
    height: 3rem;
    transform-origin: 0 0;
    transform: rotate(-25deg);
    transition: 0.3s;
    z-index: 2;
  }
  .needle_active {
    width: 2rem;
    position: absolute;
      top:5%;
    left: 45%;
    height: 3rem;
    transform-origin: 0 0;
    transform: rotate(3deg);
    transition: 0.5s;
    z-index: 2;
  }
  
  @keyframes rotate_cover {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
  .cover_active {
    animation-play-state: running;
  }
  .cover_paused {
    animation-play-state: paused !important;
    -webkit-animation-play-state: paused; /* Safari 和 Chrome */
  }
  .cover {
    border-radius: 50%;
    height: 3.15rem;
    width: 3.15rem;
    position: absolute;
    top: 30.2%;
    animation: rotate_cover 15s linear infinite;
  }
}
.music-detail-footer {
  .footer-top {
    position: fixed;
    width: 100%;
    bottom: 2.8rem;
    display: flex;
    padding: 0.2rem;
    justify-content: space-around;
    align-items: center;
  }
  .footer-content{
    .range{
      position: fixed;
      bottom: 2.3rem;
      width: 100%;
      height: 0.06rem;

    }
     /*滑动条背景*/
  input[type="range"] {
    -webkit-appearance: none;

    background: #fff;
    

  }

  /*滑动条操作按钮样式*/
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #ed5050;
    
  }   

}



  .footer-bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 0.2rem;
    .bottom-icon-list {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 0.65rem;
    }
  }

  }


.lyric {
  scroll-behavior: smooth;
  width: 100%;
  padding: 0 1rem;
  height: 10.5rem;
  margin-top: 0.6rem;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  overflow: scroll;
  p {
    margin-bottom: 0.4rem;
    line-height: 0.55rem;
    font-size: 0.4rem;
  }
  .active {
    color: white;
    font-size: 0.45rem;
  }
}
</style>

<style lang="less">
.vue3-marquee > .marquee {
  color: #fff;
}
</style>



