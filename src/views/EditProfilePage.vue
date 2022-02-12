<template>
<ion-page>
  <nav-bar/>
  <ion-content :fullscreen="true">
    <div class="container">
      <h1>{{ $t("profile.title") }}</h1>
      <form @submit="login">
        <input required type="email" v-model="profile.email" :placeholder="$t('profile.form.email')"/>
        <input :required="!isLoggedIn" type="password" :placeholder="$t('profile.form.password')"/>
        <input :required="!isLoggedIn" type="password" :placeholder="$t('profile.form.repeat_password')"/>
        <image-upload :src="profile.profileImageUrl" @update-photo="updatePhoto"/>
        <input required type="text" v-model="profile.title" :placeholder="$t('profile.form.title')">
        <textarea required v-model="profile.description" :placeholder="$t('profile.form.description')" cols="30" rows="10"></textarea>
        <custom-select
          v-model="profile.characteristics"
          :options="characteristics"
          :default="$t('profile.form.characteristic')"
        />

        <custom-select
          v-model="profile.searchingFor"
          :options="searchingForPossibilities"
          :default="$t('profile.form.searching_for')"
        />

        <a type="submit" class="btn">{{ $t("profile.form.submit") }}</a>
      </form>
    </div>
  </ion-content>
</ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent} from '@ionic/vue';
import CustomSelect from '@/components/CustomSelect.vue';
import ImageUpload from '@/components/ImageUpload.vue';
import NavBar from '@/components/NavBar.vue';
import { defineComponent } from 'vue';

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
      isLoggedIn: true, // Check Session
      profile: { // Get Profile from Session. 
          "id":5,
          "title":"Jena & Yosha",
          "status":1,
          "description":"Hallo! Wir suchen Menschen und Hunde zum gemeinsamen Gassi Gehen :)",
          "searchingFor":['paw_pal'],
          "characteristics":['playful'],
          "location": {
              "lat": 50, 
              "lng": 12
          },
          "profileImageUrl": "customer_default.jpg",
      },
      characteristics: [
        this.$t('characteristics.cuddly'),
        this.$t('characteristics.playful'),
        this.$t('characteristics.intelligent'),
      ],
      searchingForPossibilities: [
        this.$t('searching_for.paw_pal'),
        this.$t('searching_for.dog_walker'),
        this.$t('searching_for.dog_owner'),
      ],
    };
  },
  methods: {
    updatePhoto(path: string) {
      this.profile.profileImageUrl = path;
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