<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <h1>{{ $t("profile.form.title") }}</h1>
        <form @submit="login">
          <input type="email" :placeholder="$t('proile.form.email')"/>
          <input type="password" :placeholder="$t('profile.form.password')"/>
          <input type="password" :placeholder="$t('profile.form.repeat_password')"/>
          <div class="profile-image-upload">

          </div>
          <input type="text" :placeholder="$t('profile.form.title')">
          <textarea :placeholder="$t('profile.form.description')" cols="30" rows="10"></textarea>
          
          <div class="custom-select" :tabindex="tabindex" @blur="open = false">
            <div class="selected" :class="{ open: open }" @click="open = !open">
              {{ selected }}
            </div>
            <div class="items" :class="{ selectHide: !open }">
              <div
                v-for="(option, i) of options"
                :key="i"
                @click="
                  selected = option;
                  open = false;
                  $emit('input', option);
                "
              >
                {{ option }}
              </div>
            </div>
          </div>
          <a type="submit" class="btn">{{ $t("profile.form.submit") }}</a>
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {IonPage } from '@ionic/vue';

export default {
  components: {
    IonPage,
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
      options: [
        'hallo',
        'foo',
        'bar'
      ],
      default: null,
      selected: 'hallo',
      open: false,
    };
  },
}
</script>

<style scoped>
  ion-content {
    --background: var(--accent-background-color);
    --color: var(--accent-font-color);
  }

  #container {
    top: 0;
    transform: translateX(-50%);
  }

  .btn {
    margin-top: var(--big-distance);
  }
</style>