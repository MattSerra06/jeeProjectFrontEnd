<template>
  <div>
    <v-btn @click="dialogCreate = true" class="mt-4 mr-4 mb-4" color="green">
      Ajouter Site
    </v-btn>
    <v-btn @click="dialogUpdate = true" class="mt-4 mr-4 mb-4" color="blue" :disabled="noRowSelected">
      Modifier Site
    </v-btn>
    <v-btn @click="deleteSelectedSite" class="mt-4 mr-4 mb-4" color="red" :disabled="noRowSelected">
      Supprimer Site
    </v-btn>
    <v-data-table
        v-model="selectedSite"
        :sort-by="sortBy"
        :headers="headers"
        :items="sites"
        :item-key="itemKey"
        class="elevation-1"
        :items-per-page="5"
        :hover="true"
        select-strategy="single"
        show-select
        :single-select=true
    ></v-data-table>
    <sites-admin-dialog v-model="dialogUpdate" :dialog-title="updateDialogTitle" @close-dialog="closeDialog"
                        @update-table="updateSelectedSite"></sites-admin-dialog>
    <sites-admin-dialog v-model="dialogCreate" :dialog-title="createDialogTitle" @close-dialog="closeDialog"
                        @update-table="createSite"></sites-admin-dialog>
  </div>
</template>


<script>

import 'vuetify/dist/vuetify.min.css';
import SitesAdminDialog from './SitesAdminDialog.vue';

export default {
  components: {
    'sites-admin-dialog': SitesAdminDialog,
  },
  props: {
    sites: {
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
        {title: 'Ville', key: 'ville'},
        {title: 'Catégorie', key: 'categorie'},
      ],
      itemKey: 'id', // Remplacez 'id' par la clé unique de votre objet site
      selectedSite: null,
      noRowSelected: true,
      dialogCreate: false,
      dialogUpdate: false,
      updateDialogTitle: 'Modifier le site',
      createDialogTitle: 'Ajouter un site',
    };
  },
  watch: {
    selectedSite: function (newSelectedSite) {
      if (newSelectedSite.length <= 0) {
        this.noRowSelected = true;
      } else {
        this.noRowSelected = false;
      }
    }
  },
  methods: {
    updateSelectedSite(data) { //Doit update l'objet sur l'api et recuperer l'objet update (update l'objet en base sql)
      if (this.selectedSite && this.selectedSite.length > 0) {
        const selectedId = this.selectedSite[0];
        const index = this.sites.findIndex(site => site.id === selectedId);
        console.log(this.sites.at(index));
        if (index > -1) {
          this.sites.at(index).nom = data.siteName;
          this.sites.at(index).ville = data.siteCity;
          this.sites.at(index).categorie = data.siteCategory;
        }
      }
    },
    createSite(data) { //Doit créer l'objet sur l'api et recuperer l'objet créer (l'id genere par la base sql)
      const site = {
        id: 100,
        nom: data.siteName,
        ville: data.siteCity,
        categorie: data.siteCategory
      };
      this.sites.push(site);
  },
  deleteSelectedSite() {
    if (this.selectedSite && this.selectedSite.length > 0) {
      const selectedId = this.selectedSite[0];
      const index = this.sites.findIndex(site => site.id === selectedId);
      if (index > -1) {
        this.sites.splice(index, 1);
      }
    }
    this.noRowSelected = true;
  },
  closeDialog() {
    this.dialogCreate = false;
    this.dialogUpdate = false;
  },
}
,
}
;
</script>

<style scoped>

</style>
