<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="text-h5">Créer un compte</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                  v-model="register.firstName"
                  label="Prénom"
                  prepend-icon="mdi-account"
                  required
              ></v-text-field>
              <v-text-field
                  v-model="register.lastName"
                  label="Nom"
                  prepend-icon="mdi-account"
                  required
              ></v-text-field>
              <v-text-field
                  v-model="register.username"
                  label="Nom d'utilisateur"
                  prepend-icon="mdi-account-circle"
                  required
              ></v-text-field>
              <v-text-field
                  v-model="register.password"
                  label="Mot de passe"
                  :type="!showPassword ? 'password' : 'text'"
                  prepend-icon="mdi-lock"
                  :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append-inner="togglePasswordVisibility"
                  required
              ></v-text-field>
              <div class="text-center">
                <v-btn
                    color="primary"
                    class="mr-4"
                    @click="submitRegistration"
                >
                  S'inscrire
                </v-btn>
                <v-btn text @click="redirectToLogin">Déja un compte ?</v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import {EventBus} from "@/eventBus";

export default {
  data() {
    return {
      register: {
        firstName: '',
        lastName: '',
        username: '',
        password: ''
      },
      showPassword: false,
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    submitRegistration() {const credentials = {
      firstName: this.register.firstName,
      lastName : this.register.lastName,
      username: this.register.username,
      password: this.register.password,
    };

      axios.post('http://localhost:3001/auth/signup', credentials)
          .then(response => {
            const { token, firstName, lastName, role } = response.data;

            localStorage.setItem('jwtToken', token);
            localStorage.setItem('firstName', firstName);
            localStorage.setItem('lastName', lastName);
            localStorage.setItem('role', role);


            this.register.username = '';
            this.register.password = '';
            this.$router.push('/');
            EventBus.login();

            this.$notify({
              type : 'success',
              title: 'Compte crée',
              text: 'Vous etes maintenant connecté'
            });
          })
          .catch(error => {
            console.error('Erreur lors de la création du compte:', error);
          });
    },
    redirectToLogin() {
      // Redirection vers la page de connexion (à implémenter avec le routeur Vue)
      this.$router.push('/login');
    }
  }
}
</script>
