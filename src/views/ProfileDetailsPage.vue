<template>
    <nav-bar/>
    <div class="teaser">
        <img :src=" profile.profileImageUrl" alt="">
        <div class="info">
            <h1>{{ profile.title }}</h1>
        </div>
    </div>
    <div class="content">
        <p>{{ profile.description }}</p>
    </div>
    <div class="action-buttons">
        <match-action-button @callback="showNextProfile" action="0"/>
        <match-action-button @callback="showNextProfile" action="1"/>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import MatchActionButton from '@/components/MatchActionButton.vue';

export default {
    components: {
        MatchActionButton,
        NavBar
    },
    data() {
        return {
            profile: 
            {
                "id":4,
                "title":"Jeni & Yoshi",
                "status":1,
                "description":"Hallo! Wir suchen Menschen und Hunde zum gemeinsamen Gassi Gehen :) <br> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
                "searchingFor":['paw_pal'],
                "characteristics":['playful'],
                "location": {
                    "lat": 50, 
                    "lng": 12
                },
                "profileImageUrl": require('../../public/images/customer_4.jpg'),
            },
        }
    },
    mounted() {
      this.activeProfile = this.profiles.find(profile => profile.id == this.activeProfileId);
      this.activeProfile.profileImageUrl = require('../../public/images/' + this.activeProfile.profileImageUrl);
    }
}
</script>

<style>

.teaser {
    height: 50%;
    position: relative;
}

.teaser img {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    object-fit: cover;
}

.teaser .info {
    z-index: 100;
    padding: var(--medium-distance);
    bottom: 0;
    position: absolute;
    color: #fff;
    font-family: var(--regular-font-family);
}

.content {
    width: 100%;
    max-width: var(--max-container-width);
    margin: auto;
    padding: var(--medium-distance);    /* height: calc(100% - 56px); */
    /* margin-top: 28px; */
    margin-bottom: calc(var(--big-distance) + 800px);
}

.action-buttons {
    height: 20%;
    width: 100%;
    display: flex;
    position: fixed;
    padding: var(--medium-distance);    /* height: calc(100% - 56px); */
    bottom: 0;
    justify-content: space-between;
}

.action-buttons * {
    align-self: flex-end
}
</style>