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
              <v-card-title class="headline">{{ site.nom }}</v-card-title>
              <v-card-subtitle style="color:#353b48">{{ site.ville }}</v-card-subtitle>
              <v-card-text>{{ site.categorie }}</v-card-text>

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
              <v-card-title class="headline">{{ site.nom }}</v-card-title>
              <v-card-subtitle style="color:#353b48">{{ site.ville }}</v-card-subtitle>
              <v-card-text>{{ site.categorie}}</v-card-text>
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
import axios from "axios";

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
      olympicSites: [],
    };
  },
  methods: {
    loadSites() {
      axios.get('http://localhost:3001/site') // Remplacez par l'URL de votre API
          .then(response => {
            this.olympicSites = response.data;
            console.log(response.data);
            console.log(this.olympicSites);
          })
          .catch(error => {
            console.error('Erreur lors du chargement des sites:', error);
          });
    },
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
  mounted() {
    this.loadSites();
  },
};
</script>

<style scoped>
.site-card {
  height: 200px; /* ou la hauteur que vous souhaitez */
}
</style>
