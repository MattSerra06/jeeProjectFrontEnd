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
          <v-autocomplete v-model="discipline" :items="disciplines" label="Discipline" @change="onDisciplineChange"></v-autocomplete>
          <v-autocomplete v-model="epreuve" :items="epreuves" label="Epreuve" :disabled="epreuves.length === 0"></v-autocomplete>
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
import axios from "axios";

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
      epreuve:'',
      site: '',
      description: '',
      sessionType: '',
      disciplines: [],
      epreuves: [],
      sites: [],
      types: ["Qualifications","Médailles"],
    };
  },
  watch: {
    discipline(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.onDisciplineChange();
      }
    }
  },
  methods: {
    fetchDisciplines() {
      axios.get('http://localhost:3001/discipline')
          .then(response => {
            // Remplissez le tableau 'disciplines' avec les noms des disciplines
            this.disciplines = response.data.map(discipline => discipline.nom);
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des disciplines:', error);
          });
    },
    onDisciplineChange() {
      if (this.discipline) {
        this.fetchEpreuvesByDiscipline(this.discipline);
      } else {
        this.epreuves = [];
      }
    },
    fetchEpreuvesByDiscipline(disciplineName) {
      axios.get(`http://localhost:3001/epreuve/discipline/${disciplineName}`)
          .then(response => {
            this.epreuves = response.data.map(epreuve => epreuve.nom);
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des épreuves:', error);
            this.epreuves = [];
          });
    },
    fetchSites() {
      axios.get('http://localhost:3001/site')
          .then(response => {
            // Supposons que l'API retourne un champ 'nom' pour chaque site
            this.sites = response.data.map(site => site.nom);
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des sites:', error);
          });
    },
    // Émettre un événement pour fermer le dialogue
    closeDialog() {
      this.$emit('close-dialog');
      this.sessionCode = ''; // Variable pour stocker le nom du site
      this.sessionDate = ''; // Variable pour stocker la ville du site
      this.sessionHeureDebut = ''; // Variable pour stocker la catégorie du site
      this.sessionHeureFin = '';
      this.discipline = '';
      this.epreuve ='';
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
        epreuveName: this.epreuve,
        site:this.site,
        description:this.description,
        sessionType:this.sessionType,
      });
      this.closeDialog();
    },
  },
  mounted() {
    this.fetchDisciplines();
    this.fetchSites();
  }
}
</script>

<style scoped>

</style>