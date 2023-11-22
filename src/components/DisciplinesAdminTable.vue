<template>
  <div>
    <v-btn @click="dialogCreate = true" class="mt-4 mr-4 mb-4" color="green">
      Ajouter Discipline
    </v-btn>
    <v-btn @click="dialogUpdate = true" class="mt-4 mr-4 mb-4" color="blue" :disabled="noRowSelected">
      Modifier Discipline
    </v-btn>
    <v-btn @click="deleteSelectedDiscipline" class="mt-4 mr-4 mb-4" color="red" :disabled="noRowSelected">
      Supprimer Discipline
    </v-btn>
    <v-data-table
        v-model="selectedDiscipline"
        :sort-by="sortBy"
        :headers="headers"
        :items="disciplines"
        :item-key="itemKey"
        class="elevation-1"
        :items-per-page="5"
        :hover="true"
        select-strategy="single"
        show-select
        :single-select=true
    ></v-data-table>
    <disciplines-admin-dialog v-model="dialogCreate" :dialog-title="createDialogTitle" @close-dialog="closeDialog" @update-table="createDiscipline"></disciplines-admin-dialog>
    <disciplines-admin-dialog v-model="dialogUpdate" :dialog-title="updateDialogTitle" @close-dialog="closeDialog" @update-table="updateSelectedDiscipline"></disciplines-admin-dialog>

  </div>
</template>

<script>
import DisciplinesAdminDialog from "@/components/DisciplinesAdminDialog.vue";
import axios from "axios";

export default {
  components : {
    'disciplines-admin-dialog' : DisciplinesAdminDialog,
  },
  props: {
    disciplines: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      sortBy: [{key: 'id', order: 'asc'}],
      headers: [
        {title: 'Id', key: 'id'},
        {title: 'Nom', key: 'nom'},
        {title: 'Est paralympique', key: 'estParalympique'},
      ],
      itemKey: 'id', // Remplacez 'id' par la clé unique de votre objet site
      selectedDiscipline: null,
      noRowSelected: true,
      dialogCreate: false,
      dialogUpdate: false,
      updateDialogTitle: 'Modifier la discipline',
      createDialogTitle: 'Ajouter une discipline',
    };
  },
  watch: {
    selectedDiscipline: function (newSelectedSite) {
      if (newSelectedSite.length <= 0) {
        this.noRowSelected = true;
      } else {
        this.noRowSelected = false;
      }
    }
  },
  methods : {
    closeDialog() {
      this.dialogCreate = false;
      this.dialogUpdate = false;
    },
    updateSelectedDiscipline(data) {
      if (this.selectedDiscipline && this.selectedDiscipline.length > 0) {
        const selectedId = this.selectedDiscipline[0];

        const updatedDiscipline = {
          nom: data.disciplineName,
          estParalympique: data.estParalympique,
        };
        axios.put(`http://localhost:3001/discipline/${selectedId}`, updatedDiscipline)
            .then(response => {
              console.log(response.data);
              const index = this.disciplines.findIndex(discipline => discipline.id === selectedId);
              if (index > -1) {
                this.disciplines.splice(index, 1, response.data);
              }
            })
            .catch(error => {
              console.error('Erreur lors de la modification de la discipline:', error);
            });
      }
    },

    createDiscipline(data) { //Doit créer l'objet sur l'api et recuperer l'objet créer (l'id genere par la base sql)
      const newDiscipline = {
        nom: data.disciplineName,
        estParalympique: data.estParalympique,
      };

      axios.post('http://localhost:3001/discipline/create', newDiscipline)
          .then(response => {
            this.disciplines.push(response.data);
          })
          .catch(error => {
            console.error('Erreur lors de la création de la discipline:', error);
          });
    },
    deleteSelectedDiscipline() {
      if (this.selectedDiscipline && this.selectedDiscipline.length > 0) {
        const selectedId = this.selectedDiscipline[0];

        axios.delete(`http://localhost:3001/discipline/${selectedId}`)
            .then(() => {
              // Supprimez la discipline du tableau local
              const index = this.disciplines.findIndex(discipline => discipline.id === selectedId);
              if (index > -1) {
                this.disciplines.splice(index, 1);
              }
            })
            .catch(error => {
              console.error('Erreur lors de la suppression de la discipline:', error);
            });

        this.noRowSelected = true;
      }
    },

  },
}
</script>

<style scoped>

</style>