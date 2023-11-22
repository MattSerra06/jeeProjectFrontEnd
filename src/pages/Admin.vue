<template>
  <v-card>
    <v-tabs
        v-model="tab"
        color="deep-purple-accent-4"
        align-tabs="center"
    >
      <v-tab :value="1">Sites</v-tab>
      <v-tab :value="2">Sessions</v-tab>
      <v-tab :value="3">Disciplines</v-tab>
      <v-tab :value="4">Epreuves</v-tab>
    </v-tabs>
    <v-tab-item v-if="tab === 1">
      <v-card>
        <v-card-text>
          <sites-admin-table :sites="sites"></sites-admin-table>
        </v-card-text>
      </v-card>
    </v-tab-item>
    <v-tab-item v-if="tab === 2">
      <v-card>
        <v-card-text>
          <sessions-admin-table :sessions="sessions"></sessions-admin-table>
        </v-card-text>
      </v-card>
    </v-tab-item>
    <v-tab-item v-if="tab === 3">
      <v-card>
        <v-card-text>
          <disciplines-admin-table :disciplines="disciplines"></disciplines-admin-table>
        </v-card-text>
      </v-card>
    </v-tab-item>
    <v-tab-item v-if="tab === 4">
      <v-card>
        <v-card-text>
          <epreuves-admin-table :epreuves="epreuves"></epreuves-admin-table>
        </v-card-text>
      </v-card>
    </v-tab-item>
  </v-card>
</template>

<script>

import SitesAdminTable from "@/components/SitesAdminTable.vue";
import SessionsAdminTable from "@/components/SessionsAdminTable.vue";
import DisciplinesAdminTable from "@/components/DisciplinesAdminTable.vue";
import EpreuvesAdminTable from "@/components/EpreuvesAdminTable.vue"; // Assurez-vous que le chemin d'importation est correct
import axios from 'axios'; // Assurez-vous qu'Axios est importé

export default {
  components: {
    'sites-admin-table': SitesAdminTable,
    'sessions-admin-table': SessionsAdminTable,
    'disciplines-admin-table': DisciplinesAdminTable,
    'epreuves-admin-table': EpreuvesAdminTable,
  },
  data() {
    return {
      tab: 1,
      sites: [],
      sessions: [],
      disciplines: [],
      epreuves: []
    };
  },
  methods: {
    loadSites() {
      axios.get('http://localhost:3001/site')
          .then(response => {
            this.sites = response.data;
          })
          .catch(error => {
            console.error('Erreur lors du chargement des sites:', error);
          });
      axios.get('http://localhost:3001/session')
          .then(response => {
            this.sessions = response.data;
          })
          .catch(error => {
            console.error('Erreur lors du chargement des sites:', error);
          });
      axios.get('http://localhost:3001/discipline')
          .then(response => {
            this.disciplines = response.data;
          })
          .catch(error => {
            console.error('Erreur lors du chargement des sites:', error);
          });
      axios.get('http://localhost:3001/epreuve')
          .then(response => {
            this.epreuves = response.data;
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
