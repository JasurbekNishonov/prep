<template>
    <div class="flex flex-col pt-4 px-6">
        <h2>Username: {{ user.username }}</h2>
        <span>User email: {{ user.email }}</span>
        <span>User balance: {{ user.balance }}$</span>
        <span>Created in: {{ formatDate(user.created_at) }}</span>
    </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { formatDate } from '../utils/index';
const user = ref([])

const getUser = async () => {
    try {
       const token = localStorage.getItem('token')
       const res = await axios.get("https://prep-backend-u66j.onrender.com/user", {
        headers: { Authorization: `Bearer ${token}`}
    })
    user.value = res.data
   } catch (error) {
    console.log(error);
   }
}



onMounted(()=>{
    getUser()
})
</script>
