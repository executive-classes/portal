<template>
    <div>
        <v-btn :dark="dark || $vuetify.theme.dark" icon class="mr-1 d-sm-block d-none" @click="searchbox">
            <v-icon>fa-search</v-icon>
        </v-btn>

        <v-card v-if="showSearch" class="searchinput">
            <template>
                <v-text-field
                    placeholder="Search & hit enter"
                    class="mt-3 mb-0"
                    append-icon="mdi-close"
                    @click:append="searchbox"
                ></v-text-field>
            </template>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "Script",

        props: {
            dark: {
                type: Boolean,
                default: false
            }
        },

        data: () => ({
            showSearch: false
        }),

        methods: {
            searchbox: function() {
                this.showSearch = !this.showSearch;
            }
        }
    };
</script>

<style lang="scss">
    .searchinput {
        position: absolute;
        width: 100%;
        margin: 0;
        left: 0;
        z-index: 10;
        padding: 0 15px;
    }
</style>