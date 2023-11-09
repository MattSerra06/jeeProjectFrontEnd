<template>
  <div id="app">
    <!-- En-tête global -->
    <v-app>
      <navigation-drawer v-model="drawerVisible" @close="toggleDrawer"></navigation-drawer>
      <app-bar @toggle-drawer="toggleDrawer"></app-bar>
      <!-- Contenu de la page actuelle (chargé via <router-view>) -->
      <div class="app-content">
      <router-view></router-view>
      </div>
    </v-app>
  </div>
</template>

<script>
import AppBar from './components/AppBar.vue';
import NavigationDrawer from "@/components/NavigationDrawer.vue";

export default {
  components: {
    'navigation-drawer' : NavigationDrawer,
    'app-bar': AppBar,
  },
  data() {
    return {
      drawerVisible: false, // Le tiroir de navigation est masqué par défaut
    };
  },
  methods: {
    toggleDrawer() {
      this.drawerVisible = !this.drawerVisible;// Inverse la visibilité du tiroir de navigation
      console.log(this.drawerVisible);
    },
  },
};
</script>

<style>
/* Styles globaux pour le pied de page */
#app {
  font-family: Arial, sans-serif;
  color: #333;
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Prend 100% de la hauteur de la fenêtre visible */
}

footer {
  background-color: #333; /* Gris foncé */
  text-align: center;
  padding: 10px;
}


.app-content{
  padding-top: 64px;
}
</style>
