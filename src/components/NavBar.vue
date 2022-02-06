<template>
 <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons>
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ $route.params.id }}</ion-title>
      </ion-toolbar>
    </ion-header>
</template>

<style>
    .nav-container {
        height: 50px;
    }

    .nav-bar {
        height: 50px;
    }
</style>