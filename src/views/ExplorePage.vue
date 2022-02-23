<template>
    <ion-page>
    <nav-bar/>
        <ion-content>
            <div :class="{container: true, 'card-container': !expanded}">
                <div class="card-slider">
                    <profile-card @show-details="showDetails" :expanded="expanded" :profile="activeProfile"/>
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
import ApiService from '@/services/api.service';

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
            expanded: false,
            profiles: [],
            activeProfileIdentifier: 0,
            activeProfile: {}
        }
    },
    methods: {
        showDetails() {
            this.expanded = true;
        },
        async showNextProfile(action) {
            // TODO: Chunkweise Daten laden    
            let match = {
                matchedCustomerObjectId: this.activeProfile._id,
                action: action
            }

            let response = await ApiService.post('/matches', match)        
            .catch(err => {
                console.log(err.response.data)
            });

            this.activeProfileIdentifier ++;
            this.activeProfile = this.profiles[this.activeProfileIdentifier]
            this.expanded = false;
        }
    },
    async mounted() {
        let profileData = await ApiService.get('/customers/explore')
        .catch(err => {
            return err.response.data;
        });
        this.profiles = profileData.data;
        this.activeProfile = this.profiles[this.activeProfileIdentifier]
    }
}
</script>

<style scoped>
.container.card-container {
    width: 100%;
    height: 75%;
    max-height: 600px;
    position: absolute;
    top: calc(50% - var(--big-distance));
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
}

.card-slider {
    width: 100%;
    height: 100%;
}
.action-buttons {
    /* height: 20%; */
    width: 100%;
    display: flex;
    position: fixed;
    bottom: 0;
    padding: var(--medium-distance);
    justify-content: space-between;
}

.action-buttons * {
    align-self: flex-end
}
</style>