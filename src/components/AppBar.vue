<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title>Jeux Olympiques Paris 2024</v-toolbar-title>
    <v-spacer></v-spacer>
    <router-link to="/" class="nav-link">
      <v-btn text>Accueil</v-btn>
    </router-link>
    <router-link to="/sites" class="nav-link">
      <v-btn text>Sites</v-btn>
    </router-link>
    <router-link to="/disciplines" class="nav-link">
      <v-btn text>Disciplines</v-btn>
    </router-link>
    <router-link to="/sessions" class="nav-link">
      <v-btn text>Sessions</v-btn>
    </router-link>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    toggleDrawer() {
      this.$emit('toggle-drawer');
    }
  }
};
</script>

<style scoped>
.nav-link {
  text-decoration: none;
  color: inherit; /* Utilisez la couleur par défaut du texte (noir ou selon votre thème) */
}
</style>
