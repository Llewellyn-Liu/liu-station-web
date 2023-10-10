<script>
import {RouterLink, RouterView} from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import LiuStationIcon from "@/components/icons/liuStationIcon.vue";
import ApplicationGrid from "@/components/ApplicationGrid.vue";

export default {

  data() {
    return {
      sc_page: 0,
      sc_wheelPosition: 1,
      sc_stampOpacity: 1,

      // Update sc_appUsingCentralPanel when an app uses the central container
      sc_appBarBtnList: [
        {name: "lab", icon: "mdi-tools", on: false},
        {name: "video", icon: "mdi-video-box", on: false},
        {name: "item3", icon: "mdi-bell"},
        {name: "item4", icon: "mdi-clock-time-five", on: false},
        {name: "item5", icon: "mdi-balloon"},
      ],

      // Update this when an app uses the central container
      sc_appUsingCentralPanel: [0,1,3],

      sc_centralContainerShow: false,

      sc_time: {
        month: "",
        date: "",
        timezone: "",
        hour: "",
        minute: "",
        second: "",
      },

      sc_menuOpen: false,
    }

  },
  methods: {
    sc_scrollAndUpdate(event) {
      console.log(event.deltaY, this.sc_wheelCount, this.sc_page, "opacity:", this.sc_stampOpacity)
      if (event.deltaY < 0 && this.sc_page === 1) {
        this.sc_wheelCount++;
      } else if (event.deltaY > 0 && this.sc_page === 0) {
        this.sc_wheelCount++;
        this.sc_stampOpacity = 1 - this.sc_wheelCount * 0.2
      } else this.sc_wheelCount = 0;

      if (this.sc_wheelCount > 5) {
        this.sc_page = 1 - this.sc_page;
        if (this.sc_page === 0) this.sc_stampOpacity = 0.2
      }
    },
    sc_scrollAndUpdate2(event) {
      // console.log(event.deltaY, this.sc_wheelCount, this.sc_page, "opacity:", this.sc_stampOpacity)
      if (event.deltaY < 0) {
        this.sc_wheelPosition = this.sc_wheelPosition >= 1 ? 1 : this.sc_wheelPosition + 0.15;
        this.sc_page = this.sc_wheelPosition > 0 ? 0 : 1;
      } else if (event.deltaY > 0) {
        this.sc_wheelPosition = this.sc_wheelPosition <= -1 ? -1 : this.sc_wheelPosition - 0.15;
        this.sc_page = this.sc_wheelPosition < 0 ? 1 : 0;
      } else {

      }

      if (this.sc_wheelPosition > -0.1) {
        this.sc_stampOpacity = this.sc_wheelPosition;
      }
    },
    sc_appBtnClicked(eid){
      console.log("Test: eid", eid)
      if(this.sc_appBarBtnList[eid].on === true){
        this.sc_centralContainerShow = false;
        console.log("Test: box1", eid)
      }else {
        for(let i = 0; i<this.sc_appUsingCentralPanel.length; i++){
          const originEid = this.sc_appUsingCentralPanel[i];
          if(originEid !== eid && this.sc_appBarBtnList[originEid].on === true){
            this.sc_appBarBtnList[originEid].on = false;
            break;
          }
        }
        this.sc_centralContainerShow = true;
      }
      this.sc_appBarBtnList[eid].on = !this.sc_appBarBtnList[eid].on;
      console.log(this.sc_appBarBtnList)
    },

    sc_showLocalTime() {
      let t = this.sc_time;

      setInterval(function () {
        const date = new Date();
        t.month = date.getMonth();
        t.date = date.getDate();
        t.timezone = date.getTimezoneOffset() / 60
        t.hour = date.getHours();
        t.minute = date.getMinutes();
        t.second = date.getSeconds();
      }, 1000);

    },
  },

  mounted() {
    this.sc_showLocalTime();

  },

  components: {
    ApplicationGrid,
    LiuStationIcon,
  }
}
</script>

<template>

  <v-app>
    <!--wheel controller-->
    <div class="canvas" @wheel="sc_scrollAndUpdate2($event)">

      <!--      page 0-->
      <div class="stamp" v-if="sc_page===0" :style="{ opacity: sc_stampOpacity}">
        <div class="title">Liu Station</div>
      </div>

      <!--      page 1-->
      <v-app-bar collapse :elevation="2" title="Hi" v-if="sc_page===1">
        <v-app-bar-nav-icon style="margin-left: 20px" @click="sc_menuOpen = !sc_menuOpen">
          <liu-station-icon/>
        </v-app-bar-nav-icon>
      </v-app-bar>

      <v-menu v-model="sc_menuOpen" :close-on-content-click="false" style="margin-top: 70px;"
              transition="slide-y-transition">
        <v-list density="comfortable" style="background: rgba(0,0,0,0)" class="elevation-0">
          <v-list-item
              v-for="(e,eid) in sc_appBarBtnList"
          >
            <v-btn rounded="xl" :icon="e.icon" elevation="0" :color="e.on?'light-blue-lighten-1':'white'" @click="sc_appBtnClicked(eid)">
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>

<!--      display area-->
      <v-sheet class="central-container" v-if="sc_centralContainerShow && sc_page===1" rounded="xl" elevation="10">

<!--        component 0-->
        <ApplicationGrid v-if="sc_page === 1 && sc_appBarBtnList[0].on"/>
