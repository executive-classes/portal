<template>
    <v-row class="page-breadcrumb">
        <v-col cols="12" sm="12" class="pa-0 pl-3">
            <v-card class="px-2 custom-shaodow">
                <v-toolbar dense flat class="transparent pa-0" height="20px">
                    <v-toolbar-title class="toobar-extension transparent pb-3" slot="extension">
                        <v-breadcrumbs :items="breadcrumbs" large class="pa-0">
                            <template v-slot:divider v-if="breadcrumbs">
                                <v-icon>mdi-chevron-right</v-icon>
                            </template>
                        </v-breadcrumbs>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import breadcrumbs from "./breadcrumbs";

    export default {
        name: "Breadcrumb",

        data: () => ({
            breadcrumbs: []
        }),

        watch: {
            $route() {
                this.update();
            }
        },

        methods: {
            update() {
                this.breadcrumbs = [];
                this.addBreadcrumb(breadcrumbs[this.$route.name]);
            },

            addBreadcrumb(breadcrumb) {
                if (breadcrumb.params != undefined) {
                    breadcrumb.params.forEach(param => {
                        breadcrumb.to.params[param] = this.$route.params[param];
                    });
                }

                this.breadcrumbs.unshift(breadcrumb);

                if (breadcrumb.parent != null) {
                    this.addBreadcrumb(breadcrumbs[breadcrumb.parent]);
                }
            }
        },

        mounted() {
            this.update();
        }
    };
</script>

<style lang="scss">
    .page-breadcrumb {
        margin: -24px -25px 27px -25px;
    }
</style>