<template>
<div class="iconlist">
    <div class="iconitem">
        <van-icon name="calendar-o" color="#ed5050" size="0.8rem" />
        <span>每日推荐</span>
    </div>
        <div class="iconitem">
        <van-icon name="audio" color="#ed5050" size="0.8rem" />
        <span>私人FM</span>
    </div>
        <div class="iconitem">
        <van-icon name="bars" color="#ed5050" size="0.8rem" />
        <span>歌单</span>
    </div>
        <div class="iconitem">
        <van-icon name="bar-chart-o" color="#ed5050" size="0.8rem" />
        <span>排行榜</span>
    </div>
</div>
  
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.iconlist{
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top:.2rem;
    height: 1.5rem;
    align-items: center;

    .iconitem{
        width: 25%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
      
   



    }
}

</style>