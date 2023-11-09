<template>
  <v-dialog v-model="dialog" width="auto" @keydown.esc="closeDialog">
    <v-card>
      <v-card-title>
        {{ dialogTitle }}
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field v-model="siteName" label="Nom du site"></v-text-field>
          <v-text-field v-model="siteCity" label="Ville du site"></v-text-field>
          <v-select v-model="siteCategory" :items="categories" label="Catégorie"></v-select>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="saveChanges">Enregistrer</v-btn>
        <v-btn color="primary" @click="closeDialog">Fermer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialogTitle: {
      type: String,
      default: 'Modifier le site' // Texte par défaut si la prop n'est pas fournie
    }
  },

  data() {
    return {
      siteName: '', // Variable pour stocker le nom du site
      siteCity: '', // Variable pour stocker la ville du site
      siteCategory: 'Stade', // Variable pour stocker la catégorie du site
      categories: ['Stade', 'Salle de spectacle', 'Lieu public','Centre aquatique'], // Options de la catégorie
    };
  },
  methods: {
    // Émettre un événement pour fermer le dialogue
    closeDialog() {
      this.$emit('close-dialog');
      this.siteName = '';
      this.siteCity = '';
      this.siteCategory = 'Stade';
    },
    // Méthode pour enregistrer les modifications (à implémenter selon votre logique)
    saveChanges() {
      this.$emit('update-table',{siteName:this.siteName,siteCity:this.siteCity,siteCategory:this.siteCategory});
      this.closeDialog();
    },
  },
};
</script>

<style scoped>
/* Styles spécifiques au composant */
</style>
