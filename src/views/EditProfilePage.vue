<template>
<ion-page>
  <nav-bar v-if="isLoggedIn"/>
  <ion-content :fullscreen="true">
    <div class="container">
      <h1 v-if="isLoggedIn">{{ $t("profile.title") }}</h1>
      <h1 v-else>{{ $t("register.title") }}</h1>
      <form @submit.prevent="saveCustomer" autocomplete="off">
        <input type="email" name="hidden" id="hidden" style="width: 0; height: 0; border: 0; padding: 0; margin: 0!important" />
        <input type="password" name="hidden" id="hidden" style="width: 0; height: 0; border: 0; padding: 0; margin: 0!important" />        <input required type="email" v-model="profile.email" :placeholder="$t('profile.form.email')"/>
        <input :required="!isLoggedIn" ref="password1" type="password" v-model="password1" @change="updatePassword" :placeholder="$t('profile.form.password')"/>
        <input :required="!isLoggedIn" ref="password2" type="password" v-model="password2" @change="updatePassword" :placeholder="$t('profile.form.repeat_password')"/>
        <image-upload :src="profile.profileImageUrl" @update-photo="updatePhoto" :customerId="customerId"/>
        <input required type="text" v-model="profile.title" :placeholder="$t('profile.form.title')">
        <textarea required v-model="profile.description" :placeholder="$t('profile.form.description')" cols="30" rows="10"></textarea>
        <custom-select
          @update="updateCustomSelect"
          :type="'characteristics'"
          :options="characteristics"
          :values="profile.characteristics"
          :default="$t('profile.form.characteristic')"
        />

        <custom-select
          @update="updateCustomSelect"
          :type="'searchingFor'"
          :options="searchingForPossibilities"
          :values="profile.searchingFor"
          :default="$t('profile.form.searching_for')"
        />

        <button type="submit" class="btn">{{ $t("profile.form.submit") }}</button>
      </form>
    </div>
  </ion-content>
</ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, alertController } from '@ionic/vue';
import CustomSelect from '@/components/CustomSelect.vue';
import ImageUpload from '@/components/ImageUpload.vue';
import NavBar from '@/components/NavBar.vue';
import { defineComponent } from 'vue';
import { TokenService }  from '@/services/token.service';
import ApiService from '@/services/api.service';
import { useRouter } from 'vue-router';
import { mapActions, mapGetters } from "vuex"

interface Profile {
    [key: string]: any
    id: number | null,
    accessToken: string | null,
    title: string,
    status: number,
    description: string,
    searchingFor:  Array<string>,
    characteristics: Array<string>,
    location: object | null,
    profileImageUrl: string | null    
}

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    CustomSelect,
    ImageUpload,
    NavBar
  },
  data: function() {
    return {
      isLoggedIn: false,
      customer: null,
      password1: '',
      password2: '',
      profile: {} as Profile,
      characteristics: [
        'cuddly',
        'playful',
        'intelligent',
      ],
      searchingForPossibilities: [
        'paw_pal',
        'dog_walker',
        'dog_owner',
      ],
    };
  },
  setup() {
    const router = useRouter();
    return {
      router
    };
  },
  methods: {
    ...mapActions("auth", ["signIn"]),
    updatePhoto(path: string) {
      this.profile.profileImageUrl = path;
    },
    updateCustomSelect(type: string, values: Array<string>) {
      if (type === 'searchingFor') {
        this.profile.searchingFor = values;
      } else {
        this.profile.characteristics = values;
      }
    },
    updatePassword() {
        this.$refs.password1.setCustomValidity('');
        this.$refs.password2.setCustomValidity('');
      if (this.password1.length < 6) {
        this.$refs.password1.setCustomValidity(this.$t('password_must_be_longer_than_6'));
      } else if (this.password1 === this.password2) {
        this.profile.password = this.password1;
      } else {

        this.profile.password = null;
        console.log('passwords_dont_match');
        this.$refs.password2.setCustomValidity(this.$t('passwords_dont_match'));
      }
    },
    async saveCustomer() {
      var customerResponse: any;
      this.profile.status = 1
      console.log(this.loggedIn)
      if (this.isLoggedIn) {
        customerResponse = await ApiService.patch('/customers', this.profile)
        .catch(err => {
           return err.response.data;
        });
      } else {
        customerResponse = await ApiService.post('/customers', this.profile)
        .catch(err => {
            return err.response.data;
        })      
      }
      let header           = this.$t('error.title');
      let subHeader        = this.$t('error.messages.updating_profile_failed');
      let message          = '';

      if (customerResponse.error) {
        message = customerResponse.error;
      } else {
        header    = this.$t('success.title');
        subHeader = this.$t('success.messages.updating_profile_successful');
        message   = customerResponse.data.message;
        console.log(this.isLoggedIn);
      }

      const customAlert = await alertController
        .create({
          header: header,
          subHeader: subHeader,
          message: message,
          buttons: [{
            text: 'OK',
            handler: () => {
              customAlert.dismiss(true);


              if (!customerResponse.error && !this.isLoggedIn) {
          alert('REDIRECT!!!');
                this.router.push('/login');
              }
            }
          }],
        });
      await customAlert.present()
    }
  },
  async mounted() {
    let accessToken      = TokenService.getToken();
    this.isLoggedIn      = !!accessToken;
    if (this.isLoggedIn) {
      let customerResponse = await ApiService.get('/customers/' + accessToken);
      if (customerResponse.data.accessToken) {
        this.profile = customerResponse.data;
      }
    }
  }
});
</script>

<style scoped>
  ion-content {
    --background: var(--accent-background-color);
    --color: var(--accent-font-color);
  }

  .btn {
    margin-top: var(--big-distance);
  }
</style>