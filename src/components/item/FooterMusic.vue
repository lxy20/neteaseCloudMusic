<template>
  <div class="footer-music">
    <div class="left-footer" @click="updateDetailShow">
      <img :src="playList[playListIndex].al.picUrl" alt="" />
      <div class="text">
        <div class="name">{{ playList[playListIndex].name }}</div>
        <div class="tips">左右滑动可切换歌曲～</div>
      </div>
    </div>
    <div class="right-footer">
      <svg class="icon" aria-hidden="true" @click="play" v-if="isbtnShow">
        <use xlink:href="#icon-zanting1"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="play" v-else>
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <!-- <van-icon name="pause-circle-o" @click="play" color="#c0c4cc" size="0.7rem" v-if="isbtnShow" />
      <van-icon name="play-circle-o" @click="play" color="#c0c4cc" size="0.7rem" v-else  /> -->

      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao2"></use>
      </svg>
    </div>
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3 `"
    ></audio>
    <van-popup v-model:show="detailShow" position="right" :style="{ height:'100%',width:'100%' }">
        <music-detail :music="playList[playListIndex]" @play="play" :addDuration="addDuration" />
    </van-popup>
 
     </div>
     
</template>

<script>
import { mapMutations, mapState } from "vuex";
import MusicDetail from './MusicDetail.vue';
export default {
  data() {
    return {
      timer:null
    }
  },
  components: { MusicDetail },
  computed: {
    ...mapState(["playList", "playListIndex", "isbtnShow","detailShow"]),
  },
  methods: {
    ...mapMutations(["updateDuration","updateIsbtnshow","updateDetailShow","updateCurrenttime"]),
    play: function () {
      //判断是否正在播放音乐
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.updateIsbtnshow(true);
        this.updateTime()

      } else {
        this.$refs.audio.pause();
        this.updateIsbtnshow(false);
        clearInterval(this.timer)
      }

    },
    updateTime:function(){
      this.timer= setInterval(()=>{
        this.updateCurrenttime(this.$refs.audio.currentTime)
      },20)
   
    },
    addDuration:function(){
      this.updateDuration (this.$refs.audio.duration)

      
    }

  },
  watch:{ //监听歌曲切换
    playListIndex:function(){
        this.$refs.audio.autoplay = true;
        if(this.$refs.audio.paused){
            this.updateIsbtnshow(true);
        }

        
           
    },
    playList:function(){ //点击触发新列表传入
        if(!this.isbtnShow){
            this.$refs.audio.autoplay = true;
            this.updateIsbtnshow(true)
        }
 
    },  

  },
  mounted() {
    this.$store.dispatch("getLyric",this.playList[this.playListIndex].id),
    this.updateTime();
    this.addDuration();

    

  },
  updated() {
    this.$store.dispatch("getLyric",this.playList[this.playListIndex].id)
        this.addDuration();

  },
};
</script>

<style lang="less" scoped>
.footer-music {
  padding: 0.2rem;
  width: 100%;
  background-color: #fff;
  position: fixed;
  height: 1.4rem;
  bottom: 0px;
  z-index: 1;
  border-top: 1px solid #c0c4cc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left-footer {
    display: flex;
    align-items: center;
    width: 78%;
    img {
      height: 1rem;
      width:1rem;
      border-radius: 50%;
    }
    .text {
      padding-left: 0.2rem;
      .name {
        font-weight: 700;
        font-size: 0.35rem;
        padding-bottom: 0.1rem;
        display: -webkit-box; /*必须结合的属性,将对象作为弹性伸缩盒子模型显示*/
        -webkit-line-clamp: 3; /*设置多少行*/
        -webkit-box-orient: vertical; /*必须结合的属性,设置或检索伸缩盒对象的子元素的排列方式*/
        overflow: hidden; /*文本会被修剪，并且剩余的部分不可见*/
        text-overflow: ellipsis; /*显示省略号来代表被修剪的文本*/
      }
      .tips {
        color: #c0c4cc;
        font-size: 0.25rem;
      }
    }
  }
  .right-footer {
    width: 22%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      font-size: 0.6rem;
    }
  }
}
</style>


