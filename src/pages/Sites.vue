<template>
  <v-container>
    <v-row dense>
      <v-col
          cols="12"
          md="6"
          v-for="(site, index) in olympicSites"
          :key="site.id"
          :class="getColClasses(index)"
      >
        <v-card :color="getCardColor(index)" dark tile class="site-card">
          <v-row no-gutters>
            <!-- Si index est pair, l'image est à droite, donc le texte est à gauche -->
            <v-col cols="7" v-if="index % 2 === 0">
              <v-card-title class="headline">{{ site.name }}</v-card-title>
              <v-card-subtitle style="color:#353b48">{{ site.city }}</v-card-subtitle>
              <v-card-text>{{ site.category }}</v-card-text>

            </v-col>

            <!-- Image -->
            <v-col cols="5">
              <v-img
                  :src=getImagePath(index)
                  height="200px"
                  contain
              ></v-img>
            </v-col>

            <!-- Si index est impair, l'image est à gauche, donc le texte est à droite -->
            <v-col cols="7" v-if="index % 2 !== 0">
              <v-card-title class="headline">{{ site.name }}</v-card-title>
              <v-card-subtitle style="color:#353b48">{{ site.city }}</v-card-subtitle>
              <v-card-text>{{ site.category }}</v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import siteBackground1 from '@/assets/sites_background/Fitz - 1.png';
import siteBackground2 from '@/assets/sites_background/Fitz - 2.png';
import siteBackground3 from '@/assets/sites_background/Fitz - 3.png';
import siteBackground4 from '@/assets/sites_background/Fitz - 4.png';
import siteBackground5 from '@/assets/sites_background/Fitz - 5.png';
import siteBackground6 from '@/assets/sites_background/Fitz - 6.png';
import siteBackground7 from '@/assets/sites_background/Fitz - 7.png';
import siteBackground8 from '@/assets/sites_background/Fitz - 8.png';
import siteBackground9 from '@/assets/sites_background/Fitz - 9.png';
import siteBackground10 from '@/assets/sites_background/Fitz - 10.png';
import siteBackground11 from '@/assets/sites_background/Fitz - 11.png';
import siteBackground12 from '@/assets/sites_background/Fitz - 12.png';
import siteBackground13 from '@/assets/sites_background/Fitz - 13.png';
import siteBackground14 from '@/assets/sites_background/Fitz - 14.png';
import siteBackground15 from '@/assets/sites_background/Fitz - 15.png';

export default {
  data() {
    return {
      siteBackgroundImages: [
        siteBackground1,
        siteBackground2,
        siteBackground3,
        siteBackground4,
        siteBackground5,
        siteBackground6,
        siteBackground7,
        siteBackground8,
        siteBackground9,
        siteBackground10,
        siteBackground11,
        siteBackground12,
        siteBackground13,
        siteBackground14,
        siteBackground15,
      ],
      olympicSites: [
        {id: 1, name: "Pierre Menes", city: "Mougins", category: "Stade"},
        {id: 2, name: "Louis 2", city: "Paris", category: "Gymnase"},
        {id: 3, name: "Pierre Menes", city: "Mougins", category: "Stade"},
        {id: 4, name: "Louis 2", city: "Paris", category: "Gymnase"},
        {id: 5, name: "Pierre Menes", city: "Mougins", category: "Stade"},
        {id: 6, name: "Louis 2", city: "Paris", category: "Gymnase"},
        {id: 7, name: "Pierre Menes", city: "Mougins", category: "Stade"},
        {id: 8, name: "Louis 2", city: "Paris", category: "Gymnase"},
        {id: 9, name: "Pierre Menes", city: "Mougins", category: "Stade"},
        {id: 10, name: "Louis 2", city: "Paris", category: "Gymnase"},
        {id: 11, name: "Pierre Menes", city: "Mougins", category: "Stade"},
        {id: 12, name: "Louis 2", city: "Paris", category: "Gymnase"},
        {id: 13, name: "Pierre Menes", city: "Mougins", category: "Stade"},
        {id: 14, name: "Louis 2", city: "Paris", category: "Gymnase"},
        {id: 15, name: "Pierre Menes", city: "Mougins", category: "Stade"},
        {id: 16, name: "Louis 2", city: "Paris", category: "Gymnase"},
        {id: 17, name: "Pierre Menes", city: "Mougins", category: "Stade"},
        {id: 18, name: "Louis 2", city: "Paris", category: "Gymnase"},
        {id: 19, name: "Pierre Menes", city: "Mougins", category: "Stade"},
        {id: 20, name: "Louis 2", city: "Paris", category: "Gymnase"},
        {id: 21, name: "Pierre Menes", city: "Mougins", category: "Stade"},
        {id: 22, name: "Louis 2", city: "Paris", category: "Gymnase"},
        {id: 23, name: "Pierre Menes", city: "Mougins", category: "Stade"},
        {id: 24, name: "Louis 2", city: "Paris", category: "Gymnase"},
        {id: 25, name: "Pierre Menes", city: "Mougins", category: "Stade"},
        {id: 26, name: "Louis 2", city: "Paris", category: "Gymnase"},
        {id: 27, name: "Pierre Menes", city: "Mougins", category: "Stade"},
        {id: 28, name: "Louis 2", city: "Paris", category: "Gymnase"},
      ],
    };
  },
  methods: {
    getColClasses(index) {
      // Change la position du texte de gauche à droite
      return index % 2 === 0 ? 'text-md-left' : 'offset-md-6 text-md-right';
    },
    getCardColor(index) {
      // Change la couleur de fond de la carte pour chaque alternance
      return index % 2 === 0 ? '#E3F2FD' : '#E8EAF6';
    },
    getImagePath(index) {
      return this.siteBackgroundImages[index % this.siteBackgroundImages.length];
    },
  },
};
</script>

<style scoped>
.site-card {
  height: 200px; /* ou la hauteur que vous souhaitez */
}
</style>
