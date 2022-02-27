<template>
    <a :ref="reference ? reference : ''" v-if="profile" :class="expanded ? 'teaser' : (hidden ? 'card hidden' : ( reference ? 'card active' : 'card'))" @click="showDetails">
        <img :src="profile.profileImageUrl ? profile.profileImageUrl : require('../../public/images/customer_default.jpg')" alt="">
        <div class="info">
            <h1>{{ profile.title }}</h1>
            <p>
                <ion-icon name="information-circle-outline"></ion-icon>
                <span v-for="characteristic in profile.characteristics" :key="characteristic">{{ $t('characteristics.' + characteristic) }}</span>
            </p>
            <p>
                <ion-icon name="search-circle-outline"></ion-icon>
                <span v-for="attribute in profile.searchingFor" :key="attribute">{{ $t('searching_for.' + attribute) }} </span>
            </p>
        </div>
    </a>

    <div v-if="expanded" class="description">
        <p>{{ profile.description }}</p>
    </div>
</template>

<script>
import { createGesture } from '@ionic/core';
import { IonIcon } from '@ionic/vue';

export default {
    components: {
        IonIcon
    },
    props: {
        expanded: Boolean,
        profile: Object,
        reference: String,
        hidden: Boolean,
        active: Boolean,
        default: {
            profileImageUrl: '',
            title: '',
        }
    },
    emits: [
        'show-details',
        'match'
    ],
    methods: {
        showDetails() {
            this.$emit('show-details');
        }
    },
    mounted() {
        let card = this.$refs.activeCard;

        if (!card) {
            return;
        }
        card.style.zIndex = 100;
        const windowWidth = window.innerWidth;
        const style       = card.style;
        const gesture     = createGesture(
            {
                gestureName: 'swipe',
                el: card,
                onStart: () => {
                    style.transition = 'none';
                },
                onMove: (event) => { 
                    if (this.expanded) {
                        return
                    }
                    style.transform = `translateX(${event.deltaX}px) rotate(${
                    event.deltaX / 20}deg)`;    
                    if (event.deltaX > windowWidth / 2) {
                        style.boxShadow = "0px 0px 40px var(--primary-color)";
                    } else if (event.deltaX < -windowWidth / 2) {
                        style.boxShadow = "0px 0px 40px brown";
                    } else {
                        style.boxShadow = '';
                    }
                },
                onEnd: (event) => {
                     if (this.expanded) {
                        return
                    }
                    style.boxShadow = '';
                    style.transition = '0.3s ease-out';
                    if (event.deltaX > windowWidth / 2) {
                        style.transition = '0s';
                        style.transform = '';
                        this.$emit('match', 1);
                    } else if (event.deltaX < -windowWidth / 2) {
                        style.transition = '0s';
                        style.transform = '';
                        this.$emit('match', 0);
                    } else {
                        style.transform = '';
                    }
                }
            }
        )

        gesture.enable();
    }
}
</script>

<style scoped>

    ion-icon {
        font-size: 1.5em;
        display: inline-block;
        margin: 0 10px 0 0;
        vertical-align: bottom;
    }

    .teaser {
        position: absolute;
        top: -12px;
        left: 0;
        height: 50vh;
        width: 100%;
    }

    .card.hidden {
        display: none;
    }

    .card img, .teaser img{
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -1;
        object-fit: cover;
    }

    .card img {
        border-radius: 15px;
    }

    .card .info, .teaser .info {
        z-index: 100;
        padding: var(--medium-distance);
        bottom: 0;
        position: absolute;
        color: #fff;
        font-family: var(--regular-font-family);
    }

    .card .info h1 {
        font-size: 1.4rem;
    }

    .card .info p {
        font-size: 0.9rem;
    }

    .card .info span {
        padding-right: 0.5em;
    }

    .card {
        position: absolute;
        display: block;
        height: 100%;
        width: 100%;
        border-radius: 15px;
    }

    .card, .teaser {
        background: linear-gradient(0deg, rgba(0,0,0,0.615662650602409) 0%, rgba(0,255,231,0) 50%);
        box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    }

    .description {
        position: absolute;
        top: 50vh;
        left: 0;
        height: 1000px;
        width: calc(100vw - 2*var(--medium-distance));
        padding: 0 var(--medium-distance) 150px;
        box-sizing: content-box;
    }
</style>
