<template>
  <Dialog v-model:visible="showMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
    <div class="flex align-items-center flex-column pt-6 px-3">
      <i class="pi pi-check-circle" :style="{ fontSize: '5rem', color: 'var(--green-500)' }"></i>
      <h5>Sign in successful!</h5>
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

      <form class="p-card-body" @submit.prevent="handleSubmit(!v$.$invalid)">
        <div>
          <div class="flex justify-content-between align-content-center mt-2">
            <label for="Username" class="flex align-items-center mr-3"
              :class="{ 'p-error': v$.userUsername.$invalid && submitted }">Username:</label>
            <InputText v-model="v$.userUsername.$model" :class="{ 'p-invalid': v$.userUsername.$invalid && submitted }"
              placeholder="Username" />
          </div>

          <small v-if="(v$.userUsername.$invalid && submitted) || v$.userUsername.$pending" class="p-error">{{
              v$.userUsername.required.$message.replace('Value', 'Name')
          }}</small>
        </div>

        <div>
          <div class="flex justify-content-between align-content-center mt-2">
            <label for="Password" class="flex align-items-center mr-3"
              :class="{ 'p-error': v$.userPassword.$invalid && submitted }">Password:</label>

            <Password v-model="v$.userPassword.$model" placeholder="Password"
              :class="{ 'p-invalid': v$.userPassword.$invalid && submitted }" toggle-mask :feedback="false" />
          </div>

          <small v-if="(v$.userPassword.$invalid && submitted) || v$.userPassword.$pending" class="p-error">{{
              v$.userPassword.required.$message.replace('Value', 'Password')
          }}</small>
        </div>
        <div class="p-card-footer flex justify-content-around align-content-center mt-2">
          <Button type="submit">Submit</Button>
          <Button class="p-button-secondary" label="Sign Un" @click="signUpRedirect" />
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
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Dialog from "primevue/dialog";
import useRoles from "../hooks/useRoles";

export default defineComponent({
  components: {
    Button,
    InputText,
    Password,
    Dialog
  },
  setup() {
    onMounted(() => {
      getRoles()
    })
    const { getRoles } = useRoles()
    const { signUpRedirect, sigInUser } = useUsers()
    const submitted = ref(false);
    const showMessage = ref(false);

    const state = reactive({
      userUsername: '',
      userPassword: ''
    })
    const rules = {
      userUsername: { required },
      userPassword: { required }
    }

    const v$ = useVuelidate(rules, state)

    const handleSubmit = (isFormValid: boolean) => {
      submitted.value = true;

      if (!isFormValid) {
        return;
      }
      sigInUser(state.userUsername, state.userPassword)
      toggleDialog();
    }
    const toggleDialog = () => {
      showMessage.value = !showMessage.value;

      if (!showMessage.value) {
        resetForm();
      }


    }
    const resetForm = () => {
      state.userUsername = '';
      state.userPassword = '';
      submitted.value = false;
    }

    const signIn = () => {

    }
    return {
      v$,
      state,
      rules,
      submitted,
      showMessage,
      handleSubmit,
      toggleDialog,
      signUpRedirect,
      signIn
    }
  }
});
</script>


<style>
</style>