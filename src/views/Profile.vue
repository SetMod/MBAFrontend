<script setup lang="ts">
import { onMounted } from "vue";
import useUsers from "../hooks/useUsers";
import ProfileForm from "../components/Profile/ProfileForm.vue";
import DatasourcesTable from "../modules/Datasources/components/DatasourcesTable.vue";
import OrganizationsTable from "../modules/Organizations/components/OrganizationsTable.vue"
import AnalyzesTable from "../modules/Analyzes/components/AnalyzesTable.vue";
import ReportsTable from "../modules/Reports/components/ReportsTable.vue";
import UserMembershipsTable from "../modules/Members/components/UserMembershipsTable.vue";
import useMembers from "../hooks/useMembers";
import useOrganizations from "../hooks/useOrganizations";
import useDatasources from "../hooks/useDatasources";
import useReports from "../hooks/useReports";
import useAnalyzes from "../hooks/useAnalyzes";

const { currentUser, } = useUsers()
const { isMembersLoading, userMembershipsFull, getUserMembershipsFull } = useMembers()
const { isOrganizationsLoading, userOrganizations, selectedOrganization, getUserOrganizations } = useOrganizations()
const { isDatasourcesLoading, userDatasourcesFull, getUserDatasourcesFull } = useDatasources()
const { isReportsLoading, userReportsFull, getUserReportsFull } = useReports()
const { isAnalyzesLoading, userAnalyzesFull, getUserAnalyzesFull } = useAnalyzes()

onMounted(async () => {
  await refreshMembershipsTable()
  await refreshOrganizationsTable()
  await refreshReportsTable()
  await refreshDatasourcesTable()
  await refreshAnalyzesTable()
})

const refreshMembershipsTable = async () => {
  if (currentUser.value) {
    await getUserMembershipsFull(currentUser.value.id)
  }
}
const refreshOrganizationsTable = async () => {
  if (currentUser.value) {
    await getUserOrganizations(currentUser.value.id)
  }
}

const refreshDatasourcesTable = async () => {
  if (currentUser.value) {
    await getUserDatasourcesFull(currentUser.value.id)
  }
}
const refreshAnalyzesTable = async () => {
  if (currentUser.value) {
    await getUserAnalyzesFull(currentUser.value.id)
  }
}
const refreshReportsTable = async () => {
  if (currentUser.value) {
    await getUserReportsFull(currentUser.value.id)
  }
}

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
          <UserMembershipsTable :memberships="userMembershipsFull" :is-loading="isMembersLoading"
            @refresh-table="refreshMembershipsTable" />
        </TabPanel>
        <TabPanel header="Organizations">
          <OrganizationsTable :organizations="userOrganizations" :is-loading="isOrganizationsLoading"
            @refresh-table="refreshOrganizationsTable" />
        </TabPanel>
        <TabPanel header="Datasources">
          <DatasourcesTable v-if="selectedOrganization" :datasources="userDatasourcesFull"
            :selected-organization="selectedOrganization" :is-loading="isDatasourcesLoading"
            @refresh-table="refreshDatasourcesTable" />
        </TabPanel>
        <TabPanel header="Analyzes">
          <AnalyzesTable :analyzes="userAnalyzesFull" :is-loading="isAnalyzesLoading"
            @refresh-table="refreshAnalyzesTable" />
        </TabPanel>
        <TabPanel header="Reports">
          <ReportsTable :reports="userReportsFull" :is-loading="isReportsLoading" @refresh-table="refreshReportsTable" />
        </TabPanel>
      </TabView>
    </div>
  </section>
</template>
