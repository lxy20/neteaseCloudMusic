<template>
<div class="/">
    <top-nav/>
  <top-swiper/>
  <icon-list />
  <music-list/>

</div>



</template>

<script>
import IconList from '../components/home/IconList.vue';
import MusicList from '../components/home/MusicList.vue';
import TopNav from '../components/home/TopNav.vue';
import TopSwiper from '../components/home/TopSwiper.vue';

export default {
  name: "HomeView",
  components: {
    TopNav,
    TopSwiper,
    IconList,
    MusicList,
  },
};
</script>
