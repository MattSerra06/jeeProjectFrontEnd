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

export default {
  components: {
    'sites-admin-table': SitesAdminTable,
    'sessions-admin-table': SessionsAdminTable,
    'disciplines-admin-table': DisciplinesAdminTable,
    'epreuves-admin-table' : EpreuvesAdminTable,
  },
  data() {
    return {
      tab: 1,
      sites: [
        {id: 1, name: "Pierre Menes", city: "Mougins", category: "Stade"},
        {id: 2, name: "Louis 2", city: "Paris", category: "Gymnase"},
        {id: 3, name: "Pierre Menes", city: "Mougins", category: "Stade"},
        {id: 4, name: "Louis 2", city: "Paris", category: "Gymnase"},
        {id: 5, name: "Pierre Menes", city: "Mougins", category: "Stade"},
        {id: 6, name: "Louis 2", city: "Paris", category: "Gymnase"},
        {id: 7, name: "Pierre Menes", city: "Mougins", category: "Stade"},
        {id: 8, name: "Louis 2", city: "Paris", category: "Gymnase"},
        {id: 9, name: "Pierre Menes", city: "Mougins", category: "Stade"},
        {id: 10, name: "Louis 2", city: "Paris", category: "Gymnase"},
        {id: 11, name: "Pierre Menes", city: "Mougins", category: "Stade"},
        {id: 12, name: "Louis 2", city: "Paris", category: "Gymnase"},
        {id: 13, name: "Pierre Menes", city: "Mougins", category: "Stade"},
        {id: 14, name: "Louis 2", city: "Paris", category: "Gymnase"},
        {id: 15, name: "Pierre Menes", city: "Mougins", category: "Stade"},
        {id: 16, name: "Louis 2", city: "Paris", category: "Gymnase"},
        {id: 17, name: "Pierre Menes", city: "Mougins", category: "Stade"},
        {id: 18, name: "Louis 2", city: "Paris", category: "Gymnase"},
        {id: 19, name: "Pierre Menes", city: "Mougins", category: "Stade"},
        {id: 20, name: "Louis 2", city: "Paris", category: "Gymnase"},
        {id: 21, name: "Pierre Menes", city: "Mougins", category: "Stade"},
        {id: 22, name: "Louis 2", city: "Paris", category: "Gymnase"},
        {id: 23, name: "Pierre Menes", city: "Mougins", category: "Stade"},
        {id: 24, name: "Louis 2", city: "Paris", category: "Gymnase"},
        {id: 25, name: "Pierre Menes", city: "Mougins", category: "Stade"},
        {id: 26, name: "Louis 2", city: "Paris", category: "Gymnase"},
        {id: 27, name: "Pierre Menes", city: "Mougins", category: "Stade"},
        {id: 28, name: "Louis 2", city: "Paris", category: "Gymnase"},
      ],
      sessions: [
        {
          id: 1,
          code: "ESC01",
          date: "26/07",
          heureDebut: "11h30",
          heureFin: "13h30",
          discipline: "Escrime",
          site: "Stade Louis II",
          description: "L'escrime c'est top",
          sessionType: "Qualifications"
        },
        {
          id: 2,
          code: "ESC01",
          date: "26/07",
          heureDebut: "12h30",
          heureFin: "14h30",
          discipline: "Escrime",
          site: "Stade Louis II",
          description: "L'escrime c'est top",
          sessionType: "Qualifications"
        },
        {
          id: 3,
          code: "ESC01",
          date: "26/07",
          heureDebut: "13h30",
          heureFin: "15h30",
          discipline: "Escrime",
          site: "Stade Louis II",
          description: "L'escrime c'est top",
          sessionType: "Qualifications"
        },
        {
          id: 4,
          code: "ESC01",
          date: "26/07",
          heureDebut: "14h30",
          heureFin: "16h30",
          discipline: "Escrime",
          site: "Stade Louis II",
          description: "L'escrime c'est top",
          sessionType: "Qualifications"
        },
        {
          id: 5,
          code: "ESC01",
          date: "26/07",
          heureDebut: "15h30",
          heureFin: "17h30",
          discipline: "Escrime",
          site: "Stade Louis II",
          description: "L'escrime c'est top",
          sessionType: "Qualifications"
        },
      ],
      disciplines: [
        {id: 1, name: "Natation", estParalympique: "Oui"},
        {id: 2, name: "Athlétisme", estParalympique: "Non"},
      ],
      epreuves : [
        {id: 1, discipline:"Natation", name:"50m"},
        {id: 2, discipline:"Athlétisme", name:"100m"},
      ]
    };
  },
};
</script>
