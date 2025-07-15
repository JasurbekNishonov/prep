<template>
  <div class="pt-4 px-6 flex flex-col gap-2">
    <p>Current balance: <span class="text-xl font-semibold">{{ user.balance }}$</span></p>
      <div class="flex gap-2 items-center">
        <span>Select Transaction Method:</span>
        <el-select v-model="method" placeholder="Select" size="large" style="width: 240px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="flex gap-2 items-center">
        <span>Select Transaction Amount:</span>
        <el-input
          v-model="amount"
          style="width: 240px"
          placeholder="Please input"
          :formatter="(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
        />
      </div>
      {{ errorMessage }}
      <el-button @click="getTransaction" class="w-[150px]" type="primary">Submit</el-button>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const user = ref([])
const amount = ref('')

const errorMessage = ref('')
const method = ref('')


const options = [
  {
    label: 'Deposit',
    value: 'DEPOSIT',
  },
  {
    label: 'Withdraw',
    value: 'WITHDRAW',
  },
]

const getBalance = async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.get('http://localhost:3000/user', {
      headers: { Authorization: `Bearer ${token}` },
    })
    user.value = res.data
  } catch (error) {
    console.log(error)
  }
}

const getTransaction = async () => {
  try {
      const token = localStorage.getItem('token')
    if (method.value) {
      await axios.post('http://localhost:3000/createTransaction',
        {amount: amount.value, type: method.value},
        {headers: { Authorization: `Bearer ${token}`},
      })
      amount.value = 0
      method.value=''
     getBalance()
    }
  } catch (error) {
    errorMessage.value = error.response.data.message
  }
}
onMounted(() => {
  getBalance()
})
</script>
