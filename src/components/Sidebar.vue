<script setup lang="ts">
import { MenuItem } from 'primevue/menuitem';
import { computed } from 'vue';
import useOrganizations from '../hooks/useOrganizations';
import useUsers from '../hooks/useUsers';
import useOrganizationMembers from '../hooks/useOrganizationMembers';

const { isLoggedIn, isAdmin } = useUsers()
const { selectedOrganization } = useOrganizations()
const { isOrganizationAdmin, isOrganizationOwner } = useOrganizationMembers()

const sideBarItems = computed(() => {
    return new Array<MenuItem>(
        {
            label: 'Admin',
            icon: 'pi pi-box',
            visible: () => isLoggedIn.value && isAdmin.value ? true : false,
            items: [
                {
                    label: 'Home', route: '/admin', icon: 'pi pi-fw pi-users',
                },
                {
                    label: 'Users', route: '/admin/users', icon: 'pi pi-fw pi-users',
                },
                {
                    label: 'Organizations', route: '/admin/organizations', icon: 'pi pi-fw pi-users',
                }
            ]
        },
        {
            label: 'My Organization',
            icon: 'pi pi-mobile',
            visible: () => isLoggedIn.value && selectedOrganization.value ? true : false,
            items: [
                {
                    label: 'Members', route: `/organization/${selectedOrganization.value?.id}/members`, icon: 'pi pi-fw pi-users',
                },
                {
                    label: 'Datasources', route: `/organization/${selectedOrganization.value?.id}/datasources`, icon: 'pi pi-fw pi-list',
                },
                // {
                //     label: 'Files', route: FilesDatasourcesRoute.path, icon: 'pi pi-fw pi-file-excel',
                //     visible: () => isLoggedIn.value
                // },
                {
                    label: 'Reports', route: `/organization/${selectedOrganization.value?.id}/reports`, icon: 'pi pi-fw pi-list',
                },
                // {
                //     label: 'Visualizations', route: '/visualizations', icon: 'pi pi-fw pi-image',
                //     visible: () => isLoggedIn.value
                // },
                {
                    label: 'Analyzes', route: `/organization/${selectedOrganization.value?.id}/analyzes`, icon: 'pi pi-fw pi-check',
                },
                {
                    label: 'Settings', route: `/organization/${selectedOrganization.value?.id}/settings`, icon: 'pi pi-fw pi-cog',
                    visible: () => isAdmin.value || isOrganizationAdmin.value || isOrganizationOwner.value
                },
            ]
        },
    )
})
</script>

<template>
    <div v-if="isLoggedIn" class="p-2 bg-black-alpha-10">
        <!-- <MegaMenu :model="props.routes" orientation="vertical" /> -->
        <!-- <PanelMenu :model="props.routes" multiple class="w-full md:w-14rem" /> -->
        <!-- <PanelMenu :model="sideBarItems" multiple class="w-full md:w-14rem">
            <template #item="{ item }">
                <router-link :to="item.route">
                    <Button :label="item.label" severity="secondary" :icon="item.icon" text class="p-2 m-0" />
                </router-link>
            </template>
        </PanelMenu> -->
        <Menu :model="sideBarItems" multiple class="text-left">
            <template #item="{ item }">
                <router-link :to="item.route">
                    <Button :label="`${item.label}`" severity="secondary" :icon="item.icon" text class="p-2 m-0 w-full text-left" />
                </router-link>
            </template>
        </Menu>
    </div>
</template>

<style>
.sidebar {
    padding: 16px;
    background: #9e9e9e;
}
</style>