<template>
  <el-form
    class="flex flex-col gap-2"
    @submit.prevent="onSubmit"
    :model="form"
    ref="loginFormRef"
    :rules="rules"
  >
    <h2 class="flex justify-center text-gray-500 text-xl font-semibold mb-2">
      Regsiter Your Account
    </h2>

    <!-- error box -->
    <transition name="error-box" mode="out-in">
  <div
    v-if="errors"
    :key="errorBoxKey"
    class="rounded-md mb-2 border-[1px] border-orange-500 bg-yellow-100 text-orange-700 p-2 error-box-wobble"
  >
    <ul class="list-disc pl-5">
      <li v-for="(err, index) in errors.username" :key="index">{{ err.message }}</li>
      <li v-for="(err, index) in errors.email" :key="index">{{ err.message }}</li>
      <li v-for="(err, index) in errors.password" :key="index">{{ err.message }}</li>
      <li v-for="(err, index) in errors.confirm_password" :key="index">{{ err.message }}</li>
    </ul>
  </div>
</transition>

    <el-form-item prop="username">
      <el-input
        v-model="form.username"
        class="h-[48px]"
        clearable
        placeholder="Username"
        :input-style="{ color: 'black' }"
      >
        <template #prefix>
          <div class="flex items-center gap-3">
            <IconUser class="w-5 h-5 text-gray-500" />
          </div>
        </template>
      </el-input>
    </el-form-item>

    <!-- email -->
    <el-form-item prop="email">
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

    <!-- password -->
    <el-form-item prop="password">
      <el-input
        class="h-[48px]"
        v-model="form.password"
        type="password"
        autocomplete="off"
        show-password
        :input-style="{ color: 'black' }"
        placeholder="Enter password"
      >
        <template #prefix>
          <div class="flex items-center gap-3">
            <IconLock class="w-5 h-5 text-gray-500" />
          </div>
        </template>
      </el-input>
    </el-form-item>

    <!-- confirm -->
    <el-form-item prop="confirm_password">
      <el-input
        class="h-[48px]"
        v-model="form.confirm_password"
        type="password"
        autocomplete="off"
        show-password
        :input-style="{ color: 'black' }"
        placeholder="Confirm Password"
      >
        <template #prefix>
          <div class="flex items-center gap-3">
            <IconLock class="w-5 h-5 text-gray-500" />
          </div>
        </template>
      </el-input>
    </el-form-item>
    <div class="flex gap-3">
      <span class="text-[18px] font-normal">Do you have an account?</span>
      <router-link class="text-[18px] font-medium text-[#0A65CC]" :to="{ name: 'Login' }"
        >Log in</router-link
      >
    </div>
    <button
      type="submit"
      class="bg-[#0A65CC] w-full text-white py-[14px] rounded-[6px] text-medium flex justify-center gap-[10px]"
    >
      Sign up <IconArrowRight />
    </button>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
const router = useRouter()
const form = ref({
  username: '',
  email: '',
  password: '',
  confirm_password: '',
})
const errors = ref(null)
const errorBoxKey = ref(0)



const loginFormRef = ref()

const rules = reactive({
  username: [
    {
      required: true,
      message: 'Username is required',
      trigger: 'blur',
    },
    {
      min: 3,
      message: 'Username must be at least 3 characters',
      trigger: 'blur',
    },
  ],
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
      message: 'Password must be at least 8 characters',
      trigger: 'blur',
    },
  ],

  confirm_password: [
    {
      validator: (rule, value, callback) => {
        if (value !== form.value.password) {
          callback(new Error("Confirm password doesn't match"))
        }
        callback()
      },
      trigger: ['blur', 'change'],
    },
    {
      min: 6,
      message: 'Password must be at least 8 characters',
      trigger: 'blur',
    },
  ],
})

const handleErrors = (err) => {
  errors.value = err
  errorBoxKey.value++
}
const onSubmit = async () => {
  if (!loginFormRef.value) return
  try {
    const valid = await loginFormRef.value.validate()
    if (valid) {
      await axios.post('http://localhost:3000/auth/register', form.value)
      router.push({ name: 'Login' })
    }
  } catch (error) {
    handleErrors(error)
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
