<template>
  <div>
    <section class="p-card max-w-fit m-auto my-5">
      <h1 class="p-card-title">Analyze</h1>
      <form class="p-card-body" @submit.prevent="handleSubmit">
        <div class="field flex justify-content-between align-items-center">
          <label class="mr-2">Support:</label>
          <InputNumber v-model="state.support" placeholder="support" :step="0.1" />
        </div>

        <div class="field flex justify-content-between align-items-center">
          <label class="mr-2">Lift:</label>
          <InputNumber v-model="state.lift" placeholder="lift" :step="0.1" />
        </div>

        <div class="field flex justify-content-between align-items-center">
          <label class="mr-2">Confidence:</label>
          <InputNumber v-model="state.confidence" placeholder="confidence" :step="0.1" />
        </div>

        <div class="field flex justify-content-between align-items-center">
          <label for="Rule_length">Rule length:</label>
          <InputNumber v-model="state.ruleLength" placeholder="rule length" :step="0.1" />
        </div>

        <div class="p-card-footer">
          <Button type="submit" label="Analyze" />
        </div>
      </form>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import useCSV from "../hooks/useCSV";
import InputNumber from 'primevue/inputnumber';
import Button from "primevue/button";

export default defineComponent({
  components: {
    InputNumber,
    Button
  },
  setup() {
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
