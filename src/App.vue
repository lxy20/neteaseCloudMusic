<template>
<div>
   
    <footer-music/>
       <router-view/>

</div>

</template>

<script>
import FooterMusic from "@/components/item/FooterMusic.vue"


export default{
  components:{
    FooterMusic
  }
}

</script>


<style lang="less">
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
  color:#303133;
}
.icon{
  width: .4rem;
  height: .4rem;
}
a{
  color:#303133;
}
</style>
