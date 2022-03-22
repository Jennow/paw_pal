<template>
    <a @click="click" :class="action == 1 ? 'round-btn yes' : action == 0 ? 'round-btn no' : 'round-btn help'">
        <font-awesome-icon :icon="action == 1 ? 'check' : action == 0 ? 'times' : 'exclamation-triangle'" />
    </a>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck, faExclamation, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faCheck)
library.add(faExclamationTriangle)
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
    }
}
</script>

<style>
    .round-btn {
        width: 1.8rem;
        height: 1.8rem;
        box-sizing: content-box;
        color: #fff;
        padding: 20px;
        border-radius: 50%;
        text-align: center;
        font-size: 1.8rem;
    }
    .yes {
        background-color: var(--primary-color);
    }

    .no {
        background-color: brown;
    }

    .help {
       background-color: #ffc00d;
        width: 1.4rem;
        height: 1.4rem;
        font-size: 1.2rem;
        padding: 10px;
    }


</style>