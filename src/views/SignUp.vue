<template>
  <Dialog v-model:visible="showMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
    <div class="flex align-items-center flex-column pt-6 px-3">
      <i class="mb-3 pi" :class="isSuccess ? 'pi-check-circle' : 'pi-exclamation-circle'"
        :style="{ fontSize: '5rem', color: isSuccess ? 'var(--green-500)' : 'var(--red-500)' }"></i>
      <h5>{{ message }}</h5>
    </div>
    <template #footer>
      <div class="flex justify-content-center">
        <Button label="OK" class="p-button-text" @click="toggleDialog" />
      </div>
    </template>
  </Dialog>

  <section class="flex justify-content-center align-items-center">
    <div class="p-card w-30rem mt-8">
      <h3 class="p-card-title">Sign Up</h3>

      <form class="p-card-body text-left" @submit.prevent="handleSubmit(!v$.$invalid)">
        <div>
          <div class="field flex flex-column align-content-center">
            <label for="firstName">First name:</label>

            <InputText v-model="v$.userFirstName.$model"
              :class="{ 'p-invalid': v$.userFirstName.$invalid && submitted }" placeholder="first name" />
          </div>

          <small v-if="(v$.userFirstName.$invalid && submitted) || v$.userFirstName.$pending" class="p-error">{{
              v$.userFirstName.required.$message.replace('Value', 'First name')
          }}</small>
        </div>

        <div>
          <div class="field flex flex-column align-content-center">
            <label for="secondName" class="flex align-items-center">Second name:</label>

            <InputText v-model="v$.userSecondName.$model"
              :class="{ 'p-invalid': v$.userSecondName.$invalid && submitted }" placeholder="second name" />
          </div>

          <small v-if="(v$.userSecondName.$invalid && submitted) || v$.userSecondName.$pending" class="p-error">{{
              v$.userSecondName.required.$message.replace('Value', 'Second name')
          }}</small>
        </div>

        <div>
          <div class="field flex flex-column align-content-center">
            <label for="email">E-mail:</label>
            <InputText v-model="v$.userEmail.$model" :class="{ 'p-invalid': v$.userEmail.$invalid && submitted }"
              placeholder="email@example.com" type="email" />
          </div>

          <span v-if="v$.userEmail.$error && submitted">
            <span v-for="(error, index) of v$.userEmail.$errors" id="email-error" :key="index">
              <small class="p-error">{{ error.$message }}</small>
            </span>
          </span>

          <small v-else-if="(v$.userEmail.$invalid && submitted) || v$.userEmail.$pending" class="p-error">{{
              v$.userEmail.required.$message.replace('Value', 'E-mail')
          }}</small>
        </div>

        <div>
          <div class="field flex flex-column align-content-center">
            <label for="username">Username:</label>
            <InputText v-model="v$.userUsername.$model" :class="{ 'p-invalid': v$.userUsername.$invalid && submitted }"
              placeholder="username" />
          </div>

          <small v-if="(v$.userUsername.$invalid && submitted) || v$.userUsername.$pending" class="p-error">{{
              v$.userUsername.required.$message.replace('Value', 'Username')
          }}</small>
        </div>

        <div>
          <div class="field flex flex-column align-content-center">
            <label for="password">Password:</label>
            <Password v-model="v$.userPassword.$model" class="w-fit"
              :class="{ 'p-invalid': v$.userPassword.$invalid && submitted }" placeholder="password" toggle-mask />
          </div>

          <small v-if="(v$.userPassword.required.$invalid && submitted) || v$.userPassword.$pending" class="p-error">{{
              v$.userPassword.required.$message.replace('Value', 'Password')
          }}</small>
        </div>

        <div>
          <div class="field flex flex-column align-content-center">
            <label for="confirmPassword">Confirm password:</label>
            <Password v-model="v$.userConfirmPassword.$model" class="w-fit"
              :class="{ 'p-invalid': v$.userConfirmPassword.$invalid && submitted }" placeholder="confirm password"
              :feedback="false" />
          </div>

          <small v-if="v$.userConfirmPassword.required.$invalid && submitted" class="p-error">{{
              v$.userConfirmPassword.required.$message.replace('Value', 'Confirm password')
          }}</small>
          <small
            v-else-if="(v$.userConfirmPassword.sameAsPassword.$invalid && submitted) || v$.userConfirmPassword.$pending"
            class="p-error">Confirm password must be qual to password</small>
        </div>

        <div>
          <div class="field flex flex-column align-content-center">
            <label for="phone">Phone number:</label>
            <!-- <InputText v-model="v$.userPhone.$model" :class="{ 'p-invalid': v$.userPhone.$invalid && submitted }"
              placeholder="+38012345678" type="tel" /> -->
            <!-- <InputMask v-model="v$.userPhone.$model" mask="+99 (999) 999-9999" placeholder="+ 99 (999) 999-9999" /> -->
            <InputMask v-model="v$.userPhone.$model" mask="+99 (999) 999-9999" placeholder="+ 99 (999) 999-9999" />
          </div>

          <small v-if="(v$.userPhone.required.$invalid && submitted) || v$.userPhone.$pending" class="p-error">{{
              v$.userPhone.required.$message.replace('Value', 'Phone number')
          }}</small>
          <small v-else-if="v$.userPhone.minLength.$invalid" class="p-error">{{
              v$.userPhone.minLength.$message.replace('Value', 'Phone number')
          }}</small>
          <small v-else-if="v$.userPhone.maxLength.$invalid" class="p-error">{{
              v$.userPhone.maxLength.$message.replace('Value', 'Phone number')
          }}</small>
        </div>

        <div>
          <div class="field flex flex-column align-content-center">
            <label for="role">Role:</label>
            <Dropdown v-model="selectedRole" :options="roles" option-label="roleName" placeholder="Select a role"
              :filter="true" filter-placeholder="Find Role" :loading="!roles" />
          </div>

          <small v-if="!selectedRole && submitted" class="p-error">Role is required</small>
        </div>

        <div class="p-card-footer flex justify-content-around align-content-center">
          <Button type="submit">Submit</Button>
          <Button class="p-button-secondary" @click="redirectSignIn">Sign In</Button>
        </div>
      </form>
    </div>
  </section>
