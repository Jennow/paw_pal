<template>
    <a @click="click" :class="action == 1 ? 'round-btn yes' : 'round-btn no'">
        <font-awesome-icon :icon="action == 1 ? 'check' : 'times'" />
    </a>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'

import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faCheck)
library.add(faTimes)

export default {
    components: {
        FontAwesomeIcon
    },
    props: {
        action: Number
    },
    methods: {
        click() {
            this.$emit('callback', this.action);
        }
    },
    mounted() {
        console.log(this.action)
    }
}
</script>

<style>
    .round-btn {
        width: 1.8rem;
        height: 1.8rem;
        box-sizing: content-box;
        color: #fff;
        padding: 30px;
        border-radius: 50%;
        text-align: center;
        font-size: 1.8rem;
    }
    .yes {
        background-color: darkgreen;
    }

    .no {
        background-color: brown;
    }


</style>