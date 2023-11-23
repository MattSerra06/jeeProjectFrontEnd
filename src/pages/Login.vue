<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="text-h5">Connexion</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                  v-model="login.username"
                  label="Nom d'utilisateur"
                  prepend-icon="mdi-account"
                  required
              ></v-text-field>
              <v-text-field
                  v-model="login.password"
                  label="Mot de passe"
                  :type="!showPassword ? 'password' : 'text'"
                  prepend-icon="mdi-lock"
                  :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append-inner="() => (showPassword = !showPassword)"
                  required
              ></v-text-field>
              <div class="text-center">
                <!-- Centrer le contenu à l'aide de la classe 'text-center' -->
                <v-btn
                    color="primary"
                    class="mr-4"
                    @click="submitLogin"
                >
                  Connexion
                </v-btn>
                <v-btn text @click="redirectToRegister">Créer un compte</v-btn>
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
import { EventBus } from '@/eventBus';
import app from "@/App.vue";


export default {
  data() {
    return {
      login: {
        username: '',
        password: ''
      },
      showPassword: false,
    };
  },
  methods: {
    togglePasswordVisibility(event) {
      const iconClass = 'v-icon notranslate mdi-eye'; // ou 'mdi-eye-off' selon le cas
      if (event.target.className.includes(iconClass)) {
        this.showPassword = !this.showPassword;
      }
    },
    submitLogin() {
      const credentials = {
        username: this.login.username,
        password: this.login.password
      };
      axios.post('http://localhost:3001/auth/signin', credentials)
          .then(response => {
            const { token, firstName, lastName , role} = response.data;
            localStorage.setItem('jwtToken', token);
            localStorage.setItem('firstName', firstName);
            localStorage.setItem('lastName', lastName);
            localStorage.setItem('role', role);

            this.login.username = '';
            this.login.password = '';
            this.$router.push('/');
            EventBus.login(role);

            this.$notify({
              type : 'success',
              title: 'Connexion réussi',
              text: 'Vous etes maintenant connecté'
            });
          })
          .catch(error => {
            console.error('Erreur lors de la connexion:', error);
          });
    },

    redirectToRegister() {
      // Redirection vers la page d'inscription (à implémenter avec le routeur Vue)
      this.$router.push('/register');
    }
  }
}
</script>
