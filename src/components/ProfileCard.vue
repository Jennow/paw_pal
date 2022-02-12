<template>
    <a :class="expanded ? 'teaser' : 'card'" @click="showDetails">
        <img :src="profile.profileImageUrl" alt="">
        <div class="info">
            <h1>{{ profile.title }}</h1>
            <p>
                <span v-for="characteristic in profile.characteristics" :key="characteristic">{{ $t('characteristics.' + characteristic) }}</span>
            </p>
            <p>
                <span v-for="attribute in profile.searchingFor" :key="attribute">{{ $t('searching_for.' + attribute) }}</span>
            </p>
        </div>
    </a>

    <div v-if="expanded" class="description">
        <p>{{ profile.description }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            expanded: false
        }
    },
    props: {
        profile: Object,
        default: {
            profileImageUrl: '',
            title: '',
        }
    },
    methods: {
        showDetails() {
            this.expanded = true;
            console.log('hallo')
        }
    }
}
</script>

<style scoped>
    .teaser {
        position: absolute;
        top: -12px;
        left: 0;
        height: 50vh;
        width: 100%;
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

    .card {
        position: relative;
        display: block;
        height: 100%;
        border-radius: 15px;
        box-sizing: content-box;
        max-width: 500px;
        margin: auto;
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
