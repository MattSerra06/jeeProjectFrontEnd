<template>
  <div>
    <v-btn @click="dialogCreate = true" class="mt-4 mr-4 mb-4" color="green">
      Ajouter Session
    </v-btn>
    <v-btn @click="dialogUpdate = true" class="mt-4 mr-4 mb-4" color="blue" :disabled="noRowSelected">
      Modifier Session
    </v-btn>
    <v-btn @click="deleteSelectedSession" class="mt-4 mr-4 mb-4" color="red" :disabled="noRowSelected">
      Supprimer Session
    </v-btn>
    <v-data-table
        v-model="selectedSession"
        :sort-by="sortBy"
        :headers="headers"
        :items="sessions"
        :item-key="itemKey"
        class="elevation-1"
        :items-per-page="5"
        :hover="true"
        select-strategy="single"
        show-select
        :single-select=true
    ></v-data-table>
    <sessions-admin-dialog v-model="dialogUpdate" :dialog-title="updateDialogTitle" @close-dialog="closeDialog"
                           @update-table="updateSelectedSession"></sessions-admin-dialog>
    <sessions-admin-dialog v-model="dialogCreate" :dialog-title="createDialogTitle" @close-dialog="closeDialog"
                           @update-table="createSession"></sessions-admin-dialog>
  </div>
</template>

<script>
import SessionsAdminDialog from "@/components/SessionsAdminDialog.vue";
import axios from "axios";

export default {
  components: {
    'sessions-admin-dialog': SessionsAdminDialog,
  },
  props: {
    sessions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      sortBy: [{key: 'id', order: 'asc'}],
      headers: [
        {title: 'Id', key: 'id'},
        {title: 'Code', key: 'codeSession'},
        {title: 'Date', key: 'date'},
        {title: 'Heure de début', key: 'heureDebut'},
        {title: 'Heure de fin', key: 'heureFin'},
        {title: 'Discipline', key: 'disciplineName'},
        {title: 'Epreuve',key:'epreuveName'},
        {title: 'Site', key: 'siteName'},
        {title: 'Description', key: 'description'},
        {title: 'Type session', key: 'typeSession'},
      ],
      itemKey: 'id', // Remplacez 'id' par la clé unique de votre objet site
      selectedSession: null,
      noRowSelected: true,
      dialogCreate: false,
      dialogUpdate: false,
      updateDialogTitle: 'Modifier la session',
      createDialogTitle: 'Ajouter une session',
    };
  },
  watch: {
    dialog: function (newDialog) {
      console.log('Valeur de dialog:', newDialog);
    },
    selectedSession: function (newSelectedSession) {
      if (newSelectedSession.length <= 0) {
        this.noRowSelected = true;
      } else {
        this.noRowSelected = false;
      }
    }
  },
  methods: {
    updateSelectedSession(data) {
      if (this.selectedSession && this.selectedSession.length > 0) {
        const selectedId = this.selectedSession[0];

        const updatedSession = {
          codeSession: data.sessionCode,
          date: data.sessionDate,
          heureDebut: data.sessionHeureDebut,
          heureFin: data.sessionHeureFin,
          disciplineName: data.discipline,
          epreuveName: data.epreuveName,
          siteName: data.site,
          description: data.description,
          typeSession: data.sessionType,
        };

        axios.put(`http://localhost:3001/session/${selectedId}`, updatedSession)
            .then(response => {
              // Mettez à jour la session dans le tableau local avec les nouvelles données
              const index = this.sessions.findIndex(session => session.id === selectedId);
              if (index > -1) {
                this.sessions.splice(index, 1, response.data);
              }
            })
            .catch(error => {
              console.error('Erreur lors de la modification de la session:', error);
            });
      }
    },

    createSession(data) {
      const newSession = {
        codeSession: data.sessionCode,
        date: data.sessionDate,
        heureDebut: data.sessionHeureDebut,
        heureFin: data.sessionHeureFin,
        disciplineName: data.discipline,
        epreuveName: data.epreuveName,
        siteName: data.site,
        description: data.description,
        typeSession: data.sessionType,
      };
      axios.post('http://localhost:3001/session/create', newSession)
          .then(response => {
            // Ajoutez la session retournée par l'API à votre tableau local
            this.sessions.push(response.data);
          })
          .catch(error => {
            this.$notify({
              type : 'error',
              title: 'Recouvrement entre 2 sessions',
              text: 'Il y a déjà une session sur ce créneau horaire pour cette discipline'
            });
          });
    },
    deleteSelectedSession() {
      if (this.selectedSession && this.selectedSession.length > 0) {
        const selectedId = this.selectedSession[0];

        axios.delete(`http://localhost:3001/session/${selectedId}`)
            .then(() => {
              // Supprimez la session du tableau local
              const index = this.sessions.findIndex(session => session.id === selectedId);
              if (index > -1) {
                this.sessions.splice(index, 1);
              }
            })
            .catch(error => {
              console.error('Erreur lors de la suppression de la session:', error);
            });

        this.noRowSelected = true;
      }
    },

    closeDialog() {
      this.dialogCreate = false;
      this.dialogUpdate =false;
    },
  },
}
</script>

<style scoped>

</style>