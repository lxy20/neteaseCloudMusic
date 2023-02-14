import { getMusicLyric } from '@/request/api/item'
import { createStore } from 'vuex'

export default createStore({
  state: {
    playList:[ //播放列表
    {
      "name": "Angel Baby",
      "id": 1876909269,
      "pst": 0,
      "t": 0,
      "ar": [
          {
              "id": 45129,
              "name": "Troye Sivan",
              "tns": [],
              "alias": []
          }
      ],
      "alia": [],
      "pop": 100,
      "st": 0,
      "rt": "",
      "fee": 8,
      "v": 20,
      "crbt": null,
      "cf": "",
      "al": {
          "id": 133021811,
          "name": "Angel Baby",
          "picUrl": "http://p3.music.126.net/HPddXwRRG6RLDjsFtW-sVg==/109951166370526264.jpg",
          "tns": [],
          "pic_str": "109951166370526264",
          "pic": 109951166370526270
      },
      "hr": null,
      "a": null,
      "cd": "01",
      "no": 1,
      "rtUrl": null,
      "ftype": 0,
      "rtUrls": [],
      "djId": 0,
      "copyright": 1,
      "s_id": 0,
      "mark": 270336,
      "originCoverType": 0,
      "originSongSimpleData": null,
      "tagPicList": null,
      "resourceState": true,
      "version": 20,
      "songJumpInfo": null,
      "entertainmentTags": null,
      "single": 0,
      "noCopyrightRcmd": null,
      "mst": 9,
      "cp": 7003,
      "mv": 14399603,
      "rtype": 0,
      "rurl": null,
      "publishTime": 1631203200000
  }
     ],
    playListIndex:0,
    isbtnShow:false,//暂停按钮的显示
    detailShow:false, //歌词页面
    lyric:{},//歌词
    currenttime:0,
    duration:0,
  },
  getters: {
  },
  mutations: {
    updateIsbtnshow:function(state,value){
      state.isbtnShow=value
    },
    updatePlayList:function(state,value){
      state.playList = value
    },
    updatePlayListIndex: function(state,value){
      state.playListIndex = value
    },
    updateDetailShow:function(state,value){
      state.detailShow = ! state.detailShow;

    },
    updateLyric: function(state,value){
      state.lyric = value
    },
    updateCurrenttime: function(state,value){
      state.currenttime = value
    },
    updateDuration: function(state,value){
      state.duration = value
    },
    pushPlayList:function(state,value){
      state.playList.push(value) 
    },
  },
  actions: {
    getLyric:async function(context,value){
      let res = await getMusicLyric(value)
      console.log("lyric",res)
      context.commit("updateLyric",res.data.lrc.lyric)
    }
  },
  modules: {
  }
})
