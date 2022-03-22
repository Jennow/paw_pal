<template>
 <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons>
          <ion-menu-button color="primary">
                <img :src="require('../../public/assets/icon/logo_paw.svg')"/>
          </ion-menu-button>
          <ion-title>{{ $t($route.name) }}</ion-title>
            <ion-button @click="setOpen(true, $event)" id="match-actions" v-if="$route.name === 'routes.messages'">
              <ion-icon slot="icon-only" ios="ellipsis-horizontal" md="ellipsis-vertical"></ion-icon>
                  <ion-popover v-if="$route.name === 'routes.messages'" 
                  :is-open="isOpen"
                  :translucent="true"
                  @didDismiss="setOpen(false)"
                >
                  <ion-content>
                    <ion-list>
                      <ion-item button @click="toggleReportMenu" :detail="false">
                        <ion-label>Nutzer melden</ion-label>
                      </ion-item>
                      <ion-item button @click="toggleResolveMatchMenu" :detail="false">
                        <ion-label>Match auflösen</ion-label>
                      </ion-item>
                    </ion-list>
                  </ion-content>
                </ion-popover>
            </ion-button>
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
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonPopover } from '@ionic/vue';
import ReportService from '@/services/report.service';
import { ref } from 'vue';

export default {
  data: () => {
    return {
      isOpen: false
    }
  },
  components: {
    IonHeader, 
    IonToolbar, 
    IonButtons, 
    IonMenuButton, 
    IonTitle,
    IonPopover
  },
  mounted: () => {
    // this.setOpen(false);
  },
  methods: {
    setOpen(state) {
      this.isOpen = state;
    },
    async toggleReportMenu() {
      ReportService.toggleReportMenu(
          'Pawpal Chat für Match ' + this.$route.params.id,
          'Unangebrachter Inhalt im Chat.'
      );
      this.setOpen(false);
    },
    async toggleResolveMatchMenu() {
      await ReportService.toggleResolveMatchMenu(this.$route.params.id);
      this.setOpen(false);
    }
  }
}
</script>