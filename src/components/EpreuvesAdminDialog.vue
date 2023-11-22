<template>
  <v-dialog v-model="dialog" width="auto" @keydown.esc="closeDialog">
    <v-card>
      <v-card-title>
        {{ dialogTitle }}
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-autocomplete v-model="disciplineName" :items="disciplines" label="Discipline"></v-autocomplete>
          <v-text-field v-model="epreuveName" label="Nom"></v-text-field>
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
import axios from "axios";

export default {
  props: {
    dialogTitle: {
      type: String,
      default: 'Modifier le site' // Texte par défaut si la prop n'est pas fournie
    }
  },
  data() {
    return {
      disciplineName: '', // Variable pour stocker le nom du site
      epreuveName: '', // Variable pour stocker la ville du site
      disciplines : [],
    };
  },
  mounted() {
    this.fetchDisciplines();
  },
  methods: {
    fetchDisciplines() {
      axios.get('http://localhost:3001/discipline')
          .then(response => {
            // Stockez uniquement les noms des disciplines dans le tableau
            this.disciplines = response.data.map(discipline => discipline.nom);
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des disciplines:', error);
          });
    },
    // Émettre un événement pour fermer le dialogue
    closeDialog() {
      this.$emit('close-dialog');
      this.disciplineName = '';
      this.epreuveName = '';
    },
    saveChanges() {
      this.$emit('update-table',{disciplineName:this.disciplineName,epreuveName:this.epreuveName});
      this.closeDialog();
    },
  },
}
</script>

<style scoped>

</style>