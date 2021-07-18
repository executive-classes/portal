<template>
    <v-tooltip :top="top" :bottom="bottom" :left="left" :right="right">
        <template v-slot:activator="{ on, attrs }">
            <slot :attrs="attrs" :on="on" />
        </template>
        <span>{{text}}</span>
    </v-tooltip>
</template>

<script>
    export default {
        name: "BaseTooltip",

        props: {
            placement: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            }
        },

        computed: {
            top() {
                return this.placement == "top";
            },
            bottom() {
                return this.placement == "bottom";
            },
            left() {
                return this.placement == "left";
            },
            right() {
                return this.placement == "right";
            }
        }
    };
</script>