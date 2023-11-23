<template>
  <div class="carousel" v-if="items.length > 0">
    <v-carousel class="carousel_container" cycle show-arrows prev-icon="mdi-chevron-left" next-icon="mdi-chevron-right">
      <v-carousel-item class="carousel_content" v-for="(item, index) in items" :key="index">
        <div class="carousel_background" :style="{ backgroundImage: 'url(' + imgBackground[index] + ')'}"></div>
        <v-sheet height="100vh" class="d-flex fill-height justify-center align-center">
          <span class="sites">{{ item }}</span>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import '@mdi/font/css/materialdesignicons.min.css';
import image1 from '@/assets/carousel_background/1.jpg';
import image2 from '@/assets/carousel_background/2.jpg';
import image3 from '@/assets/carousel_background/3.webp';
import image4 from '@/assets/carousel_background/4.webp';
import image5 from '@/assets/carousel_background/5.jpg';

export default {
  data() {
    return {
      imgBackground: [
        image1, image2, image3, image4, image5
      ]
    }
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style scoped>

.carousel_container {
  width: 80vw;
  margin: auto;
  border-radius: 20px;
}

.carousel_background {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: blur(2px); /* Ajustez le niveau de flou ici */
  z-index:1;
}
.sites {
  font-size: 36px; /* Augmentez la taille de la police */
  color: white; /* Couleur du texte */
  text-shadow: 4px 4px 6px rgba(0, 0, 0, 0.5); /* Ombre portée pour améliorer la lisibilité */
  z-index: 2; /* Assurez-vous que le texte est au-dessus du fond */
}

</style>
