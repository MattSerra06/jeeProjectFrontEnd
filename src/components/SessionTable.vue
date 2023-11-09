
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
        { title: 'Date', key: 'date' },
        { title: 'Horaire', key: 'horaire' },
        { title: 'Lieu', key: 'lieu' },
        { title: 'Épreuve', key: 'epreuve' },
        { title: 'Genre', key: 'genre' }
      ],
    };
  }
};
</script>

