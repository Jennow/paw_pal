<template>
    <ion-page>
        <nav-bar/>
        <ion-content>
            <div class="container">
                <h1>{{ $t('imprint.title') }}</h1>
                <p>{{ $t('imprint.text') }}</p>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { IonPage, IonContent } from '@ionic/vue';

export default {
    components: {
        NavBar,
        IonPage, 
        IonContent
    }
}
</script>

<style scoped>
    #background-content {
        background: transparent;
    }
    ion-content {
        --background: var(--accent-background-color);
        --color: var(--accent-font-color);
    }

</style>