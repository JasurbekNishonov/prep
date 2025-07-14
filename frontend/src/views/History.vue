<template>
  <el-table :data="tableData">
    <el-table-column prop="id" label="Id"/>
    <el-table-column prop="amount" label="Amount"/>
    <el-table-column prop="type" label="Method"/>
    <!-- formatting the date with template -->
    <el-table-column label="Date">
      <template #default="{ row }">
        {{ formatDate(row.created_at) }}
      </template>
    </el-table-column>

  </el-table>
</template>

<script lang="ts" setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { formatDate } from '../utils/index';
const tableData = ref([])
const getHistory = async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.get('https://prep-backend-u66j.onrender.com/getTransactions', {
      headers: { Authorization: `Bearer ${token}` },
    })
    tableData.value=res.data
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  getHistory()
})
</script>
