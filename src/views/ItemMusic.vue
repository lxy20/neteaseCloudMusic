<template>
<div>
    <item-music-top  class="item-music-top" :playlist=state.playlist :nickname=state.nickname :backgroundUrl=state.backgroundUrl  />
    <item-music-list class="item-music-list" :itemList = 'state.itemList' :sub="state.playlist.subscribedCount"> </item-music-list>
</div>

</template>

<script>
import {useRoute} from 'vue-router'
import {onMounted, reactive} from 'vue'
import {getMusicItemList} from '../request/api/item'
import ItemMusicList from "../components/item/ItemMusicList.vue"
import ItemMusicTop from "../components/item/ItemMusicTop.vue"
export default {
    setup(){
        const state = reactive({
            playlist:{},
            itemList:[],//歌单中的歌曲
            // nickname:'',
            // backgroundUrl:''
        });

        onMounted(
            async() => {
                let id = useRoute().query.id
        
                let res = await getMusicItemList(id);
 
                state.playlist = res.data.playlist
                state.nickname = state.playlist.creator.nickname
                state.backgroundUrl = state.playlist.creator.backgroundUrl
                state.itemList = state.playlist.tracks
                console.log(state.playlist)
                console.log(res)
                sessionStorage.setItem('itemDetial',JSON.stringify(state))


                
            }
        );
    return {state}
    },
    components:{
        ItemMusicTop,
        ItemMusicList
    }

}
</script>

<style lang="less" scoped>
div{
    height: 100%;

.item-music-top{
    position:fixed;
}
.item-music-list{
    position:fixed;
    top:6.5rem;
    overflow: scroll;
}

}
&::-webkit-scrollbar {
  width: 1px;
  height: 1px;
  background: transparent;
}
 
&::-webkit-scrollbar-thumb {
  background: transparent;

}
 

 




    








</style>