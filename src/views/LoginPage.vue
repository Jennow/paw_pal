<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <img src="../../public/assets/icon/white_paw.svg" alt="">
        <h1>{{ $t("login.title") }}</h1>
        <form>
          <input type="email" :placeholder="$t('login.email')"/>
          <input type="password" :placeholder="$t('login.password')"/>
          <a @click="login" class="btn">{{ $t("login.submit") }}</a>
          <a class="link" href="/profile/edit">{{ $t("login.register") }}</a>
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
  }
}
</script>

<style scoped>
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