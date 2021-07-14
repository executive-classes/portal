<template>
    <div>
        <v-toolbar flat>
            <v-spacer></v-spacer>

            <v-text-field
                v-if="search"
                v-model="searchInput"
                label="Pesquisar"
                prepend-inner-icon="mdi-magnify"
                hide-details
            ></v-text-field>
        </v-toolbar>

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
                <slot :name="slot" v-bind="scope" />
            </template>
        </v-data-table>
    </div>
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
            searchInput: ""
        })
    };
</script>