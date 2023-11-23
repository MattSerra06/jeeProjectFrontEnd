<template>
  <div className="home">
    <carousel :items="carouselItems"/>
  </div>
</template>

<script>
import Carousel from "@/components/Carousel.vue";
import axios from "axios";

export default {
  components: {
    Carousel,
  },
  data() {
    return {
      carouselItems: [],
    };
  },
  methods: {
    fetchSites() {
      axios.get('http://localhost:3001/stats/sites') // Remplacez par votre URL de serveur et port
          .then(response => {
            this.carouselItems = response.data.map(([site, sessionCount]) =>
                `${site.nom}: ${sessionCount} sessions`);
            console.log(this.carouselItems);
          })
          .catch(error => {
            console.error("Erreur lors de la récupération des sites: ", error);
          });
    }
  },
  mounted() {
    this.fetchSites();
  }
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
