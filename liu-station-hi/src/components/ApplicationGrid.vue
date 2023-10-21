<script>
export default {

  data() {
    return {
      test_appList: [{
        name: "app_1",
        image: "https://picsum.photos/200",
        url: "http://localhost:8080/index.html",
      }, {
        name: "app_2",
        image: "https://picsum.photos/200",
        url: "https://www.google.com",
      }, {
        name: "app_3",
        image: "https://picsum.photos/200",
        url: "https://www.google.com",
      }, {
        name: "app_4",
        image: "https://picsum.photos/200",
        url: "https://www.google.com",
      }, {
        name: "app_5",
        image: "https://picsum.photos/200",
        url: "https://www.google.com",
      },
        {
          name: "app_1",
          image: "https://picsum.photos/200",
          url: "https://www.google.com",
        }, {
          name: "app_2",
          image: "https://picsum.photos/200",
          url: "https://www.google.com",
        }, {
          name: "app_3",
          image: "https://picsum.photos/200",
          url: "https://www.google.com",
        }, {
          name: "app_4",
          image: "https://picsum.photos/200",
          url: "https://www.google.com",
        }, {
          name: "app_5",
          image: "https://picsum.photos/200",
          url: "https://www.google.com",
        },
        {
          name: "app_1",
          image: "https://picsum.photos/200",
          url: "https://www.google.com",
        }, {
          name: "app_2",
          image: "https://picsum.photos/200",
          url: "https://www.google.com",
        }, {
          name: "app_3",
          image: "https://picsum.photos/200",
          url: "https://www.google.com",
        }, {
          name: "app_4",
          image: "https://picsum.photos/200",
          url: "https://www.google.com",
        }, {
          name: "app_5",
          image: "https://picsum.photos/200",
          url: "https://www.google.com",
        },
        {
          name: "app_1",
          image: "https://picsum.photos/200",
          url: "https://www.google.com",
        }, {
          name: "app_2",
          image: "https://picsum.photos/200",
          url: "https://www.google.com",
        }, {
          name: "app_3",
          image: "https://picsum.photos/200",
          url: "https://www.google.com",
        }, {
          name: "app_4",
          image: "https://picsum.photos/200",
          url: "https://www.google.com",
        }, {
          name: "app_5",
          image: "https://picsum.photos/200",
          url: "https://www.google.com",
        },
      ],
    }
  }
}

</script>

<template>
  <v-container>

    <v-row>
      <v-col cols="2" v-for="e in test_appList">

        <v-hover
            v-slot="{ isHovering, props }"

        >
          <!--        item card-->
          <v-card class="bg-transparent" variant="flat" style="padding: 15%;">
            <v-card class="bg-white rounded-xl" :elevation="isHovering?15:5" v-bind="props" style="cursor: pointer">
              <a :href="e.url">
                <v-img :src="e.image"></v-img>
              </a>

            </v-card>
            <v-card-title style="display: flex; align-items: start; justify-content: center;">
              <p style="color: rgba(255,255,255,0.8); cursor: default">{{ e.name }}</p>
            </v-card-title>
          </v-card>

        </v-hover>



      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>