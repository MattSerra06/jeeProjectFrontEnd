<template>
  <div class="carousel">
  <v-carousel class="carousel_container" cycle show-arrows prev-icon="mdi-chevron-left" next-icon="mdi-chevron-right">
    <v-carousel-item class="carousel_content" v-for="(item, index) in items" :key="index">
      <v-sheet height="100vh" color="red" class="d-flex fill-height justify-center align-center">
        <span class="white--text">{{ item.text }}</span>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
  </div>
</template>

<script>
import '@mdi/font/css/materialdesignicons.min.css';
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style scoped>

.carousel_container{
  width: 80vw;
  margin: auto;
  border-radius: 20px;
}

</style>
