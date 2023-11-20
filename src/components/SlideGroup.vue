  <template>
    <v-sheet class="mx-auto" max-width="600">
      <div class="d-flex justify-center">
        <v-slide-group show-arrows>
          <v-slide-group-item v-for="(discipline, index) in disciplines" :key="index" v-slot="{ isSelected, toggle }">
            <v-btn class="ma-2" rounded :color="isSelected ? 'primary' : undefined" @click="handleClick(discipline,toggle)">
              {{ discipline.nom }}
            </v-btn>
          </v-slide-group-item>
        </v-slide-group>
      </div>
    </v-sheet>
  </template>

  <script>
  export default {
    props: {
      disciplines: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        selectedDiscipline: null,
      };
    },
    methods: {
      handleClick(discipline, toggleFunction) {
        if (this.selectedDiscipline && this.selectedDiscipline.nom === discipline.nom) {
          this.selectedDiscipline = null; // Désélectionner la discipline
          toggleFunction();
          this.$emit('select-discipline', null); // Émettre un événement pour désélectionner
        } else {
          this.selectedDiscipline = discipline; // Mise à jour de la discipline sélectionnée
          toggleFunction(); // Mettre à jour l'état visuel du bouton
          this.$emit('select-discipline', discipline); // Émettre l'événement pour sélectionner
        }
      },
      selectDiscipline(discipline) {
        this.$emit('select-discipline', discipline);
      },
    },
  };
  </script>

  <style scoped>
  /* Styles spécifiques au composant */
  </style>
