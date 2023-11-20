
<template>
  <v-data-table
      v-model:sort-by="sortBy"
      :headers="headers"
      :items="sessions"
      :items-per-page="5"
      class="elevation-1"
  ></v-data-table>
</template>

<script>

import 'vuetify/dist/vuetify.min.css';


export default {
  props: {
    sessions: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      sortBy: [{ key: 'date', order: 'asc'}],
      headers: [
        {title: 'Code', key: 'codeSession'},
        {title: 'Date', key: 'date'},
        {title: 'Heure de début', key: 'heureDebut'},
        {title: 'Heure de fin', key: 'heureFin'},
        {title: 'Discipline', key: 'disciplineName'},
        {title: 'Epreuve', key:'epreuveName'},
        {title: 'Site', key: 'siteName'},
        {title: 'Description', key: 'description'},
        {title: 'Type session', key: 'typeSession'},
      ],
    };
  }
};
</script>

