<template>
    <div class="col">
        <div :class="customerId === message.sentByCustomer ? 'message sent' : 'message received'">
            {{ message.message }}
        </div>
    </div>
 


</template>

<script>
export default {
    data() {
        return {
            customerId: "61f6e9d34aead55f31c9070d", // TODO Aus localstorage auslesen
        }
    },
    props: {
        message: Object,
        default: {
            text: '',
            date: '',
            status: '',
            sentByCustomer: '',
            mode: 'sent'
        }
    },

}
</script>

<style scoped>
    .col {
        display: block;
        position: relative;
        width: 100%;
    }
    .message {
        display: block;
        font-family: var(--regular-font-family);
        margin: var(--small-distance) auto;
        border-radius: 20px;
        padding: var(--small-distance);
        width: 80%;
        max-width: 500px;
        background-color: rgba(255, 255, 255, 0.7);
        box-shadow:	0 0.125rem 0.5rem rgba(0, 0, 0, .3), 0 0.0625rem 0.125rem rgba(0, 0, 0, .2);
	    position: relative;
    }

    .message.sent {
        margin-right: 0;
    }


    .message.received {
        margin-left: 0;
    }

    .message.sent::before {
        right: 1.5em;
        top: 100%;
        border: .75rem solid transparent;
        border-top-color: rgba(255, 255, 255, 0.7);
        border-bottom: none;
        filter: drop-shadow(0 0.0625rem -0.0625rem rgba(0, 0, 0, 0.1));
    }

    .message.received::before {
        left: 1.5em;
        bottom: 100%;
        border: .75rem solid transparent;
        border-bottom-color: rgba(255, 255, 255, 0.7);
        border-top: none;
        filter: drop-shadow(0 -0.0625rem 0.0625rem rgba(0, 0, 0, 0.1));
    }

    .message::before {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        z-index: 200;
    }
  
</style>
