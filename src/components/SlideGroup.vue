<template>
  <v-sheet class="mx-auto" max-width="600">
    <div class="d-flex justify-center">
    <v-slide-group show-arrows>
      <v-slide-group-item v-for="(discipline, index) in disciplines" :key="index" v-slot="{ isSelected, toggle }">
        <v-btn class="ma-2" rounded :color="isSelected ? 'primary' : undefined" @click="toggle">
          {{ discipline }}
        </v-btn>
      </v-slide-group-item>
    </v-slide-group>
    </div>
  </v-sheet>
</template>

<script>
export default {
  data() {
    return {
      disciplines: ["Natation", "Athlétisme", "Escrime","Judo","Basketball","Tir à l'arc","Tennis","Trampoline"],
    };
  },
};
</script>

<style scoped>
/* Styles spécifiques au composant */
</style>
