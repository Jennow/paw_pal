<template>
    <div id="serching_for" class="custom-select" :tabindex="tabindex" @blur="open = false">
        <div class="selected" :class="{ open: open }" @click="open = !open">
            {{ selected }}
        </div>
        <div class="items" :class="{ selectHide: !open }">
            <div
            v-for="(option, i) of options"
            :key="i"
            @click="
                selected = option;
                open = false;
                $emit('input', option);
            "
            >
            {{ option }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selected: this.default
            ? this.default
            : this.options.length > 0
            ? this.options[0]
            : null,
        }
    },
    props: {
    options: Array,
    default: String,
    open: {
        type: Boolean,
        default: false,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
}
</script>

<style>
  .custom-select {
        display: block;
        width: 100%;
        background: var(--input-background);
        border: var(--input-border);
        border-radius: var(--input-border-radius)!important;
        font-family: var(--regular-font-family)!important;
        font-size: var(--regular-font-size);
        color: #ABA7AF!important;
        margin: 0px 0px var(--small-distance)!important;
        text-align: left;
    }

    .custom-select .selected {
        padding: var(--input-padding);
        padding-left: 1em;
        cursor: pointer;
        user-select: none;
        position: relative;
    }

    .custom-select .selected.open {
        border: var(--input-border);
        border-radius: 6px 6px 0px 0px;
    }

    .custom-select .items {
        overflow: hidden;
        background-color: #fff;
        position: absolute;
        left: 50%;
        right: 0;
        z-index: 1;
        width: calc(100% - 60px);
        border-radius: var(--input-border-radius)!important;
        transform: translateX(-50%);
    }

    .custom-select .items div {
        padding-left: 1em;
        cursor: pointer;
        user-select: none;
        padding: var(--input-padding);
        background: var(--input-background);
        border-bottom: var(--input-border);
        font-family: var(--regular-font-family)!important;
        font-size: var(--regular-font-size);
        color: #ABA7AF!important;
        margin: 0px 0px!important;
        text-align: left;
    }
    .custom-select .selected:after {
        content: "";
        position: absolute;
        right: var(--small-distance);
        top: var(--small-distance);
        width: 0;
        height: 0;
        border: 5px solid transparent;
        border-color: #ABA7AF transparent transparent transparent;
    }

    .custom-select .items div:hover {
        background-color: var(--primary-color);
        color: var(--primary-font-color);
    }

    .selectHide {
        display: none;
    }
</style>