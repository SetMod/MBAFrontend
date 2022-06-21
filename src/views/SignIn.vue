<template>
  <Dialog v-model:visible="showMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
    <div class="flex align-items-center flex-column pt-6 px-3">
      <i class="mb-3 pi" :class="isLoggedIn ? 'pi-check-circle' : 'pi-exclamation-circle'"
        :style="{ fontSize: '5rem', color: isLoggedIn ? 'var(--green-500)' : 'var(--red-500)' }"></i>
      <h5>{{ message }}</h5>
    </div>
    <template #footer>
      <div class="flex justify-content-center">
        <Button label="OK" class="p-button-text" @click="toggleDialog" />
      </div>
    </template>
  </Dialog>

  <section class="flex justify-content-center align-items-center mt-8">
    <div class="p-card">
      <h3 class="p-card-title">Sign In</h3>

      <form class="p-card-body text-left" @submit.prevent="handleSubmit(!v$.$invalid)">
        <div>
          <div class="field flex flex-column align-content-center">
            <label for="Username" class="flex align-items-center mr-3">Username:</label>
            <InputText v-model="v$.userUsername.$model" :disabled="isUsersLoading"
              :class="{ 'p-invalid': v$.userUsername.$invalid && submitted }" placeholder="Username" />
          </div>

          <small v-if="(v$.userUsername.$invalid && submitted) || v$.userUsername.$pending" class="p-error">{{
              v$.userUsername.required.$message.replace('Value', 'Name')
          }}</small>
        </div>

        <div>
          <div class="field flex flex-column align-content-center">
            <label for="Password" class="flex align-items-center mr-3">Password:</label>

            <Password v-model="v$.userPassword.$model" placeholder="Password" :disabled="isUsersLoading"
              :class="{ 'p-invalid': v$.userPassword.$invalid && submitted }" toggle-mask :feedback="false" />
          </div>

          <small v-if="(v$.userPassword.$invalid && submitted) || v$.userPassword.$pending" class="p-error">{{
              v$.userPassword.required.$message.replace('Value', 'Password')
          }}</small>
        </div>
        <div class="p-card-footer flex justify-content-around align-content-center mt-2">
          <Button type="submit">Submit</Button>
          <Button class="p-button-secondary" label="Sign Un" @click="redirectSignUp" />
        </div>
      </form>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import useUsers from "../hooks/useUsers";
import useRedirect from "../hooks/useRedirect";

export default defineComponent({
  setup() {
    onMounted(async () => {
    })
    const { isUsersLoading, isLoggedIn, sigIn } = useUsers()
    const { redirectSignUp } = useRedirect()
    const submitted = ref(false);
    const showMessage = ref(false);
    const message = ref<String>('Sign in successful!')

    const state = reactive({
      userUsername: '',
      userPassword: ''
    })
    const rules = {
      userUsername: { required },
      userPassword: { required }
    }

    const v$ = useVuelidate(rules, state)

    const handleSubmit = async (isFormValid: boolean) => {
      submitted.value = true;

      if (!isFormValid) {
        return;
      }
      const result = await sigIn(state.userUsername, state.userPassword)
      if (typeof result !== 'string')
        message.value = 'Sign in successful!'
      else
        message.value = result
      toggleDialog();
    }
    const toggleDialog = () => {
      showMessage.value = !showMessage.value;

      if (!showMessage.value) {
        resetForm();
      }
    }
    const resetForm = () => {
      // state.userUsername = '';
      state.userPassword = '';
      submitted.value = false;
    }

    return {
      v$,
      state,
      rules,
      submitted,
      showMessage,
      isUsersLoading,
      isLoggedIn,
      message,
      handleSubmit,
      toggleDialog,
      redirectSignUp,
    }
  }
});
</script>


<style>
</style>