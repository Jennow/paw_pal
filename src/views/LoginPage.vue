<template>
  <ion-page id="login-page">
  <LoadingScreen :isLoading="isLoading" />

    <ion-content :fullscreen="true">
      <div class="container">
        <img src="../../public/assets/icon/white_paw.svg" alt="">
        <h1>{{ $t("login.title") }}</h1>
        <form @submit.prevent="handleLogin">
          <input type="email" v-model="form.email" required :placeholder="$t('login.email')"/>
          <input type="password" v-model="form.password" required :placeholder="$t('login.password')"/>
          <button
          type="submit"
          class="btn">{{ $t("login.submit") }}</button>
          <router-link class="link" :to="'/profile/edit'">{{ $t("login.register") }}</router-link>
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, alertController } from '@ionic/vue';
import { Geolocation } from '@capacitor/geolocation';
import LoadingScreen from './LoadingScreen.vue';
import { defineComponent, getCurrentScope } from 'vue';
import { mapActions, mapGetters } from "vuex"
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Login',
  components: {
    IonPage,
    IonContent,
    LoadingScreen
  },
  setup() {
    const router = useRouter();
    return {
      router
    };
  },
  data() {
    return {
      termsConfirmed: false,
      isLoading: true,
      form: {
        email: '',
        password: '',
        location: {}
      }
    }
  },
  computed: {
    ...mapGetters("auth", [
      "authenticating",
      "authenticationError",
      "authenticationErrorCode"
    ])
  },
  async mounted() {
    const page = this;
    let location = await this.getCurrentPosition();
    this.form.location = {
      lat: location.coords.latitude,
      lng: location.coords.longitude
    }
    if (localStorage.getItem('confirmed-terms')) {
      this.termsConfirmed = true;
    }

    if (!this.termsConfirmed) {
        const termsAlert = await alertController
            .create({
              header: 'Nutzungsbedingungen bestätigen',
              subHeader: 'Bitte lesen Sie unsere Nutzungsbedingungen und bestätigen Sie, dass sie einverstanden sind.',
              message: 'Mit Klick auf "Ja" willigen Sie in unsere <a target="_blank" href="https://jencoding.com/privacy/paw_pal/#user_conduct">terms of use</a> ein.',
              buttons: [{
                text: 'Ja',
                handler: () => {
                  localStorage.setItem('confirmed-terms', '1');
                    termsAlert.dismiss(true);
                }
              }],
            });
        await termsAlert.present()
    }
    setTimeout(() => {
      page.isLoading = false;
    }, 500)
  },
  methods: {
     ...mapActions("auth", ["signIn"]),
    confirmConditions() {

    },
    async getCurrentPosition() {
      const coordinates = await Geolocation.getCurrentPosition();
      return coordinates;
    },
    async handleLogin() {
      this.signIn(this.form).then(() => {
        this.form.email = ""
        this.form.password = ""
        this.router.push("/explore")
      }).catch(async (err: any) => {
        const errorAlert = await alertController
            .create({
              header: this.$t('error.title'),
              subHeader: this.$t('error.messages.login_failed'),
              message: err,
              buttons: ['OK'],
            });
        await errorAlert.present()
      })
    }
  }
})
</script>

<style scoped>

  .container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }

  ion-content {
    --background: var(--accent-background-color);
    --color: var(--accent-font-color);
  }

  .link {
    color: var(--accent-font-color);
  }

  img {
    display: block;
    margin: 0 auto var(--big-distance);
  }

  .btn {
    margin-top: var(--big-distance);
  }
</style>