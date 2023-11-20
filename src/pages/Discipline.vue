<template>
  <div class="ma-5">
    <v-expansion-panels class="pa-4">
      <v-expansion-panel v-for="(discipline, index) in disciplines" :key="index" class="mb-3">
        <v-expansion-panel-title>{{ discipline.name }}</v-expansion-panel-title>
        <v-expansion-panel-text>
          <ul>
            <li v-for="event in discipline.events" :key="event">
              {{ event }}
            </li>
          </ul>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      disciplines: [
      ],
    };
  },
  methods: {
    loadSites() {
      axios.get('http://localhost:3001/epreuve/disciplines')
          .then(response => {
            const groupedByDiscipline = response.data.reduce((acc, epreuve) => {
              // Si la discipline n'est pas encore dans l'accumulateur, l'ajouter
              if (!acc[epreuve.disciplineNom]) {
                acc[epreuve.disciplineNom] = { name: epreuve.disciplineNom, events: [] };
              }
              // Ajouter l'épreuve à la liste des épreuves de la discipline
              acc[epreuve.disciplineNom].events.push(epreuve.nom);
              return acc;
            }, {});

            // Transformer l'objet en tableau
            this.disciplines = Object.values(groupedByDiscipline);
            console.log(this.disciplines);
          })
          .catch(error => {
            console.error('Erreur lors du chargement des sites:', error);
          });
    },
  },
  mounted() {
    this.loadSites();
  },
};
</script>
