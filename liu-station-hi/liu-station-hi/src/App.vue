<script>
import {RouterLink, RouterView} from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import LiuStationIcon from "@/components/icons/liuStationIcon.vue";

export default {

  data() {
    return {
      sc_page: 0,
      sc_wheelPosition: 1,
      sc_stampOpacity: 1,

      test_open: false,
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
      console.log(event.deltaY, this.sc_wheelCount, this.sc_page, "opacity:", this.sc_stampOpacity)
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
    }
  },
  components: {
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
        <v-app-bar-nav-icon style="margin-left: 20px" @click="test_open = !test_open">
          <liu-station-icon/>
        </v-app-bar-nav-icon>
      </v-app-bar>

      <v-menu v-model="test_open" style="margin-top: 70px;" transition="slide-y-transition">
        <v-list density="comfortable" style="background: rgba(0,0,0,0)" class="elevation-0">
          <v-list-item
              v-for="e in [1,2,3,4,5]"
          >
            <v-btn rounded="xl" icon="mdi-plus" elevation="0">
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>



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
</style>
