<template>
    <v-card shaped>
        <!-- Card header -->
        <v-toolbar flat v-if="showHeader">
            <!-- Card icon -->
            <v-icon v-if="showIcon" class="mr-3">{{ icon }}</v-icon>

            <!-- Card title -->
            <v-toolbar-title>{{ title }}</v-toolbar-title>

            <v-spacer></v-spacer>

            <!-- Header additional content -->
            <slot name="header"></slot>
        </v-toolbar>

        <v-divider v-if="showHeader"></v-divider>

        <!-- Card content -->
        <v-card-text>
            <slot />
        </v-card-text>

        <v-divider v-if="showFooter"></v-divider>

        <!-- Card footer -->
        <v-card-actions v-if="showFooter">
            <slot name="footer"></slot>
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
            icon: {
                type: String,
                default: ""
            }
        },

        computed: {
            showHeader() {
                return this.title != "";
            },
            showIcon() {
                return this.icon != "";
            },
            showFooter() {
                return !!this.$slots.footer;
            }
        }
    };
</script>