</template>

<script lang="ts">
import { reactive, ref, defineComponent, onMounted, computed } from "vue";
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, maxLength, sameAs } from "@vuelidate/validators";
import useRoles from "../hooks/useRoles";
import Users from "../models/UsersModel";
import useUsers from "../hooks/useUsers";
import useRedirect from "../hooks/useRedirect";
import Roles from "../models/RolesModel";

export default defineComponent({
  setup() {
    onMounted(async () => {
      await getRoles()
    })

    const { roles, getRoles } = useRoles()
    const { signUp } = useUsers()
    const { redirectSignIn } = useRedirect()

    const confirmPassword = ref("")
    const newUser = reactive(new Users())
    const submitted = ref(false);
    const showMessage = ref(false);
    const selectedRole = ref<Roles>()
    const message = ref<String>('Sign in successful!')
    const isSuccess = ref(true)

    const state = reactive({
      userFirstName: '',
      userSecondName: '',
      userEmail: '',
      userUsername: '',
      userPassword: '',
      userConfirmPassword: '',
      userPhone: '',
      roleId: 0,
    })
    const userPassword = computed(() => {
      return state.userPassword
    })
    const rules = {
      userFirstName: { required },
      userSecondName: { required },
      userEmail: { required, email },
      userUsername: { required, minLength: minLength(4) },
      userPassword: { required, minLength: minLength(6) },
      userConfirmPassword: { required, sameAsPassword: sameAs(userPassword) },
      userPhone: { required, minLength: minLength(18), maxLength: maxLength(18) },
    }

    const v$ = useVuelidate(rules, state)

    const handleSubmit = async (isFormValid: boolean) => {
      submitted.value = true;

      if (!isFormValid) {
        return;
      }


      newUser.userFirstName = state.userFirstName
      newUser.userSecondName = state.userSecondName
      newUser.userEmail = state.userEmail
      newUser.userUsername = state.userUsername
      newUser.userPassword = state.userPassword
      newUser.userPhone = state.userPhone
      newUser.roleId = state.roleId
      const result = await signUp(newUser)
      if (typeof result !== 'string') {
        message.value = 'Sign Up successful!'
        isSuccess.value = true
      }
      else {
        isSuccess.value = false
        message.value = result
      }
      toggleDialog();
    }
    const toggleDialog = () => {
      showMessage.value = !showMessage.value;
      if (!showMessage.value) resetForm();
    }
    const resetForm = () => {
      newUser.userFirstName = ''
      newUser.userSecondName = ''
      newUser.userEmail = ''
      newUser.userUsername = ''
      newUser.userPassword = ''
      newUser.userPhone = ''
      newUser.roleId = 0
      submitted.value = false;
    }
    const submit = () => {

    }

    return {
      roles,
      confirmPassword,
      state,
      v$,
      showMessage,
      isSuccess,
      submitted,
      message,
      selectedRole,
      toggleDialog,
      handleSubmit,
      redirectSignIn
    };
  },
});
</script>

<style>
</style>