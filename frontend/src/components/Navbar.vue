<template>
    <nav class="flex justify-between bg-[#2c3e50] text-white px-6 py-6">
      <div class="flex gap-10">
        <router-link
          to="/transaction"
          class="text-white text-lg"
          active-class="!bg-blue-600"
        >
        Transaction
        </router-link>
  
        <router-link
          to="/history"
          class="text-white text-lg"
          active-class="!bg-blue-600"
        >
          Transaction History
        </router-link>
      </div>
      <div class="flex gap-10">
        <router-link
          to="/profile"
          class="text-white text-lg"
          active-class="!bg-blue-600"
        >
        My profile
        </router-link>
        <el-button plain @click="open">Log out</el-button>
      </div>
    </nav>
  </template>

<script lang="ts" setup>
import { useStore } from '../stores/index'
import { ElMessage, ElMessageBox } from 'element-plus'
const store= useStore()
const open = () => {
  ElMessageBox.confirm('Are you sure you want to log out?', 'Warning',{
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(() => {
      store.logOut()
      ElMessage({
        type: 'success',
        message: 'Logged out!',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Cancelled',
      })
    })
}
</script>