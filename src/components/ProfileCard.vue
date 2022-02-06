<template>
    <div class="card">
        <img :src=" profile.profileImageUrl" alt="">
        <div class="info">
            <h1>{{ profile.title }}</h1>
            <p>{{ profile.description }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        profile: Object,
        default: {
            profileImageUrl: '',
            title: '',
        }
    }
}
</script>

<style>
    .card img {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -1;
        border-radius: 15px;
        object-fit: cover;
    }

    .card .info {
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
        height: 100%;
        border-radius: 15px;
        box-sizing: content-box;
        background: linear-gradient(0deg, rgba(0,0,0,0.615662650602409) 0%, rgba(0,255,231,0) 50%);
    }
</style>
