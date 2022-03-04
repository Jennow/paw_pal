<template>
  <ion-app>
      <ion-menu content-id="main-content" type="overlay">
        <ion-content >
          <ion-list id="inbox-list">
            <ion-list-header>Menü</ion-list-header>
            <ion-menu-toggle auto-hide="false" v-for="(p, i) in appPages" :key="i">
              <ion-item @click="selectedIndex = i" router-direction="root" :router-link="p.url" lines="none" detail="false" class="hydrated" :class="{ selected: selectedIndex === i }">
                <ion-icon :ios="p.iosIcon" :md="p.mdIcon"></ion-icon>
                <ion-label>{{ $t('routes.' + p.title) }}</ion-label>
              </ion-item>
            </ion-menu-toggle>
            <ion-item class="logout hydrated" @click="logoutCustomer" router-direction="root" lines="none" detail="false">
                <ion-icon :ios="logOut" :md="logOut"></ion-icon>
                <ion-label>{{ $t('routes.logout') }}</ion-label>
              </ion-item>
          </ion-list>
        </ion-content>
      </ion-menu>
      <ion-router-outlet id="main-content"></ion-router-outlet>
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, IonRouterOutlet } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { heartOutline, personOutline, chatboxEllipsesOutline, informationCircleOutline, logOut} from 'ionicons/icons';
import { mapActions } from "vuex"
import NotificationService from '@/services/notification.service';
import {store} from '@/store';


export default defineComponent({
  name: 'App',
  components: {
    IonApp, 
    IonContent, 
    IonIcon, 
    IonItem, 
    IonLabel, 
    IonList, 
    IonListHeader, 
    IonMenu, 
    IonMenuToggle, 
    IonNote, 
    IonRouterOutlet,
  },
  setup() {
    const selectedIndex = ref(0);
    const appPages = [
      {
        title: 'explore',
        url: '/explore',
        iosIcon: heartOutline,
        mdIcon: heartOutline
      },
      {
        title: 'matches',
        url: '/matches',
        iosIcon: chatboxEllipsesOutline,
        mdIcon: chatboxEllipsesOutline
      },
      {
        title: 'profile',
        url: '/profile/edit',
        iosIcon: personOutline,
        mdIcon: personOutline
      },
      // {
      //   title: 'imprint',
      //   url: '/imprint',
      //   iosIcon: informationCircleOutline,
      //   mdIcon: informationCircleOutline
      // }
    ];
    const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
    
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      selectedIndex.value = appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    
    const route = useRoute();
    const router = useRouter();

    return { 
      selectedIndex,
      appPages, 
      labels,
      router,
      heartOutline, 
      personOutline, 
      chatboxEllipsesOutline, 
      informationCircleOutline,
      logOut,
      isSelected: (url: string) => url === route.path ? 'selected' : ''
    }
  },
  data() {
    return {
      deviceToken: ''
    }
  },
  mounted() {
    this.deviceToken = NotificationService.pushInit();
    // this.axios.get("https://api.npms.io/v2/search?q=vue")
    // .then(response => {
    //   console.log(response)
    // });
  },
  methods: {
    ...mapActions("auth", ["signOut"]),
    async logoutCustomer() {
      await store.dispatch("auth/signOut");
      // await this.signOut(this.deviceToken);
      this.router.go('/login')

    }
  }
});
</script>

<style>

ion-menu ion-content {
  font-family: var(--regular-font-family);
  --background: var(--ion-item-background, var(--ion-background-color, #fff));
}

ion-menu.md ion-content {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}

ion-menu.md ion-list {
  padding: 20px 0;
}

ion-menu.md ion-note {
  margin-bottom: 30px;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
  padding-left: 10px;
}

ion-menu.md ion-list#inbox-list {
  border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);
}

ion-menu.md ion-list#inbox-list ion-list-header {
  font-size: 22px;
  font-weight: 600;

  min-height: 20px;
}

ion-menu.md ion-list#labels-list ion-list-header {
  font-size: 16px;

  margin-bottom: 18px;

  color: #757575;

  min-height: 26px;
}

ion-menu.md ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 4px;
}

ion-menu.md ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-item.logout ion-icon {
  color: brown!important;
}

ion-menu.md ion-item ion-icon {
  color: #616e7e;
}

ion-menu.md ion-item ion-label, .item.sc-ion-label-ios-h, .item .sc-ion-label-ios-h {
  font-weight: 500;
  font-family: var(--regular-font-family);
  margin-left: var(--small-distance);
}

ion-menu.ios ion-content {
  --padding-bottom: 20px;
}

ion-menu.ios ion-list {
  padding: 20px 0 0 0;
}

ion-menu.ios ion-note {
  line-height: 24px;
  margin-bottom: 20px;
}

ion-menu.ios ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 50px;
}

ion-menu.ios ion-item.selected ion-icon {
  color: var(--primary-color);
}

ion-menu.ios ion-item ion-icon {
  font-size: 24px;
  font-weight: bold;
  color: #999;
}

ion-menu.ios ion-list#labels-list ion-list-header {
  margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
  padding-left: 16px;
  padding-right: 16px;
}

ion-menu.ios ion-note {
  margin-bottom: 8px;
}

ion-note {
  display: inline-block;
  font-size: 16px;

  color: var(--ion-color-medium-shade);
}

ion-item.selected {
  --color: var(--ion-color-primary);
}

/** Custom Styling */
  .container {
    width: 100%;
    max-width: var(--max-container-width);
    margin: 0 auto var(--small-distance);
    padding: 0 var(--medium-distance);
  }

  input, textarea, select {
    display: block;
    padding: var(--input-padding);
    width: 100%;
    background: var(--input-background);
    border: var(--input-border);
    border-radius: var(--input-border-radius)!important;
    font-family: var(--regular-font-family)!important;
    font-size: var(--regular-font-size);
    color: #ABA7AF!important;
    margin: 0px 0px!important;
    text-align: left;
  }

  input, textarea {
    margin-bottom: var(--small-distance)!important;
  }

  textarea {
    resize: none;
  }

  input:focus-visible, textarea:focus-visible, select:focus-visible {
    outline-color: #E5E0EB;
  }

  h1 {
    font-family: var(--headline-font-family);
    font-weight: var(--headline-font-weight);
    font-size: var(--headline-font-size);
  }

  .btn {
    padding: var(--input-padding);
    background: var(--primary-color);
    border: var(--button-border);
    border-radius: var(--button-border-radius);
    width: 100%;
    display: block;
    font-family: var(--regular-font-family);
    font-size: var(--regular-font-size);
    text-align: center;
    color: var(--primary-font-color);
    cursor: pointer;
  }

  .btn:hover {
    background-color: var(--button-hover-background);
    border-color: var(--button-hover-background);
  }

  .link {
    font-family: var(--regular-font-family);
    font-size: var(--regular-font-size);
    margin-top:  var(--small-distance);
    display: block;
    text-align: center;
  }

  .logout {
    color: brown;
  }

</style>
