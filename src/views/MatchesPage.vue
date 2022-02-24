<template>
    <ion-page>
        <nav-bar/>
        <ion-content>
        <ion-list>
            <ion-item lines="full" v-for="match in matches" :key="match" :href="'/messages/' + match._id">
                <ion-avatar slot="start">
                <img :src="match.customers[0].profileImageUrl ? match.customers[0].profileImageUrl : require('../../public/images/customer_default.jpg')" />
                </ion-avatar>
                <ion-label>
                <h2>{{ match.customers[0].title }}</h2>
                <p>{{ match.lastMessage }}</p>
                </ion-label>
            </ion-item>
        </ion-list>
        </ion-content>
    </ion-page>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { IonLabel, IonAvatar, IonItem, IonList, IonContent, IonPage } from '@ionic/vue';
import ApiService from '@/services/api.service';

export default {
    data() {
        return {
            matches: []
        }
    },
    async mounted() {
       let matchesData = await ApiService.get('/matches')
        .catch(err => {
            return err.response.data;
        });
        this.matches = matchesData.data;
        console.log(this.matches)
    },
    components: {
        NavBar,
        IonLabel,
        IonAvatar,
        IonItem,
        IonList,
        IonContent,
        IonPage
    },
}
</script>

<style>
    ion-label {
        padding: var(--small-distance) 0;
    }
</style>