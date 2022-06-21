<template>
  <div>
    <section class="p-card max-w-fit m-auto my-5">
      <h1 class="p-card-title">Analyze</h1>
      <form class="p-card-body" @submit.prevent="handleSubmit">
        <div class="field flex justify-content-between align-items-center">
          <label class="mr-2">Support:</label>
          <InputNumber v-model="state.support" :step="0.1" />
        </div>

        <div class="field flex justify-content-between align-items-center">
          <label class="mr-2">Lift:</label>
          <InputNumber v-model="state.lift" :step="0.1" />
        </div>

        <div class="field flex justify-content-between align-items-center">
          <label class="mr-2">Confidence:</label>
          <InputNumber v-model="state.confidence" :step="0.1" />
        </div>

        <div class="field flex justify-content-between align-items-center">
          <label for="Rule_length">Rule length:</label>
          <InputNumber v-model="state.ruleLength" :step="0.1" />
        </div>

        <div class="flex justify-content-between align-content-center mt-2">
          <label for="File" class="flex align-items-center">File:</label>
          <Dropdown v-model="selectedFileId" :options="files" option-label="fileName" placeholder="Select a file"
            :filter="true" filter-placeholder="Find file" :loading="isFilesLoading" />
        </div>

        <div class="flex justify-content-between align-content-center mt-2">
          <label for="Report" class="flex align-items-center">Report:</label>
          <Dropdown v-model="selectedReportId" :options="reports" option-label="reportName"
            placeholder="Select a report" :filter="true" filter-placeholder="Search report"
            :loading="isReportsLoading" />
        </div>

        <div class="p-card-footer">
          <Button type="submit" label="Analyze" />
        </div>
      </form>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import useFiles from "../hooks/useFiles";
import useOrganizations from "../hooks/useOrganizations";
import useReports from "../hooks/useReports";
import useUsers from "../hooks/useUsers";

export default defineComponent({
  setup() {
    onMounted(async () => {
      if (isLoggedIn.value && user.value) {
        await getUserFiles(user.value.userId)
        await getUserReports(user.value.userId)
      }
    })
    const { isLoggedIn, user } = useUsers()
    const { organization } = useOrganizations()
    const { getUserReports, userReports: reports, isReportsLoading } = useReports()
    const { getUserFiles, files, isFilesLoading } = useFiles()
    const selectedFileId = ref<number>()
    const selectedReportId = ref<number>()
    const state = reactive({
      support: 0.1,
      lift: 0.1,
      confidence: 0.1,
      ruleLength: 0
    })
    const handleSubmit = (event: any) => {
      console.log(event);
    }
    return {
      selectedFileId,
      selectedReportId,
      files,
      isFilesLoading,
      reports,
      isReportsLoading,
      state,
      handleSubmit,
    };
  },
});
</script>

<style>
.preview__header {
  text-align: left;
}

.form form {
  text-align: left;
  width: fit-content;
  margin: 0.5rem auto;
  margin-top: 1rem;
}

.table {
  max-width: 100%;
  overflow: auto;
}

.table table {
  margin: 0.5rem auto;
}
</style>
