<template>
  <v-navigation-drawer v-model="drawerVisible" permanent>
    <v-list class="fill-height">
      <v-list-item
          title="Prénom Nom"
      ></v-list-item>
      <v-divider></v-divider>
      <v-list-item-group class="fill-height">
        <router-link to="/login" class="nav-link">
          <v-list-item prepend-icon="mdi-account-arrow-up" title="Connexion" value="login" @click="closeDialog"></v-list-item>
        </router-link>
        <router-link to="/admin" class="nav-link">
          <v-list-item prepend-icon="mdi-wrench" title="Administration" value="admin" @click="closeDialog"></v-list-item>
        </router-link>
      </v-list-item-group>
    </v-list>
    <template v-slot:append>
      <v-list>
        <v-list-item-group>
          <v-list-item prepend-icon="mdi-logout" title="Déconnexion" value="logout"></v-list-item>
        </v-list-item-group>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawerVisible: true, // Initialisez la visibilité du tiroir de navigation à false par défaut
    };
  },
  methods: {
    closeDialog(){
      this.$emit('close');
    },
    logout() {
      // Implémentez la logique de déconnexion ici
      console.log('Déconnexion utilisateur');
      // Par exemple : this.$router.push('/login');
    },
  },
  watch: {
    drawerVisible(newValue) {
      console.log('La valeur de drawerVisible a changé :', newValue);
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
