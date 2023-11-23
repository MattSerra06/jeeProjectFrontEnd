<template>
  <div className="session">
    <slide-group :disciplines="disciplines" @select-discipline="setSelectedDiscipline"></slide-group>
    <session-table :sessions="filteredSessions" class="session-table"></session-table>
  </div>
</template>

<script>
import SlideGroup from "@/components/SlideGroup.vue";
import SessionTable from "@/components/SessionTable.vue";
import axios from "axios";

export default {
  name: 'Session',
  components: {
    'slide-group': SlideGroup,
    'session-table': SessionTable,
  },
  data() {
    return {
      disciplines: [],
      // Les données des sessions
      sessions: [],
      // La discipline sélectionnée
      selectedDiscipline: null,
    };
  },
  methods: {
    setSelectedDiscipline(discipline) {
      this.selectedDiscipline = discipline;
    },
    loadSites() {
      axios.get('http://localhost:3001/session') // Remplacez par l'URL de votre API
          .then(response => {
            this.sessions = response.data;
          })
          .catch(error => {
            console.error('Erreur lors du chargement des sessions:', error);
          });
      axios.get('http://localhost:3001/discipline') // Remplacez par l'URL de votre API
          .then(response => {
            this.disciplines = response.data;
          })
          .catch(error => {
            console.error('Erreur lors du chargement des sites:', error);
          });
    },
  },
  computed: {
    filteredSessions() {
      if (!this.selectedDiscipline) {
        return this.sessions;
      }
      return this.sessions.filter(session => session.disciplineName === this.selectedDiscipline.nom);
    }
  },
  mounted() {
    this.loadSites();
  },
// Vous pouvez ajouter des données, des méthodes, etc., si nécessaire
}
;
</script>

<style scoped>
/* Styles spécifiques au composant Session */
.session {
  padding: 20px;
}

.session-table {
  margin-top: 20px; /* Ajoute de l'espace en haut de la table */
}
</style>
