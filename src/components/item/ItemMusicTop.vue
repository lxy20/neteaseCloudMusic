<template>
  <div>
    <div class="itemMusicTop">
      <img :src="playlist.coverImgUrl" alt="" class="bgimg" />
      <div class="itemLeft">
        <van-icon
          name="arrow-left"
          size="0.45rem"
          color="white"
          @click="$router.go(-1)"
        />
        <span>歌单</span>
      </div>
      <div class="itemRight">
        <van-icon name="search" size="0.5rem" color="white" />
        <van-icon name="wap-nav" size="0.5rem" color="white" />
      </div>
    </div>
    <div class="itemIntro">
      <span class="playCount">
        <van-icon name="play" color="white" />
        {{ changeCount(playlist.playCount)}}</span
      >
      <img :src="playlist.coverImgUrl" alt="" />
      <div class="text">
        <div class="title">{{ playlist.name }}</div>
        <div class="author">
          <img :src="playlist.creator.backgroundUrl" alt="" />
          <span>{{ playlist.creator.nickname }}</span>
          <van-icon name="arrow" color=" #c0c4cc" />
        </div>
        <div class="simpleintro">
          <div class="introtext">{{ playlist.description }}</div>
          <van-icon name="arrow" color=" #c0c4cc" />
        </div>
      </div>
    </div>
    <div class="icon-list">
      <div class="icon_text">
        <van-icon name="chat-o" color="#fff" size="0.6rem" />
        <span>{{ playlist.commentCount }}</span>
      </div>
      <div class="icon_text">
        <van-icon name="share-o" color="#fff" size="0.6rem" />
        <span>{{ playlist.shareCount }}</span>
      </div>
      <div class="icon_text">
        <van-icon
          name="upgrade"
          style="transform: rotate(180deg)"
          color="#fff"
          size="0.6rem"
        />
        <span>下载</span>
      </div>
      <div class="icon_text">
        <van-icon name="passed" color="#fff" size="0.6rem" />
        <span>多选</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup(props) {
    function changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(0) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(0) + "万";
      }
    }
    if ((props.playlist.creator = "")) {
      props.playlist.creator = JSON.parse(
        sessionStorage.getItem("itemDetial").playlist.creator
      );
    };
     return { changeCount };
  },
  //   props: ["playlist", "nickname", "backgroundUrl"],
  props: ["playlist"],
};
</script>

<style lang="less" scoped>
.itemMusicTop {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  .itemLeft,
  .itemRight {

    width: 20%;
    margin: 0.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      color: #fff;
      font-size: 0.4rem;
    }
  }
  .bgimg {
    width: 100%;
    height: 12rem;
    position: fixed;
    z-index: -1;
    filter: blur(20px);
  }
}
.itemIntro {
  margin-top: 0.5rem;
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 3.5rem;
  .playCount{
    position:absolute;
    right: 245px;
    color:#fff;
    font-weight: 700;
    font-size: 0.28rem;
    margin-top:0.08rem;

  }
  img {
    height: 3rem;
    border-radius: 0.2rem;
    margin-right: 0.3rem;
  }
  .text {
    .title {
      color: #fff;
      font-weight: 850;
      margin-bottom: 0.4rem;
      font-size:0.35rem;
    }
    .author {
      display: flex;
      align-items: center;
      margin-bottom: 0.2rem;
      font-size:0.3rem;

      img {
        height: 0.4rem;
        border-radius: 50%;
        margin-right: 0.1rem;
      }
      span {
        color: #c0c4cc;
        margin-right: 0.2rem;
      }
    }
    .simpleintro {
      display: flex;
      align-items: center;
      .introtext {
        color: #c0c4cc;
        font-size: 0.25rem;
        display: -webkit-box; /*必须结合的属性,将对象作为弹性伸缩盒子模型显示*/
        -webkit-line-clamp: 3; /*设置多少行*/
        -webkit-box-orient: vertical; /*必须结合的属性,设置或检索伸缩盒对象的子元素的排列方式*/
        overflow: hidden; /*文本会被修剪，并且剩余的部分不可见*/
        text-overflow: ellipsis; /*显示省略号来代表被修剪的文本*/
        margin-right: 0.2rem;
      }
    }
  }
}
.icon-list {
  width: 100%;
  padding: 0.2rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .icon_text {
    display: flex;
    flex-direction: column;
    span {
      color: #fff;
      margin-top: 0.1rem;
    }
  }
}
</style>