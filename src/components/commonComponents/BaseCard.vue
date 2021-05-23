<template>
    <v-card shaped class="mb-7">
        <v-toolbar flat v-if="title != ''">
            <v-icon v-if="icon != ''" class="mr-3">{{ icon }}</v-icon>
            <v-toolbar-title>{{ title }}</v-toolbar-title>

            <v-spacer></v-spacer>

            <slot name="header"></slot>

        </v-toolbar>
        <v-divider v-if="title != ''"></v-divider>
        <div class="pa-4">
            <slot />
        </div>
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
            icon: {
                type: String,
                default: ""
            }
        },

        data: () => ({}),

        methods: {}
    };
</script>