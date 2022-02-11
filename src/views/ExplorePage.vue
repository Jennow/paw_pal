<template>
    <ion-page>
    <nav-bar/>
        <ion-content>
            <div class="container">
                <div class="card-slider">
                    <profile-card :profile="activeProfile"/>
                </div>
            </div>
            <div class="action-buttons">
                <match-action-button @callback="showNextProfile" :action="0"/>
                <match-action-button @callback="showNextProfile" :action="1"/>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import ProfileCard from '@/components/ProfileCard.vue';
import MatchActionButton from '@/components/MatchActionButton.vue';
import { IonPage, IonContent} from '@ionic/vue';

export default {
    components: {
        ProfileCard,
        MatchActionButton,
        NavBar,
        IonPage, 
        IonContent
    },
    data() {
        return {
            profiles: [
                {
                    "id":4,
                    "title":"Jeni & Yoshi",
                    "status":1,
                    "description":"Hallo! Wir suchen Menschen und Hunde zum gemeinsamen Gassi Gehen :). Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergrdolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergrdolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergrdolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergrdolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
                    "searchingFor":['paw_pal'],
                    "characteristics":['playful'],
                    "location": {
                        "lat": 50, 
                        "lng": 12
                    },
                    "profileImageUrl": "customer_4.jpg",
                },
                                {
                    "id":5,
                    "title":"Jena & Yosha",
                    "status":1,
                    "description":"Hallo! Wir suchen Menschen und Hunde zum gemeinsamen Gassi Gehen :)",
                    "searchingFor":['paw_pal'],
                    "characteristics":['playful'],
                    "location": {
                        "lat": 50, 
                        "lng": 12
                    },
                    "profileImageUrl": "customer_default.jpg",
                },
                {
                    "id":6,
                    "title":"Hans",
                    "status":1,
                    "description":"Hallo! Wir suchen Menschen und Hunde zum gemeinsamen Gassi Gehen :)",
                    "searchingFor":['paw_pal'],
                    "characteristics":['playful'],
                    "location": {
                        "lat": 50, 
                        "lng": 12
                    },
                    "profileImageUrl": "customer_4.jpg",
                },
                {
                    "id":7,
                    "title":"Franziskus Tierheim",
                    "status":1,
                    "description":"Hallo! Wir suchen Ehrenamtliche Gassi Geher für unsere Heim Hunde. Kommt gerne vorbei!",
                    "searchingFor":['paw_pal'],
                    "characteristics":['playful'],
                    "location": {
                        "lat": 50, 
                        "lng": 12
                    },
                    "profileImageUrl": "customer_default.jpg",
                }
            ],
            activeProfileId: 4,
            activeProfile: {}
        }
    },
    methods: {
        showNextProfile(action) {
            // TODO: Chunkweise Daten laden
            // TODO: Abhängig von Action Match in API anlegen
            console.log(action);
            this.activeProfileId ++;
            this.activeProfile = this.profiles.find(profile => profile.id == this.activeProfileId)
            this.activeProfile.profileImageUrl = require('../../public/images/' + this.activeProfile.profileImageUrl);

        }
    },
    mounted() {
      this.activeProfile = this.profiles.find(profile => profile.id == this.activeProfileId);
      this.activeProfile.profileImageUrl = require('../../public/images/' + this.activeProfile.profileImageUrl);
    }
}
</script>

<style scoped>
.container{
    width: 100%;
    height: calc(100% - 56px);
    margin-top: 28px;
}
.card-slider {
    width: 100%;
    height: 80%;
}
.action-buttons {
    /* height: 20%; */
    width: 100%;
    display: flex;
    position: fixed;
    bottom: 0;
    padding: var(--small-distance);
    justify-content: space-between;
}

.action-buttons * {
    align-self: flex-end
}
</style>