<template>
    <div class="custom-select" :tabindex="tabindex">
        <div class="selected" :class="{ open: open }"  @click="toggleSelect">
            {{ selected }}
        </div>
        <div class="items" :class="{ selectHide: !open }">
            <div
            v-for="(option, i) of options"
            :class="values && values.includes(option) ? 'highlighted' : ''"
            :key="i"
            @click="select(option)"
            >
            {{ $t( type + '.' + option) }}
            </div>
        </div>
    </div>
        <div class="spacing" :style="{height: spacingHeight}"></div>

</template>

<script>
import { IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/vue';

export default {
    components: {
        IonItem, 
        IonLabel, 
        IonSelect, 
        IonSelectOption
    },
    emits: [
        'update'
    ],
    data() {
        return {
            open: false,
            spacingHeight: 0,
            selected: this.default
            ? this.default
            : this.options.length > 0
            ? this.options[0]
            : null,
        }
    },
    props: {
        type: String,
        options: Array,
        values: Array,
        default: String,
        tabindex: {
        type: Number,
        required: false,
        default: 0,
        },
    },
    methods: {
        toggleSelect() {
            if (this.open) {
                this.closeSelect()
            } else {
                this.openSelect();
            }
        },
        openSelect() {
            this.open = true;
            this.spacingHeight = (this.options.length * 51) + 'px';
        },
        closeSelect() {
            this.open = false;
            this.spacingHeight = 0;
        },
        select(option) {
            let optionIsSelected = this.values && this.values.includes(option);
            let newValues        = this.values ? this.values : [];
            if (!optionIsSelected) {
                newValues.push(option)
            } else {
                newValues = newValues.filter(v => v !== option); 
            }
            this.$emit('update', this.type, newValues)
        }
    }
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
        width: calc(100% - 40px);
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

    .custom-select .items .highlighted {
        background-color: var(--primary-color);
        color: var(--primary-font-color)!important;
    }

    .selectHide {
        display: none;
    }
</style>