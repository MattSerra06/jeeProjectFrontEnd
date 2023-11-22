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
import axios from "axios";

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
    updateSelectedSite(data) {
      console.log(data);
      if (this.selectedSite && this.selectedSite.length > 0) {
        const selectedId = this.selectedSite[0];
        const index = this.sites.findIndex(site => site.id === selectedId);
        if (index > -1) {
          const newSite = {
            nom: data.siteName,
            ville: data.siteCity,
            categorie: data.siteCategory.toUpperCase().replace(/\s+/g, '_')
          };
          axios.put('http://localhost:3001/site/'+selectedId, newSite)
              .then(response => {
                this.sites.at(index).nom=response.data.nom;
                this.sites.at(index).ville=response.data.ville;
                this.sites.at(index).categorie=response.data.categorie;
              })
              .catch(error => {
                console.error('Erreur lors de la création du site:', error);
              });
        }
      }
    },

    createSite(data) {
      const newSite = {
        nom: data.siteName,
        ville: data.siteCity,
        categorie: data.siteCategory.toUpperCase().replace(/\s+/g, '_')
      };
      axios.post('http://localhost:3001/site/create', newSite)
          .then(response => {
            this.sites.push(response.data)
          })
          .catch(error => {
            console.error('Erreur lors de la création du site:', error);
          });
  },

  deleteSelectedSite() {
    if (this.selectedSite && this.selectedSite.length > 0) {
      const selectedId = this.selectedSite[0];
      const index = this.sites.findIndex(site => site.id === selectedId);
      if (index > -1) {
        axios.delete(`http://localhost:3001/site/${selectedId}`)
            .then(() => {
              // Supprimer le site de la liste des sites après la suppression réussie
              this.sites.splice(index, 1);
            })
            .catch(error => {
              console.error('Erreur lors de la suppression du site:', error);
            });
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
