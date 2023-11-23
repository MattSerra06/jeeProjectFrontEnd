<template>
  <v-navigation-drawer v-model="drawerVisible" permanent @input="updateUserNames">
    <v-list class="fill-height">
      <v-list-item-title>{{ userFullName }}</v-list-item-title>
      <v-divider></v-divider>
        <router-link to="/login" class="nav-link">
          <v-list-item v-if="!isLoggedIn" prepend-icon="mdi-account-arrow-up" title="Connexion" value="login" @click="closeDialog"></v-list-item>
        </router-link>
        <router-link to="/admin" class="nav-link">
          <v-list-item prepend-icon="mdi-wrench" title="Administration" value="admin" @click="closeDialog"></v-list-item>
        </router-link>
    </v-list>
    <template v-slot:append>
      <v-list>
          <v-list-item v-if="isLoggedIn" prepend-icon="mdi-logout" title="Déconnexion" value="logout" @click="logout"></v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
import {EventBus} from "@/eventBus";

export default {
  data() {
    return {
      drawerVisible: true, // Initialisez la visibilité du tiroir de navigation à false par défaut
      userFullName: '',
    };
  },
  computed: {
    isLoggedIn() {
      const firstName = localStorage.getItem('firstName');
      const lastName = localStorage.getItem('lastName');
      this.userFullName = firstName && lastName ? `${firstName} ${lastName}` : '';
      return EventBus.getState().isLoggedIn;
    },
  },
  methods: {
    closeDialog(){
      this.$emit('close');
    },

    logout() {
      this.closeDialog();
      // Supprimez le token JWT et d'autres données d'authentification du localStorage
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('firstName');
      localStorage.removeItem('lastName');


      // Redirigez l'utilisateur vers la page de connexion ou la page d'accueil
      this.$router.push('/login');
      EventBus.logout();
      console.log('Déconnexion utilisateur');
    },
  },
  watch: {
    drawerVisible(newValue) {
    },
  },
}
</script>

<style scoped>

.nav-link {
  text-decoration: none;
  color: inherit; /* Utilisez la couleur par défaut du texte (noir ou selon votre thème) */
}

</style>
