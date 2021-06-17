<template>
    <v-row>
        <!-- Logo -->
        <v-col cols="12" md="6" lg="7" xl="8" class="d-flex align-center justify-center logo-area">
            <v-container>
                <img src="../assets/images/logo-full.png" />
            </v-container>
        </v-col>

        <!-- Page Content -->
        <v-col cols="12" md="6" lg="5" xl="4" class="d-flex align-center">
            <v-container>
                <div class="px-7 px-sm-12">
                    <router-view />
                </div>
            </v-container>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "BlankLayout"
    };
</script>

<style lang="scss">
    @media (max-width: 960px) {
        .logo-area {
            background-image: linear-gradient(
                180deg,
                #293176,
                transparent
            ) !important;
        }

        .logo-area .container {
            text-align: center;
        }

        .logo-area img {
            height: 5em;
        }
    }

    @media (min-width: 960px) {
        .logo-area {
            background-image: linear-gradient(
                90deg,
                #293176,
                transparent
            ) !important;
        }

        .logo-area img {
            width: 100%;
            max-width: 80em;
        }
    }
</style>