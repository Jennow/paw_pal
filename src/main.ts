import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { IonicVue } from '@ionic/vue';
import i18n from './i18n'
import ApiService  from './services/api.service';
import { TokenService }  from './services/token.service';
import { store } from './store';
// import axios from 'axios'
// import VueAxios from 'vue-axios'

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';

/* Theme variables */
import './theme/variables.css';

import MatchActionButton from '@/components/MatchActionButton.vue';

ApiService.init(process.env.VUE_APP_ROOT_API);

if (TokenService.getToken()) {
  ApiService.setHeader();
  ApiService.mountRequestInterceptor();
  ApiService.mount401Interceptor();
}

const app = createApp(App)
  .use(i18n)
  .use(IonicVue)
  .use(router)
  .use(store)
  // .use(VueAxios, axios)
  ;

  app.component('match-action-button', MatchActionButton)

  router.isReady().then(() => {
    app.mount('#app');
});