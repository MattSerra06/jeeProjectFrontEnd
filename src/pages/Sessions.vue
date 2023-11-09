<template>
  <div className="session">
    <slide-group @select-discipline="setSelectedDiscipline"></slide-group>
    <session-table :sessions="sessions" class="session-table"></session-table>
  </div>
</template>

<script>
import SlideGroup from "@/components/SlideGroup.vue";
import SessionTable from "@/components/SessionTable.vue";

export default {
  name: 'Session',
  components: {
    'slide-group' :SlideGroup,
    'session-table' :SessionTable,
  },
  data() {
    return {
      // Les données des sessions
      sessions: [
        {
          date: '29/10/2023',
          horaire: '11h-12h',
          lieu: 'Stade Louis II',
          epreuve: '100m',
          genre: 'Homme',
        },
        {
          date: '29/10/2023',
          horaire: '14h-15h',
          lieu: 'Stade Louis II',
          epreuve: '400m',
          genre: 'Femme',
        },
        // Ajoutez d'autres sessions selon vos besoins
      ],
      // La discipline sélectionnée
      selectedDiscipline: null,
    };
  },
  methods: {
    setSelectedDiscipline(discipline) {
      this.selectedDiscipline = discipline;
    },
  },
  computed: {
    filteredSessions() {
      if (!this.selectedDiscipline) {
        // Si aucune discipline n'est sélectionnée, retournez toutes les sessions
        return this.sessions;
      }
      // Filtrer les sessions en fonction de la discipline sélectionnée
      return this.sessions.filter(session => session.genre === this.selectedDiscipline);
    },
  },
  // Vous pouvez ajouter des données, des méthodes, etc., si nécessaire
};
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
