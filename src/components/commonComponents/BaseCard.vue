<template>
    <v-card>
        <!-- Card title -->
        <v-card-title v-if="showTitle">{{ title }}</v-card-title>
        <v-card-subtitle v-if="showSubTitle">{{ subtitle }}</v-card-subtitle>

        <!-- Card Text -->
        <v-card-text>
            <slot />
        </v-card-text>

        <!-- Actions -->
        <v-card-actions>
            <slot name="actions" />
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "BaseCard",

        props: {
            title: {
                type: String,
                default: ""
            },
            subtitle: {
                type: String,
                default: ""
            }
        },

        computed: {
            showTitle() {
                return this.title != "";
            },
            showSubTitle() {
                return this.subtitle != "";
            }
        }
    };
</script>