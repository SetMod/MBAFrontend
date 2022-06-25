<template>
  <Toast />
  <section class="flex justify-content-center align-items-center mt-8">
    <div class="p-card">
      <h3 class="p-card-title">Sign In</h3>
      <div class="p-card-body text-left">
        <div class="field flex flex-column align-content-center">
          <label for="Username" class="flex align-items-center mr-3">Username:</label>
          <InputText v-model="v$.userUsername.$model" :disabled="isUsersLoading"
            :class="{ 'p-invalid': v$.userUsername.$invalid && submitted }" placeholder="Username" />
          <small v-if="(v$.userUsername.$invalid && submitted) || v$.userUsername.$pending" class="p-error">{{
              v$.userUsername.required.$message.replace('Value', 'Name')
          }}</small>
        </div>


        <div class="field flex flex-column align-content-center">
          <label for="Password" class="flex align-items-center mr-3">Password:</label>
          <Password v-model="v$.userPassword.$model" placeholder="Password" :disabled="isUsersLoading"
            :class="{ 'p-invalid': v$.userPassword.$invalid && submitted }" toggle-mask :feedback="false" />
          <small v-if="(v$.userPassword.$invalid && submitted) || v$.userPassword.$pending" class="p-error">{{
              v$.userPassword.required.$message.replace('Value', 'Password')
          }}</small>
        </div>

        <div class="p-card-footer flex justify-content-around align-content-center mt-2">
          <Button @click="handleSubmit">Submit</Button>
          <Button class="p-button-secondary" label="Sign Un" @click="redirectSignUp" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import useUsers from "../hooks/useUsers";
import useRedirect from "../hooks/useRedirect";
import { useToast } from "primevue/usetoast";

export default defineComponent({
  setup() {
    const { isUsersLoading, isLoggedIn, sigIn } = useUsers()
    const { redirectSignUp, redirectHome } = useRedirect()
    const toast = useToast()
    const submitted = ref(false);
    const state = reactive({
      userUsername: '',
      userPassword: ''
    })
    const rules = {
      userUsername: { required },
      userPassword: { required }
    }
    const v$ = useVuelidate(rules, state)

    const handleSubmit = async () => {
      submitted.value = true;
      if (v$.value.$invalid) return toast.add({ severity: 'warn', summary: 'Warning', detail: 'Validate all fields', life: 3000 });

      const response = await sigIn(state.userUsername, state.userPassword)
      if (response instanceof String) return toast.add({ severity: 'error', summary: 'Failed', detail: response, life: 3000 });
      toast.add({ severity: 'success', summary: 'Success', detail: 'Signed in', life: 3000 });

      redirectHome()
    }
    return {
      v$,
      state,
      rules,
      submitted,
      isUsersLoading,
      isLoggedIn,
      handleSubmit,
      redirectSignUp,
    }
  }
});
</script>


<style>
</style>