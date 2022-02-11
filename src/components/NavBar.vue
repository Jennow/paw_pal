<template>
 <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons>
          <ion-menu-button color="primary">
                <img :src="require('../../public/assets/icon/logo_paw.svg')"/>
          </ion-menu-button>
          <ion-title>{{ $t($route.name) }}</ion-title>
        </ion-buttons>

      </ion-toolbar>
    </ion-header>
</template>

<style scoped>
    ion-title {
      font-family: var(--regular-font-family);
      font-weight: var(--regular-font-weight);
      color: var(--primary-color);
    }
    img {
      max-height: 80%;
    }
    .nav-container {
        height: 50px;
    }

    .nav-bar {
        height: 50px;
    }
</style>

<script>
export default {
  mounted() {
    console.log(this.$t(this.$route.name));
  }
}
</script>