<template>
  <v-dialog v-model="dialog" width="auto" @keydown.esc="closeDialog">
    <v-card>
      <v-card-title>
        {{ dialogTitle }}
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field v-model="sessionCode" label="Code de session"></v-text-field>
          <v-text-field v-model="sessionDate" label="Date de la session" type="date"></v-text-field>
          <v-text-field v-model="sessionHeureDebut" label="Heure de début" type="time"></v-text-field>
          <v-text-field v-model="sessionHeureFin" label="Heure de Fin" type="time"></v-text-field>
          <v-autocomplete v-model="discipline" :items="disciplines" label="Discipline"></v-autocomplete>
          <v-autocomplete v-model="site" :items="sites" label="Site"></v-autocomplete>
          <v-text-field v-model="description" label="Description"></v-text-field>
          <v-select v-model="sessionType" :items="types" label="Type de session"></v-select>
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
      default: 'Modifier la session' // Texte par défaut si la prop n'est pas fournie
    }
  },
  data() {
    return {
      sessionCode: '', // Variable pour stocker le nom du site
      sessionDate: '', // Variable pour stocker la ville du site
      sessionHeureDebut: '', // Variable pour stocker la catégorie du site
      sessionHeureFin: '',
      discipline: '',
      site: '',
      description: '',
      sessionType: '',
      disciplines: ['Athlétisme', 'Judo', 'Basketball'],
      sites: ['Piscine Louis II', 'Gymnase Jean Pascal'],
      types: ['Qualifications', 'Médailles'],
    };
  },
  methods: {
    // Émettre un événement pour fermer le dialogue
    closeDialog() {
      this.$emit('close-dialog');
      this.sessionCode = ''; // Variable pour stocker le nom du site
      this.sessionDate = ''; // Variable pour stocker la ville du site
      this.sessionHeureDebut = ''; // Variable pour stocker la catégorie du site
      this.sessionHeureFin = '';
      this.discipline = '';
      this.site = '';
      this.description = '';
      this.sessionType = '';
    },
    saveChanges() {
      this.$emit('update-table', {
        sessionCode: this.sessionCode,
        sessionDate: this.sessionDate,
        sessionHeureDebut: this.sessionHeureDebut,
        sessionHeureFin: this.sessionHeureFin,
        discipline: this.discipline,
        site:this.site,
        description:this.description,
        sessionType:this.sessionType,
      });
      this.closeDialog();
    },
  },
}
</script>

<style scoped>

</style>