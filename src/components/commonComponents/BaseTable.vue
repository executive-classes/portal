<template>
    <v-card>
        <v-row align="center" class="mx-0">
            <slot name="header"></slot>

            <v-spacer></v-spacer>

            <v-text-field
                v-if="search"
                v-model="searchInput"
                label="Pesquisar"
                prepend-inner-icon="mdi-magnify"
                hide-details
            ></v-text-field>
        </v-row>

        <v-data-table
            :headers="headers"
            :items="items"
            :search="searchInput"
            :custom-filter="customFilter"
            :sort-by="sortBy"
            :sort-desc="sortDesc"
            :loading="loading"
            loading-text="Carregando ..."
            no-results-text="Nenhum resultado encontrado."
            no-data-text="Nenhum dado encontrado."
        >
            <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
                <slot :name="slot" v-bind="scope" v-if="!componentSlots.includes(slot)"/>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
    export default {
        name: "BaseTable",

        props: {
            search: {
                type: Boolean,
                default: true
            },
            loading: {
                type: Boolean,
                default: false
            },
            headers: {
                type: Array,
                required: true
            },
            items: {
                type: Array,
                required: true
            },
            sortBy: {
                type: Array
            },
            sortDesc: {
                type: Array
            },
            customFilter: {
                type: Function
            }
        },

        data: () => ({
            searchInput: "",
            componentSlots: [
                'header'
            ]
        })
    };
</script>