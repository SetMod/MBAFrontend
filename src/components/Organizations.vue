<template>
    <Toast />
    <Dialog v-model:visible="displayDialog" header="Organization" :modal="true" class="p-fluid w-29rem">
        <div class="field">
            <label for="name">Name</label>
            <InputText id="name" v-model.trim="v$.organizationName.$model" required="true" autofocus
                :class="{ 'p-invalid': submitted && v$.organizationName.$invalid }" />
            <small v-if="submitted && v$.organizationName.required.$invalid" class="p-error">Name is required.</small>
            <small v-else-if="submitted && v$.organizationName.minLength.$invalid" class="p-error">Name is to
                short.</small>
            <small v-else-if="submitted && v$.organizationName.maxLength.$invalid" class="p-error">Name is to
                long.</small>
        </div>
        <div class="field">
            <label for="description">Description</label>
            <Textarea id="description" v-model="v$.organizationDescription.$model" required="true" rows="3" cols="20"
                :class="{ 'p-invalid': submitted && v$.organizationDescription.$invalid }" />
            <small v-if="submitted && v$.organizationDescription.required.$invalid" class="p-error">Description is
                required.</small>
            <small v-else-if="submitted && v$.organizationDescription.minLength.$invalid" class="p-error">Description is
                to
                short.</small>
            <small v-else-if="submitted && v$.organizationDescription.maxLength.$invalid" class="p-error">Description is
                to
                long.</small>
        </div>
        <div class="field">
            <label for="name">Email</label>
            <InputText id="name" v-model.trim="v$.organizationEmail.$model" required="true" autofocus
                :class="{ 'p-invalid': submitted && v$.organizationEmail.$invalid }" />
            <small v-if="submitted && v$.organizationEmail.required.$invalid" class="p-error">Email is required.</small>
            <small v-else-if="submitted && v$.organizationEmail.email.$invalid" class="p-error">Email is
                invalid.</small>
            <small v-else-if="submitted && v$.organizationEmail.maxLength.$invalid" class="p-error">Email is to
                long.</small>
        </div>
        <div class="field">
            <label for="name">Phone</label>
            <InputText id="name" v-model.trim="v$.organizationPhone.$model" autofocus
                :class="{ 'p-invalid': submitted && v$.organizationPhone.$invalid }" />
            <small v-if="submitted && v$.organizationPhone.minLength.$invalid" class="p-error">Phone number is to
                short.</small>
            <small v-else-if="submitted && v$.organizationPhone.maxLength.$invalid" class="p-error">Phone number is to
                long.</small>
        </div>

        <template #footer>
            <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="closeDialog" />
            <Button label="Save" icon="pi pi-check" class="p-button-text" @click="submitCreate" />
        </template>
    </Dialog>

    <div class="w-7 mt-7">
        <Toolbar class="m-2">
            <template #start>
                <Button label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
                <!-- <Button label="Delete" icon="pi pi-trash" class="p-button-danger"
                        :disabled="!selectedReports || !selectedReports.length" @click="confirmDeleteSelected" /> -->
            </template>

            <!-- <template #end>
                    <FileUpload mode="basic" accept="image/*" :max-file-size="1000000" label="Import" choose-label="Import"
                        class="mr-2 inline-block" />
                    <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)" />
                </template> -->
        </Toolbar>

        <div v-if="isLoading || !organizations" class="mt-7">
            <div v-if="isLoading">
                <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
            </div>
            <div v-else-if="!organizations" class="flex justify-content-center align-items-center">
                <Message severity="info" class="mr-3">Organizations not found</Message>
                <Button label="Refresh" icon="pi pi-refresh" class="h-2rem" @click="refresh" />
            </div>
        </div>
        <div v-else>
            <DataTable :value="organizations" removable-sort responsive-layout="scroll" :paginator="true" :rows="10"
                paginator-template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                :rows-per-page-options="[10, 25, 50]"
                current-page-report-template="Showing {first} to {last} of {totalRecords}">
                <template #header>
                    <div class="table-header flex justify-content-between align-items-center">
                        <h2>Organizations</h2>
                        <Button icon="pi pi-refresh" class="h-2rem" @click="refresh" />
                    </div>
                </template>
                <Column field="organizationId" header="ID" :sortable="true"></Column>
                <Column field="organizationName" header="Name" :sortable="true"></Column>
                <Column field="organizationDescription" header="Description" :sortable="true"></Column>
                <Column field="organizationEmail" header="Email" :sortable="true"></Column>
                <Column field="organizationPhone" header="Phone"></Column>
                <Column field="organizationCreateDate" header="Created" :sortable="true"></Column>
                <!-- <Column header="Role">
                        <template #body="slotProps">
                            <span>{{
                                    organizationRoles
                                        ? organizationRoles.find((role) => role.organizationRoleId ==
                                            slotProps.data.roleId)?.organizationRoleName
                                        : slotProps.data.roleId
                            }}</span>
                        </template>
                    </Column> -->
                <Column header="Actions" header-style="width: 4rem; text-align: center" body-style="overflow: visible;">
                    <template #body="slotProps">
                        <div class="flex justify-content-around align-content-center">
                            <Button type="button" icon="pi pi-list"
                                class="mr-1 p-button-outlined p-button-info"></Button>
                            <Button v-if="showDelete" type="button" icon="pi pi-times"
                                class="p-button-outlined p-button-danger"
                                @click="() => submitDelete(slotProps.data.organizationId)"></Button>
                        </div>
                    </template>
                </Column>
                <template #paginatorstart>
                    <Button type="button" icon="pi pi-refresh" class="p-button-text" @click="refresh" />
                </template>
                <template #paginatorend>
                </template>
            </DataTable>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import { maxLength, minLength, required, email } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import useOrganizationRoles from "../hooks/useOrganizationRoles";
