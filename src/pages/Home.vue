<template>
  <div className="home">
    <carousel :items="carouselItems"/>
  </div>
</template>

<script>
import Carousel from "@/components/Carousel.vue";

export default {
  components: {
    Carousel,
  },
  data() {
    return {
      carouselItems: [
        {text: "Site 1"},
        {text: "Site 2"},
        {text: "Site 3"},
      ],
    };
  },
};
</script>

<style scoped>
/* Styles spécifiques à la page Home.vue */
.home {
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
}


</style>
