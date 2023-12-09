<script setup lang="ts">
import { onMounted } from "vue";
import useUsers from "../hooks/useUsers";
import ProfileForm from "../components/Profile/ProfileForm.vue";
import useOrganizationMembers from "../hooks/useOrganizationMembers";
import useOrganizations from "../hooks/useOrganizations";
import useReports from "../hooks/useReports";
import useDatasources from "../hooks/useDatasources";
import useAnalyzes from "../hooks/useAnalyzes";

const { currentUser } = useUsers()
const { getUserMemberships, userMemberships, isOrganizationMembersLoading } = useOrganizationMembers()
const { getUserOrganizations, userOrganizations, isOrganizationsLoading } = useOrganizations()
const { getUserReports, userReports, isReportsLoading } = useReports()
const { getUserDatasources, userDatasources, isDatasourcesLoading } = useDatasources()
const { getUserAnalyzes, userAnalyzes, isAnalyzesLoading } = useAnalyzes()

onMounted(async () => {
  if (currentUser.value) {
    await getUserMemberships(currentUser.value.id)
    await getUserOrganizations(currentUser.value.id)
    await getUserReports(currentUser.value.id)
    await getUserDatasources(currentUser.value.id)
    await getUserAnalyzes(currentUser.value.id)
  }
})

</script>

<template>
  <section v-if="currentUser" class="flex flex-wrap justify-content-center my-3">
    <!-- <section class="flex flex-wrap justify-content-center my-3"> -->
    <ProfileForm />
    <div class="max-w-25rem">
      <div>
        <h3>Memberships</h3>
        <div v-if="isOrganizationMembersLoading">Loading...</div>
        <div v-else>{{ userMemberships }}</div>
      </div>
      <div>
        <h3>Organizations</h3>
        <div v-if="isOrganizationsLoading">Loading...</div>
        <div v-else>{{ userOrganizations }}</div>
      </div>
      <div>
        <h3>Reports</h3>
        <div v-if="isReportsLoading">Loading...</div>
        <div>{{ userReports }}</div>
      </div>
      <div>
        <h3>Datasources</h3>
        <div v-if="isDatasourcesLoading">Loading...</div>
        <div>{{ userDatasources }}</div>
      </div>
      <div>
        <h3>Analyzes</h3>
        <div v-if="isAnalyzesLoading">Loading...</div>
        <div>{{ userAnalyzes }}</div>
      </div>
    </div>
  </section>
</template>
