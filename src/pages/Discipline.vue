<template>
  <div class="ma-5">
    <v-expansion-panels class="pa-4">
      <v-expansion-panel v-for="(discipline, index) in disciplines" :key="index" class="mb-3">
        <v-expansion-panel-title>{{ discipline.name }}</v-expansion-panel-title>
        <v-expansion-panel-text>
          <ul>
            <li v-for="event in discipline.events" :key="event">
              {{ event }}
            </li>
          </ul>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  data() {
    return {
      disciplines: [
        {
          name: 'Natation',
          events: ['50m nage libre', '100m nage libre', '200m quatre nages']
        },
        {
          name: 'Athlétisme',
          events: ['100m', 'Marathon', 'Saut en longueur']
        },
        // Ajoutez d'autres disciplines ici
      ],
    };
  },
};
</script>