<!--        component 1-->
        <div v-if="sc_page === 1 && sc_appBarBtnList[1].on" style="height: 100%; width: 100%">
          <video style="height: 100%; width: 100%"
                 id="my-player"
                 class="video-js rounded-xl"
                 controls
                 preload="auto"
                 poster="https://picsum.photos/400/200"
                 data-setup='{}'>
            <source src="http://localhost:8080/test.mp4" type="video/mp4">
            <p class="vjs-no-js">
              To view this video please enable JavaScript, and consider upgrading to a
              web browser that
              <a href="https://videojs.com/html5-video-support/" target="_blank">
                supports HTML5 video
              </a>
            </p>
          </video>
        </div>


        <div v-if="sc_appBarBtnList[3].on && sc_page===1" style="height: 100%;width: 100%;">
          <div style=" height: 100%;display: flex;justify-content: center;align-items: center;overflow: hidden">
            <p style="font-size: 30vh; color: rgba(255,255,255,0.6);">
              {{ this.sc_time.hour }}:{{
                this.sc_time.minute < 10 ? '0' + this.sc_time.minute : this.sc_time.minute
              }}</p>
            <p style="font-size: 10vh; color: rgba(255,255,255,0.6); vertical-align: bottom">
              {{ this.sc_time.second < 10 ? '0' + this.sc_time.second : this.sc_time.second }}</p>
          </div>

          <div style=" height: 80%; width: 80%; position: absolute; left: 10%; top: 10%; display: flex; align-items: end; justify-content: end">
            <div style="font-size: 3vh; color: rgba(255,255,255,0.6);">
              {{ this.sc_time.month }}/{{ this.sc_time.date }}
              UTC{{ this.sc_time.timezone >= 0 ? '+' + this.sc_time.timezone : this.sc_time.timezone }}
            </div>
          </div>

        </div>
        <div></div>
      </v-sheet>

      <!--      Conversation console-->
      <v-text-field bg-color="rgba(0,0,0,0.2)" style="position: absolute; width: 50vw; left: 25vw; bottom: 5vh;"
                    append-inner-icon="mdi-chevron-right"
                    v-if="sc_page===1"></v-text-field>


    </div>

  </v-app>
</template>

<style scoped>
.canvas {
  min-width: 100vw;
  margin: 0;
  min-height: 100vh;
  background-color: rgb(247, 90, 0, 1);
  background-image: radial-gradient(closest-side, rgb(77, 141, 224, 1), rgba(77, 141, 224, 0)),
  radial-gradient(closest-side, rgb(161, 235, 59, 1), rgba(161, 235, 59, 0)),
  radial-gradient(closest-side, rgba(247, 209, 118, 1), rgba(247, 209, 118, 0)),
  radial-gradient(closest-side, rgb(226, 96, 116), rgba(188, 85, 101, 0)),
  radial-gradient(closest-side, rgb(255, 0, 162, 1), rgba(255, 0, 162, 0));
  background-size: 130vmax 130vmax,
  80vmax 80vmax,
  90vmax 90vmax,
  110vmax 110vmax,
  90vmax, 90vmax;
  background-position: -80vmax -80vmax,
  60vmax -30vmax,
  10vmax 10vmax,
  -30vmax -10vmax,
  50vmax 50vmax;
  background-repeat: no-repeat;
  animation: 30s movement linear infinite;

}

@keyframes movement {
  0%, 100% {
    background-size: 130vmax 130vmax,
    80vmax 80vmax,
    90vmax 90vmax,
    110vmax 110vmax,
    90vmax, 90vmax;
    background-position: -80vmax -80vmax,
    60vmax -30vmax,
    10vmax 10vmax,
    -30vmax -10vmax,
    50vmax 50vmax;
  }
  25% {
    background-size: 60vmax 60vmax,
    100vmax 100vmax,
    80vmax 80vmax,
    90vmax 90vmax,
    80vmax, 80vmax;
    background-position: -50vmax -30vmax,
    40vmax 20vmax,
    60vmax -20vmax,
    20vmax 40vmax,
    -10vmax 20vmax;
  }
  50% {
    background-size: 50vmax 50vmax,
    110vmax 110vmax,
    80vmax 80vmax,
    100vmax 100vmax,
    90vmax, 90vmax;
    background-position: 10vmax -20vmax,
    10vmax 50vmax,
    10vmax 60vmax,
    30vmax 20vmax,
    50vmax -10vmax;
  }
  50% {
    background-size: 80vmax 80vmax,
    90vmax 90vmax,
    70vmax 70vmax,
    110vmax 110vmax,
    80vmax, 80vmax;
    background-position: 30vmax 40vmax,
    30vmax 20vmax,
    40vmax -10vmax,
    -20vmax 30vmax,
    10vmax 40vmax;
  }
}

.title {
  font-family: Chewy;
  font-size: 5vh;
  line-height: 5vh;
  color: rgba(0, 0, 0, 0.74);

  position: absolute;
  left: 0;
  bottom: 0;
  margin-left: 10%;
  margin-bottom: 5%;
}

.stamp {
  width: 20vh;
  height: 20vh;

  background-image: url("assets/marble.jpg");
  position: absolute;
  left: 0;
  bottom: 0;
  margin-left: 10vw;
  margin-bottom: 10vh;
}

.central-container {
  width: 75vw;
  height: 75vh;
  position: absolute;
  left: 12.5vw;
  top: 12.5vh;

  background: rgba(0,0,0,0.2);
  overflow: scroll

}
/* 抄自Drive Box.vue */
/* ChatGPT 生成参考*/
.central-container::-webkit-scrollbar {
  width: 0; /* 隐藏滚动条的宽度 */
}

</style>
