<template>
  <div>
    <v-btn @click="dialogCreate = true" class="mt-4 mr-4 mb-4" color="green">
      Ajouter Epreuve
    </v-btn>
    <v-btn @click="dialogUpdate = true" class="mt-4 mr-4 mb-4" color="blue" :disabled="noRowSelected">
      Modifier Epreuve
    </v-btn>
    <v-btn @click="deleteSelectedEpreuve" class="mt-4 mr-4 mb-4" color="red" :disabled="noRowSelected">
      Supprimer Epreuve
    </v-btn>
    <v-data-table
        v-model="selectedEpreuve"
        :sort-by="sortBy"
        :headers="headers"
        :items="epreuves"
        :item-key="itemKey"
        class="elevation-1"
        :items-per-page="5"
        :hover="true"
        select-strategy="single"
        show-select
        :single-select=true
    ></v-data-table>
    <epreuves-admin-dialog v-model="dialogUpdate" :dialog-title="updateDialogTitle" @close-dialog="closeDialog"
                        @update-table="updateSelectedEpreuve"></epreuves-admin-dialog>
    <epreuves-admin-dialog v-model="dialogCreate" :dialog-title="createDialogTitle" @close-dialog="closeDialog"
                           @update-table="createEpreuve"></epreuves-admin-dialog>
  </div>
</template>

<script>
import EpreuvesAdminDialog from './EpreuvesAdminDialog.vue';
import axios from "axios";
export default {
  components: {
    'epreuves-admin-dialog': EpreuvesAdminDialog,
  },
  props: {
    epreuves: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      sortBy: [{key: 'id', order: 'asc'}],
      headers: [
        {title: 'Id', key: 'id'},
        {title: 'Discipline', key: 'disciplineNom'},
        {title: 'Nom', key: 'nom'},
      ],
      itemKey: 'id', // Remplacez 'id' par la clé unique de votre objet site
      selectedEpreuve: null,
      noRowSelected: true,
      dialogCreate: false,
      dialogUpdate: false,
      updateDialogTitle: 'Modifier l\'épreuve',
      createDialogTitle: 'Ajouter une épreuve',
    };
  },
  watch: {
    selectedEpreuve: function (newSelectedEpreuve) {
      if (newSelectedEpreuve.length <= 0) {
        this.noRowSelected = true;
      } else {
        this.noRowSelected = false;
      }
    }
  },
  methods:{
    closeDialog() {
      this.dialogCreate = false;
      this.dialogUpdate = false;
    },
    updateSelectedEpreuve(data) {
      if (this.selectedEpreuve && this.selectedEpreuve.length > 0) {
        const selectedId = this.selectedEpreuve[0];

        const updatedEpreuve = {
          disciplineNom: data.disciplineName,
          nom: data.epreuveName,
        };

        axios.put(`http://localhost:3001/epreuve/${selectedId}`, updatedEpreuve)
            .then(response => {
              // Mettez à jour l'épreuve dans le tableau local avec les nouvelles données
              const index = this.epreuves.findIndex(epreuve => epreuve.id === selectedId);
              if (index > -1) {
                this.epreuves.splice(index, 1, response.data);
              }
            })
            .catch(error => {
              console.error('Erreur lors de la modification de l\'épreuve:', error);
            });
      }
    },

    createEpreuve(data) {
      const newEpreuve = {
        disciplineNom: data.disciplineName,
        nom: data.epreuveName,
      };
      axios.post('http://localhost:3001/epreuve/create', newEpreuve)
          .then(response => {
            this.epreuves.push(response.data);
          })
          .catch(error => {
            console.error('Erreur lors de la création de l\'épreuve:', error);
          });
    },
    deleteSelectedEpreuve() {
      if (this.selectedEpreuve && this.selectedEpreuve.length > 0) {
        const selectedId = this.selectedEpreuve[0];

        axios.delete(`http://localhost:3001/epreuve/${selectedId}`)
            .then(() => {
              // Supprimez l'épreuve du tableau local
              const index = this.epreuves.findIndex(epreuve => epreuve.id === selectedId);
              if (index > -1) {
                this.epreuves.splice(index, 1);
              }
            })
            .catch(error => {
              console.error('Erreur lors de la suppression de l\'épreuve:', error);
            });

        this.noRowSelected = true;
      }
    },

  }
}
</script>

<style scoped>

</style>