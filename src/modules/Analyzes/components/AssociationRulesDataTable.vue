<script setup lang="ts">
import { FilterMatchMode } from "primevue/api";
import { PropType, ref } from "vue"
import { AssociationRules } from "../../../models/AnalyzesModel"
import DataTable from "primevue/datatable";

const props = defineProps({
    associationRules: {
        type: Array as PropType<Array<AssociationRules>>,
        required: true
    }
})
const emit = defineEmits({
    openEdit: () => true,
    openDelete: () => true,
})

const dt = ref<DataTable | undefined>();
const filters = ref({
    global: { value: undefined, matchMode: FilterMatchMode.CONTAINS },
});
const exportCSV = (event: Event) => {
    if (dt.value) {
        dt.value.exportCSV();
    } else {
        console.error('DataTable is undefined');

    }
};
</script>

<template>
    <DataTable ref="dt" :value="props.associationRules" removable-sort responsive-layout="scroll" :filters="filters"
        :paginator="true" :rows="10"
        paginator-template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        :rows-per-page-options="[10, 25, 50]" current-page-report-template="Showing {first} to {last} of {totalRecords}">
        <template #header>
            <div class="table-header flex justify-content-between align-items-center">
                <h2>Association Rules</h2>
                <div class="flex align-items-center">
                    <span class="mr-2 p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters.global.value" placeholder="Search..." />
                    </span>
                    <Button label="Export" icon="pi pi-upload" class="mr-3 p-button-help"
                        @click="($event) => exportCSV($event)" />
                </div>
            </div>
        </template>
        <template #empty>
            <div class="text-center">
                <p>No Association Rules</p>
            </div>
        </template>
        <Column field="antecedentSupport" header="Antecedent Support" :sortable="true"></Column>
        <Column field="antecedents" header="Antecedents" :sortable="true">
            <template #body="slotProps">
                <div>
                    {{ slotProps.data.antecedents }}
                </div>
            </template>
        </Column>
        <Column field="confidence" header="Confidence" :sortable="true"></Column>
        <Column field="consequentSupport" header="Consequent Support" :sortable="true"></Column>
        <Column field="consequents" header="Consequents" :sortable="true">
            <template #body="slotProps">
                <div>
                    {{ slotProps.data.consequents }}
                </div>
            </template>
        </Column>
        <Column field="conviction" header="Conviction"></Column>
        <Column field="leverage" header="Leverage" :sortable="true"></Column>
        <Column field="lift" header="Lift" :sortable="true"></Column>
        <Column field="support" header="Support" :sortable="true"></Column>
        <!-- <Column header="Actions" header-style="width: 4rem; text-align: center" body-style="overflow: visible;">
            <template #body="slotProps">
                <div class="flex justify-content-around align-content-center">
                    <Button type="button" icon="pi pi-list" class="p-button-outlined p-button-info mr-1"></Button>
                    <Button type="button" icon="pi pi-pencil" class="p-button-outlined p-button-warning mr-1"
                        @click="() => openEdit(slotProps.data)"></Button>
                    <Button type="button" icon="pi pi-times" class="p-button-outlined p-button-danger"
                        @click="() => openDelete(slotProps.data)"></Button>
                </div>
            </template>
        </Column> -->
        <template #paginatorstart>
            <!-- <Button type="button" icon="pi pi-refresh" class="p-button-text" @click="() => refreshTable()" /> -->
        </template>
        <template #paginatorend>
        </template>
    </DataTable>
</template>
