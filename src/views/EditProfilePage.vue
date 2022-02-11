<template>
<ion-page>
  <nav-bar/>
  <ion-content :fullscreen="true">
    <div class="container">
      <h1>{{ $t("profile.title") }}</h1>
      <form @submit="login">
        <input type="email" :placeholder="$t('profile.form.email')"/>
        <input type="password" :placeholder="$t('profile.form.password')"/>
        <input type="password" :placeholder="$t('profile.form.repeat_password')"/>
        <div id="profile-image-upload">
            <div class="img-container">
              <img :src="require('../../public/images/customer_default.jpg')" alt="">
            </div>
            <div class="btn-container">
              <div class="btn-group">
                <a class="btn">{{ $t('profile.form.upload_image') }}</a>
                <a class="btn">{{ $t('profile.form.remove_image') }}</a>
              </div>
            </div>
        </div>
        <input type="text" :placeholder="$t('profile.form.title')">
        <textarea :placeholder="$t('profile.form.description')" cols="30" rows="10"></textarea>
        <custom-select
          :options="characteristics"
          :default="$t('profile.form.characteristic')"
        />

        <custom-select
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
import {IonPage } from '@ionic/vue';
import CustomSelect from '@/components/CustomSelect.vue';
import NavBar from '@/components/NavBar.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    IonPage,
    CustomSelect,
    NavBar
  },
  props: {
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data: function() {
    return {
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

  #profile-image-upload {
    display: flex;
    margin: var(--big-distance) auto;
    justify-content: space-between;
    max-width: 500px;
  }

  #profile-image-upload .btn-container {
    flex: 1;
    position: relative;
    margin-left: var(--small-distance);
  }

  #profile-image-upload .btn-group {
    position: absolute;
    top: 50%;
    width: 100%;
    transform: translateY(-50%);
  }

 #profile-image-upload .btn-group .btn {
    margin: var(--small-distance) 0;
  }

  #profile-image-upload .img-container {
      flex: 1;
      text-align: center;
  }
  #profile-image-upload img {
      border-radius: 50%;
      max-height: 200px;
  }


</style>