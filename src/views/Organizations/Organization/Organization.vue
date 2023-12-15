<script setup lang="ts">
import useOrganizations from '../../../hooks/useOrganizations';

const { selectedOrganization } = useOrganizations()
</script>

<template>
    <div>
        <h4 class="m-3 text-left">Organization "{{ selectedOrganization?.name }}"</h4>
        <hr>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>
