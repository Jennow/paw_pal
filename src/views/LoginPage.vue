<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <img src="../../public/assets/icon/white_paw.svg" alt="">
        <h1>Find your PawPal!</h1>
        <input type="email" placeholder="Email"/>
        <input type="password" placeholder="Password"/>
        <a @click="login" class="btn">Login</a>
        <a class="link" href="/reister">Create new account</a>
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
  --color: #fff;
}

/*
TODO: Variablen definieren und verwenden
TODO: Nicht benötigte Ionic Stylings entfernen
TODO: Generelle Stylings in App.vue oder eigenen Stylesheet auslagern
TODO: translation library i18n installieren um sie frühzeitig zu nutzen
*/
  #container {
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    padding: 30px;
    position: absolute;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  img {
    display: block;
    margin: 0 auto 60px;
  }
  input {
    display: block;
    padding: 12px;
    width: 100%;
    background: #FFFFFF;
    border: 1px solid #E5E0EB;
    border-radius: 2px;
    font-family: Poppins;
    font-size: 1rem;
    color: #ABA7AF;
    margin: 0px 0px;
    margin-bottom: 20px;
  }

  input:focus-visible {
    outline-color: #E5E0EB;
  }

  h1 {
    font-family: Poppins;
    font-weight: 600;
    font-size: 1.6rem;
  }

  .btn {
    padding: 12px;
    background: #009B9C;
    border: 2px solid #009B9C;
    border-radius: 4px;
    width: 100%;
    display: block;
    font-family: Poppins;
    font-size: 18px;
    line-height: 132%;
    text-align: center;
    color: #FFFFFF;
    flex: none;
    order: 0;
    flex-grow: 0;
    margin-top: 40px;
    cursor: pointer;
  }

  .btn:hover {
    text-transform: uppercase;
  }

  .link {
    font-family: Poppins;
    font-size: 1rem;
    margin-top: 20px;
    display: block;
    text-align: center;
    color: #fff;
  }

</style>