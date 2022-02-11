<template>
    <ion-page>
        <nav-bar/>
        <ion-content>
            <div class="container">
                <message-bubble v-for="message in messages" :key="message" :message="message"/>
            </div>

            <form class="container bottom" @submit="sendMessage">
                <textarea type="text" :placeholder="$t('chat.message_placeholder')" />
                <button class="btn btn-primary" type="submit">{{ $t('chat.submit') }}</button>
            </form>
        </ion-content>
    </ion-page>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import MessageBubble from '@/components/MessageBubble.vue';
import { IonPage, IonContent } from '@ionic/vue';

export default {
    components: {
        NavBar,
        MessageBubble,
        IonPage, 
        IonContent
    },
    data() {
        return {
            messages: [
                {
                    "_id": "61f8188b2d6725a8c028ae39",
                    "status":1,
                    "date":"2022-01-31T17:12:43.211Z",
                    "text":"Hallo, Ich bins",
                    "sentByCustomer": "61f6e9d34aead55f31c9070d"
                },
                                {
                    "_id": "61f8188b2d6725a8c028ae39",
                    "status":1,
                    "date":"2022-01-31T17:12:43.211Z",
                    "text":"MOIN, Was geht ab?",
                    "sentByCustomer": "61f6e8384aead55f31c9070d"
                },
                                {
                    "_id": "61f8188b2d6725a8c028ae39",
                    "status":1,
                    "date":"2022-01-31T17:12:43.211Z",
                    "text":"Nicht viel, und bei dir?",
                    "sentByCustomer": "61f6e9d34aead55f31c9070d"
                }
            ]
        }
    }
}
</script>

<style scoped>
    #background-content {
        background: transparent;
    }
    ion-content {
        --background: var(--accent-background-color);
    }
    .bottom {
    position: fixed;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    }
</style>