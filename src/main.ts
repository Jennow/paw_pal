import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { IonicVue } from '@ionic/vue';
import i18n from './i18n'

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';

/* Theme variables */
import './theme/variables.css';

import MatchActionButton from '@/components/MatchActionButton.vue';


const app = createApp(App)
  .use(i18n)
  .use(IonicVue)
  .use(router);

  app.component('match-action-button', MatchActionButton)

router.isReady().then(() => {
  app.mount('#app');
});