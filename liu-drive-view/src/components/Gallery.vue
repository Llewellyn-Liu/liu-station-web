<script>
import {useUserStore} from "@/stores/user";
import {useImageListStore} from "@/stores/imageList";
import {fi} from "vuetify/locale";

export default {
  setup() {
    const userStore = useUserStore();
    const imageListStore = useImageListStore();
    return {userStore, imageListStore}
  },
  data() {
    return {
      test_base64: "200",
      sc_overlayOn: false,
      sc_overlayDisplayFilename: "",
    }
  },
  methods: {
    async dr_downloadImage(filename) {
      window.open("/drive/image/" + this.userStore.id + "/" + filename)
    }
  }
}

</script>

<template>

<!--      <v-container fluid v-if="userStore.userLoggedIn">-->
<!--        <v-row>-->

<!--          <v-col-->
<!--              v-for="(e, eid) in imageListStore.list"-->
<!--              class="d-flex"-->
<!--              cols="1"-->
<!--          >-->
<!--            <v-card max-height="15vh" elevation="5">-->
<!--              <v-img-->
<!--                  cover-->
<!--                  height="100%"-->
<!--                  :src="'http://localhost:8080/drive/image/'+userStore.id+'/'+e.filename+'/thumbnail'"-->
<!--                  class="align-end"-->
<!--                  aspect-ratio="1"-->
<!--                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"-->
<!--                  :alt="'img-'+eid"-->
<!--              >-->
<!--                <div style="width:12vh; overflow: hidden">-->
<!--                  <v-card-title class="text-white">{{ e.filename }} </v-card-title>-->
<!--                </div>-->

<!--              </v-img>-->
<!--            </v-card>-->
<!--          </v-col>-->

<!--        </v-row>-->
<!--      </v-container>      -->

  <div class="flex-container">
    <div v-for="e in imageListStore.list">

      <v-hover>
        <template v-slot:default="{isHovering, props}">
          <v-card v-bind="props" :class="'block-'+e.scale+' rounded-xl'" :elevation="isHovering?15:5" @click="sc_overlayDisplayFilename=e.filename; sc_overlayOn=true">
            <v-img :src="'http://localhost:8080/drive/image/'+userStore.id+'/'+e.filename+'/thumbnail'" cover=""></v-img>
          </v-card>
        </template>
      </v-hover>

    </div>
  </div>

  <v-overlay scroll-strategy="none" v-model="sc_overlayOn" id="display-overlay" class="align-center justify-center">
    <v-img width="100vh" max-height="75vh" :src="'http://localhost:8080/drive/image/'+userStore.id+'/'+sc_overlayDisplayFilename"></v-img>
  </v-overlay>


</template>

<style scoped>
.flex-container {
  display: flex;
  flex-wrap: wrap; /* Problem solved by ChatGPT */
  height: 100vh;
  width: 100vw;
  align-content: start;
  justify-content: start;
  background: rgb(106, 95, 128);
}

.block-1 {
  width: 12vh;
  height: 12vh;
  margin: 1vh 1vh;
  cursor: pointer;
}

.block-2{
  width: 26vh; /* 15 + 15 + 2 * margin*/
  height: 12vh;
  margin: 1vh 1vh;
  cursor: pointer;
}
</style>
