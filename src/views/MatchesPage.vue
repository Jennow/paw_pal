<template>
    <ion-page>
        <nav-bar/>
        <ion-content>
        <ion-list>
            <ion-item lines="full" v-for="match in matches" :key="match" :href="'/messages/' + match._id">
                <ion-avatar slot="start">
                <img :src="require('../../public/images/customer_default.jpg')" />
                </ion-avatar>
                <ion-label>
                <h2>{{ match.partner }}</h2>
                <p>{{ match.lastMessage }}</p>
                </ion-label>
            </ion-item>
        </ion-list>
        </ion-content>
    </ion-page>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
    data() {
        return {
            matches: [
                {
                    _id: 1,
                    partner: 'Lisa',
                    lastMessage: 'Ja, ich fände das auch...'
                },
                {
                    _id: 2,
                    partner: 'Anjia und Bello',
                    lastMessage: 'Ja, ich fände das auch...'
                },
                {
                    _id: 3,
                    partner: 'Safi und Yoshi',
                    lastMessage: 'Ja, ich fände das auch...'
                },
            ]
        }
    },
    components: {
        NavBar
    },
}
</script>

<style>
    ion-label {
        padding: var(--small-distance) 0;
    }
</style>