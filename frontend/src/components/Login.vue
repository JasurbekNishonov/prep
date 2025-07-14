<template>
  <el-form
    class="flex flex-col gap-2"
    @submit.prevent="onSubmit"
    :model="form"
    ref="loginFormRef"
    :rules="rules"
  >
    <h2 class="flex justify-center text-gray-500 text-xl font-semibold mb-4">
      Log In To Your Account
    </h2>

    <!-- error box -->
    <transition name="error-box" mode="out-in">
      <div
        v-if="errors"
        :key="errorBoxKey"
        class="rounded-md mb-2 border-[1px] border-orange-500 bg-yellow-100 text-orange-700 p-2 error-box-wobble"
      >
        <ul class="list-disc pl-5">
          <li v-for="(err, index) in errors.email" :key="index">{{ err.message }}</li>
          <li v-for="(err, index) in errors.password" :key="index">{{ err.message }}</li>
        </ul>
      </div>
    </transition>

    <el-form-item prop="email" class="mt-4">
      <el-input
        v-model="form.email"
        class="h-[48px]"
        clearable
        placeholder="example.com"
        :input-style="{ color: 'black' }"
      >
        <template #prefix>
          <div class="flex items-center gap-3">
            <IconMail class="w-5 h-5 text-gray-500" />
          </div>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item prop="password">
      <el-input
        class="h-[48px]"
        v-model="form.password"
        type="password"
        autocomplete="off"
        show-password
        :input-style="{ color: 'black' }"
        placeholder="Parolni kiriting"
      >
        <template #prefix>
          <div class="flex items-center gap-3">
            <IconLock class="w-5 h-5 text-gray-500" />
          </div>
        </template>
      </el-input>
    </el-form-item>
    <div class="flex gap-3">
      <span class="text-[18px] font-normal">Do not have an account?</span>
      <router-link class="text-[18px] font-medium text-[#0A65CC]" :to="{ name: 'Register' }"
        >Sign up</router-link
      >
    </div>
    <button
      type="submit"
      class="bg-[#0A65CC] w-full text-white py-[14px] rounded-[6px] text-medium flex justify-center gap-[10px]"
    >
      Log in <IconArrowRight />
    </button>
  </el-form>
</template>

<script lang="ts" setup>
import { useStore } from '../stores';
import axios from 'axios'
import { jwtDecode } from 'jwt-decode';
import { reactive, ref } from 'vue'
import {useRouter} from 'vue-router';

const store = useStore()
const router = useRouter()
const form = ref({
  email: '',
  password: '',
})
const errors = ref(null)
const errorBoxKey = ref(0)
const loginFormRef = ref()

const rules = reactive({
  email: [
    {
      required: true,
      message: 'Email is required',
      trigger: 'blur',
    },
    {
      type: 'email',
      message: 'Invalid Email',
      trigger: 'blur',
    },
  ],

  password: [
    {
      required: true,
      message: 'Password is required',
      trigger: 'blur',
    },
    {
      min: 6,
      message: 'Password must be at least 6 characters',
      trigger: 'blur',
    },
  ],
})

const handleError = (err) => {
  errors.value = err
  errorBoxKey.value++
  console.log(errors.value);
}

const onSubmit = async () => {
  if (!loginFormRef.value) return
  try {
    const valid = await loginFormRef.value.validate()
    if (valid) {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, form.value)
      const token = res.data.token
      const decoded = jwtDecode(token)
      
      // storing token and its expiration time in localstorage
      localStorage.setItem('token', token)
      localStorage.setItem('tokenExpiration', String(decoded.exp * 1000)) 
      
      store.autoLogOut()
      router.push({name: "Profile"})
    }
  } catch (error) {
    handleError(error)
  }
}
</script>

<style scoped>
@keyframes wobble {
  0%, 100% {
    transform: translateX(0);
  }
  15% {
    transform: translateX(-25px);
  }
  30% {
    transform: translateX(20px);
  }
  45% {
    transform: translateX(-15px);
  }
  60% {
    transform: translateX(10px);
  }
  75% {
    transform: translateX(-5px);
  }
}

.error-box-wobble {
  animation: wobble 0.6s ease-in-out;
}
</style>
