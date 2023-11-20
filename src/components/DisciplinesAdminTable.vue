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
    updateSelectedDiscipline(data) { //Doit update l'objet sur l'api et recuperer l'objet update (update l'objet en base sql)
      if (this.selectedDiscipline && this.selectedDiscipline.length > 0) {
        const selectedId = this.selectedDiscipline[0];
        const index = this.disciplines.findIndex(discipline => discipline.id === selectedId);
        if (index > -1) {
          this.disciplines.at(index).nom = data.disciplineName;
          this.disciplines.at(index).estParalympique = data.estParalympique;
        }
      }
    },
    createDiscipline(data) { //Doit créer l'objet sur l'api et recuperer l'objet créer (l'id genere par la base sql)
      const discipline = {
        id: 100,
        nom: data.disciplineName,
        estParalympique: data.estParalympique,
      };
      this.disciplines.push(discipline);
    },
    deleteSelectedDiscipline() {
      if (this.selectedDiscipline && this.selectedDiscipline.length > 0) {
        const selectedId = this.selectedDiscipline[0];
        const index = this.disciplines.findIndex(discipline => discipline.id === selectedId);
        if (index > -1) {
          this.disciplines.splice(index, 1);
        }
      }
      this.noRowSelected = true;
    },
  },
}
</script>

<style scoped>

</style>