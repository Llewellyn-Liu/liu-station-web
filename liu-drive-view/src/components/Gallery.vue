<script>
import {useUserStore} from "@/stores/user";
import {useImageListStore} from "@/stores/imageList";

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
    },

    async dr_deleteImage(){
      const result = await fetch("/drive/image/"+this.userStore.id+"/"+this.sc_overlayDisplayFilename, {
        method: "DELETE",
      });

      if(result.status === 200){
        console.log("image "+filename+" deleted");
      }
      else if(result.status === 400){
        console.log("image "+filename+" failed to delete.")
      }
      else console.log("An error occurs, please check the source code")
    },
  }
}

</script>

<template>

  <div class="flex-container">
    <div v-for="e in imageListStore.list">

      <v-hover>
        <template v-slot:default="{isHovering, props}">
          <v-card v-bind="props" :class="'block-'+e.scale+' rounded-xl'" :elevation="isHovering?15:5"
                  @click="sc_overlayDisplayFilename=e.filename; sc_overlayOn=true">
            <v-img :src="'http://localhost:8080/drive/image/'+userStore.id+'/'+e.filename+'/thumbnail'"
                   cover=""></v-img>
          </v-card>
        </template>
      </v-hover>

    </div>
  </div>

  <!--  <v-overlay scroll-strategy="none" v-model="sc_overlayOn" id="display-overlay" class="align-center justify-center">-->
  <v-overlay scroll-strategy="block" v-model="sc_overlayOn" id="display-overlay"
             style="display:flex; align-items: center; justify-content: center">

    <v-img max-height="75vh"
           :src="'http://localhost:8080/drive/image/'+userStore.id+'/'+sc_overlayDisplayFilename"></v-img>

    <v-sheet style="padding: 0" class="rounded-xl image-view-controller">
      <v-btn color="error" class="ma-5" @click="dr_deleteImage">Delete</v-btn>
    </v-sheet>
  </v-overlay>


</template>

<style scoped>
.flex-container {
  display: flex;
  flex-wrap: wrap; /* Problem solved by ChatGPT */
  height: 100%;
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

.block-2 {
  width: 26vh; /* height + height + 2 * margin*/
  height: 12vh;
  margin: 1vh 1vh;
  cursor: pointer;
}

.image-view-controller {
  margin: 2vh auto;
  width: 50vw;
  height: 10vh;
  display: flex;
  align-items: center;
  overflow-x: auto;
}


/* ref: https://zxuqian.cn/css-how-to-hide-scrollbars/*/
.image-view-controller::-webkit-scrollbar {
  display: none;
}



</style>
