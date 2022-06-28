<template>
  <Toast />
  <div class="p-card w-29rem mt-8 mx-auto">
    <h3 class="p-card-title">Sign Up</h3>

    <div class="p-card-body text-left">
      <div class="p-fluid text-left">
        <div class="field">
          <label>First name:</label>
          <InputText v-model="v$.userFirstName.$model" :class="{ 'p-invalid': v$.userFirstName.$invalid && submitted }"
            placeholder="first name" />
          <small v-if="(v$.userFirstName.$invalid && submitted) || v$.userFirstName.$pending" class="p-error">{{
              v$.userFirstName.required.$message.replace('Value', 'First name')
          }}</small>
        </div>

        <div class="field">
          <label>Second name:</label>
          <InputText v-model="v$.userSecondName.$model"
            :class="{ 'p-invalid': v$.userSecondName.$invalid && submitted }" placeholder="second name" />
          <small v-if="(v$.userSecondName.$invalid && submitted) || v$.userSecondName.$pending" class="p-error">{{
              v$.userSecondName.required.$message.replace('Value', 'Second name')
          }}</small>
        </div>

        <div class="field">
          <label>E-mail:</label>
          <InputText v-model="v$.userEmail.$model" :class="{ 'p-invalid': v$.userEmail.$invalid && submitted }"
            placeholder="email@example.com" type="email" />
          <span v-if="v$.userEmail.$error && submitted">
            <span v-for="(error, index) of v$.userEmail.$errors" id="email-error" :key="index">
              <small class="p-error">{{ error.$message }}</small>
            </span>
          </span>
          <small v-else-if="(v$.userEmail.$invalid && submitted) || v$.userEmail.$pending" class="p-error">{{
              v$.userEmail.required.$message.replace('Value', 'E-mail')
          }}</small>
        </div>

        <div class="field">
          <label>Phone number:</label>
          <InputMask v-model="v$.userPhone.$model" mask="+99 (999) 999-9999" placeholder="+ 99 (999) 999-9999" />
          <small v-if="(v$.userPhone.required.$invalid && submitted) || v$.userPhone.$pending" class="p-error">{{
              v$.userPhone.required.$message.replace('Value', 'Phone number')
          }}</small>
          <small v-else-if="v$.userPhone.minLength.$invalid && submitted" class="p-error">{{
              v$.userPhone.minLength.$message.replace('Value', 'Phone number')
          }}</small>
          <small v-else-if="v$.userPhone.maxLength.$invalid && submitted" class="p-error">{{
              v$.userPhone.maxLength.$message.replace('Value', 'Phone number')
          }}</small>
        </div>

        <div class="field">
          <label>Username:</label>
          <InputText v-model="v$.userUsername.$model" :class="{ 'p-invalid': v$.userUsername.$invalid && submitted }"
            placeholder="username" />
          <small v-if="v$.userUsername.required.$invalid && submitted" class="p-error">{{
              v$.userUsername.required.$message.replace('Value', 'Username')
          }}</small>
          <small v-else-if="v$.userUsername.minLength.$invalid && submitted" class="p-error">{{
              v$.userUsername.minLength.$message.replace('This field', 'Username')
          }}</small>
        </div>

        <div class="field">
          <label>Password:</label>
          <Password v-model="v$.userPassword.$model" :class="{ 'p-invalid': v$.userPassword.$invalid && submitted }"
            placeholder="password" toggle-mask />
          <small v-if="(v$.userPassword.required.$invalid && submitted) || v$.userPassword.$pending" class="p-error">{{
              v$.userPassword.required.$message.replace('Value', 'Password')
          }}</small>
        </div>

        <div class="field">
          <label>Confirm password:</label>
          <Password v-model="v$.userConfirmPassword.$model"
            :class="{ 'p-invalid': v$.userConfirmPassword.$invalid && submitted }" placeholder="password" toggle-mask
            :feedback="submitted" />
          <small v-if="(v$.userConfirmPassword.required.$invalid && submitted) || v$.userConfirmPassword.$pending"
            class="p-error">{{
                v$.userConfirmPassword.required.$message.replace('Value', 'Password')
            }}</small>
          <small
            v-else-if="(v$.userConfirmPassword.sameAsPassword.$invalid && submitted) || v$.userConfirmPassword.$pending"
            class="p-error">Password doesn't match</small>
        </div>

        <!-- <div>
          <div class="field flex flex-column align-content-center">
            <label for="role">Role:</label>
            <Dropdown v-model="selectedRole" :options="roles" option-label="roleName" placeholder="Select a role"
              :filter="true" filter-placeholder="Find Role" :loading="!roles" />
          </div>

          <small v-if="!selectedRole && submitted" class="p-error">Role is required</small>
        </div> -->
      </div>


      <div class="p-card-footer flex justify-content-around align-items-center">
        <Button @click="submitSignUp">Submit</Button>
        <Button class="p-button-secondary" @click="redirectSignIn">Sign In</Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref, defineComponent, computed } from "vue";
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, maxLength, sameAs } from "@vuelidate/validators";
import useRoles from "../hooks/useRoles";
import Users from "../models/UsersModel";
import useUsers from "../hooks/useUsers";
import useRedirect from "../hooks/useRedirect";
import Roles from "../models/RolesModel";
import { useToast } from "primevue/usetoast";

export default defineComponent({
  setup() {
    const { getRoleByName } = useRoles()
    const { signUp } = useUsers()
    const { redirectSignIn } = useRedirect()
    const toast = useToast()
    const confirmPassword = ref("")
    const submitted = ref(false);

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

    const submitSignUp = async () => {
      submitted.value = true;
      if (v$.value.$invalid) return toast.add({ severity: 'warn', summary: 'Warning', detail: 'Validate all fields', life: 3000 });

      const newUser = new Users()
      const role = await getRoleByName('User')
      newUser.userFirstName = state.userFirstName
      newUser.userSecondName = state.userSecondName
      newUser.userEmail = state.userEmail
      newUser.userUsername = state.userUsername
      newUser.userPassword = state.userPassword
      newUser.userPhone = state.userPhone
      newUser.roleId = role instanceof Roles ? role.roleId : 1
      const response = await signUp(newUser)
      if (response instanceof String) return toast.add({ severity: 'error', summary: 'Failed', detail: response, life: 3000 });
      toast.add({ severity: 'success', summary: 'Success', detail: 'Signed Up', life: 3000 });
      redirectSignIn();
    }
    return {
      confirmPassword,
      state,
      v$,
      submitted,
      submitSignUp,
      redirectSignIn
    };
  },
});
</script>

<style>
</style>