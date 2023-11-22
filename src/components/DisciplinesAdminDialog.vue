<template>
  <v-dialog v-model="dialog" width="auto" @keydown.esc="closeDialog">
    <v-card>
      <v-card-title>
        {{ dialogTitle }}
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field v-model="disciplineName" label="Discipline"></v-text-field>
          <v-select v-model="estParalympique" :items="estParalympiqueChoix" label="Est paralympique"></v-select>
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
      disciplineName : '',
      estParalympique :'', // Variable pour stocker le nom du site
      estParalympiqueChoix: ['True','False'], // Variable pour stocker la ville du site
    };
  },
  methods: {
    // Émettre un événement pour fermer le dialogue
    closeDialog() {
      this.$emit('close-dialog');
      this.disciplineName = '';
      this.estParalympique = '';
    },
    // Méthode pour enregistrer les modifications (à implémenter selon votre logique)
    saveChanges() {
      this.$emit('update-table',{disciplineName:this.disciplineName,estParalympique:this.estParalympique});
      this.closeDialog();
    },
  },
};
</script>

<style scoped>
/* Styles spécifiques au composant */
</style>
