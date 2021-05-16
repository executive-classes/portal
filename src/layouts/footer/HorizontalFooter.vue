<template>
    <v-container class="py-0">
        <v-col cols="12">
            <span class="d-block text-center">
                <slot></slot>
            </span>
        </v-col>
    </v-container>
</template>

<script>
    export default {
        name: "HorizontalFooter"
    };
</script>