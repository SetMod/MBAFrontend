<script setup lang="ts">
import { onMounted } from "vue";
import useUsers from "../hooks/useUsers";
import ProfileForm from "../components/Profile/ProfileForm.vue";
import DatasourcesTable from "../components/Datasources/DatasourcesTable.vue";
import OrganizationsTable from "../components/Organizations/OrganizationsTable.vue"
import AnalyzesTable from "../components/Analyzes/AnalyzesTable.vue";
import ReportsTable from "../components/Reports/ReportsTable.vue";
import UserMembershipsTable from "../components/Users/UserMembershipsTable.vue";
import useMembers from "../hooks/useMembers";
import useOrganizations from "../hooks/useOrganizations";
import useDatasources from "../hooks/useDatasources";
import useReports from "../hooks/useReports";
import useAnalyzes from "../hooks/useAnalyzes";

const { currentUser, } = useUsers()
const { isMembersLoading, userMembershipsFull, getUserMembershipsFull } = useMembers()
const { isOrganizationsLoading, userOrganizations, getUserOrganizations } = useOrganizations()
const { isDatasourcesLoading, userDatasourcesFull, getUserDatasourcesFull } = useDatasources()
const { isReportsLoading, userReportsFull, getUserReportsFull } = useReports()
const { isAnalyzesLoading, userAnalyzesFull, getUserAnalyzesFull } = useAnalyzes()

onMounted(async () => {
  if (currentUser.value) {
    await getUserMembershipsFull(currentUser.value.id)
    await getUserOrganizations(currentUser.value.id)
    await getUserReportsFull(currentUser.value.id)
    await getUserDatasourcesFull(currentUser.value.id)
    await getUserAnalyzesFull(currentUser.value.id)
  }
})

</script>

<template>
  <!-- <section v-if="currentUser" class="flex flex-wrap justify-content-center my-3"> -->
  <!-- <section class="flex flex-wrap justify-content-center my-3"> -->
  <section v-if="currentUser">
    <div>
    </div>

    <div class="card flex">
      <ProfileForm v-if="currentUser" :user="currentUser" />
      <TabView class="w-full">
        <TabPanel header="Memberships">
          <UserMembershipsTable :memberships="userMembershipsFull" :is-loading="isMembersLoading" />
        </TabPanel>
        <TabPanel header="Organizations">
          <OrganizationsTable :organizations="userOrganizations" :is-loading="isOrganizationsLoading" />
        </TabPanel>
        <TabPanel header="Datasources">
          <DatasourcesTable :datasources="userDatasourcesFull" :is-loading="isDatasourcesLoading" />
        </TabPanel>
        <TabPanel header="Analyzes">
          <AnalyzesTable :analyzes="userAnalyzesFull" :is-loading="isAnalyzesLoading" />
        </TabPanel>
        <TabPanel header="Reports">
          <ReportsTable :reports="userReportsFull" :is-loading="isReportsLoading" />
        </TabPanel>
      </TabView>
    </div>
  </section>
</template>
