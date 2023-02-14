<template>
  <div class="topNav">
    <div class="top-left">
      <van-icon name="wap-nav" size="0.4rem"/>
    </div>
    <div class="topContent">
      <span>我的</span>
      <span class="active">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>
    <div class="top-right" @click="$router.push('/search')" >
        <van-icon name="search" size="0.4rem"/>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.topNav{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: .2rem;
    height: 1rem;
    align-items: center;
    .topContent{
        width: 65%;
            display: flex;
    justify-content: space-around;
    .active{
        font-weight: 900;

    }
   

        


    }
}

</style>