import useOrganizations from "../hooks/useOrganizations";
import useUsers from "../hooks/useUsers";
import useRoles from "../hooks/useRoles";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Toolbar from "primevue/toolbar";
import Textarea from "primevue/textarea";
import Organizations from "../models/OrganizationsModel";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
export default defineComponent({
    components: {
        DataTable,
        Column,
        Button,
        Dialog,
        InputText,
        Toolbar,
        Textarea,
        Toast
    },
    props: {
        user: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        onMounted(async () => {
            if (props.user) {
                if (isLoggedIn && user.value) await getUserOrganizations(user.value.userId)
            } else {
                await getOrganizations()
            }
            await getOrganizationsRoles()
        })
        const toast = useToast()
        const { user, isLoggedIn } = useUsers()
        const { getUserRole } = useRoles()
        const { organizations, isLoading, getUserOrganizations, getOrganizations } = useOrganizations();
        const { organizationRoles, getOrganizationsRoles } = useOrganizationRoles();
        const displayDialog = ref(false)
        const organization = ref(new Organizations())
        const submitted = ref(false);

        const state = reactive({
            organizationName: '',
            organizationDescription: '',
            organizationEmail: '',
            organizationPhone: '',
        })
        const rules = {
            organizationName: { required, minLength: minLength(2), maxLength: maxLength(200) },
            organizationDescription: { required, minLength: minLength(10), maxLength: maxLength(2000) },
            organizationEmail: { required, email, maxLength: maxLength(255) },
            organizationPhone: { minLength: minLength(13), maxLength: maxLength(13) },
        }
        const v$ = useVuelidate(rules, state)

        const refresh = async () => {
            if (isLoggedIn && user.value) await getUserOrganizations(user.value.userId)
            await getOrganizationsRoles()
        }
        const showDelete = computed(() => {
            if (isLoggedIn && getUserRole(user.value) === 'Admin')
                return true
            else
                return false
        })
        const submitDelete = async (organizationId: number) => {
            console.log(organizationId);

            const result = confirm('Delete user?')
            if (result == false) return
            // await deleteOrganizationById(organizationId)
            // await getAllOrganizations()
        }
        const closeDialog = () => {
            displayDialog.value = false
            submitted.value = false
        }
        const submitCreate = async () => {
            submitted.value = true

            if (v$.value.$invalid) return toast.add({ severity: 'error', summary: 'Failed to Create', detail: 'Failed to create', life: 3000 });
            toast.add({ severity: 'success', summary: 'Created', detail: 'Organization created', life: 3000 });

            closeDialog()
            await refresh()
        }
        const openNew = () => {
            displayDialog.value = true
        }
        return {
            state,
            v$,
            submitted,
            isLoading,
            organizations,
            organizationRoles,
            showDelete,
            displayDialog,
            submitCreate,
            openNew,
            closeDialog,
            submitDelete,
            refresh
        };
    },
});
</script>

<style>
</style>