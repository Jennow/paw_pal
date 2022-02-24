<template>
    <ion-page>
        <nav-bar/>
        <ion-content>
            <div class="container">
                <message-bubble v-for="message in messages" :key="message" :customerId="customerId" :message="message"/>
            </div>

            <form class="container bottom" @submit.prevent="sendMessage">
                <textarea v-model="messageInProgress" required type="text" :placeholder="$t('chat.message_placeholder')" />
                <button class="btn btn-primary" type="submit">{{ $t('chat.submit') }}</button>
            </form>
        </ion-content>
    </ion-page>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import MessageBubble from '@/components/MessageBubble.vue';
import { IonPage, IonContent } from '@ionic/vue';
import ApiService from '@/services/api.service';
import { TokenService } from '@/services/token.service';

export default {
    components: {
        NavBar,
        MessageBubble,
        IonPage, 
        IonContent
    },
    data() {
        return {
            matchId: 0,
            messages: [],
            messageInProgress: ''
        }
    },
    async mounted() {
        this.matchId         = this.$route.params.id;
        let accessToken      = TokenService.getToken();
        let customerResponse = await ApiService.get('/customers/' + accessToken);
        if (customerResponse.data.accessToken) {
            this.customerId = customerResponse.data._id;
        }
        this.updateChat();
    },
    methods: {
        async updateChat() {
            let messagesData = await ApiService.get('/matches/' + this.matchId + '/messages')
            .catch(err => {
                return err.response.data;
            });
            this.messages = messagesData.data.response;
            this.messageInProgress = '';
        },
        async sendMessage() {
            let post = {
                message: this.messageInProgress,
            };
            let response = await ApiService.post('/matches/' + this.matchId + '/messages', post)
            .catch(err => {
                console.log(err.response.data);
            });
            this.updateChat();
            console.log(response);
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