<template>
  <div>
    <table class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer Name</th>
          <th>Company</th>
          <th>Phone Number</th>
          <th>Email</th>
          <th>Country</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.company }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.country }}</td>
          <td>
            <span v-if="!item.status">Active</span>
            <span v-else>Inactive</span>
          </td>
          <td>
            <button @click="editItem(item)">Edit</button>
            <button @click="removeItem(item.id)">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface DataItem {
  id: number
  name: string
  company: string
  phone: string
  email: string
  country: string
  status: boolean
}

const data = ref<DataItem[]>([
  {
    id: 1,
    name: 'Item 1',
    company: 'Microsoft',
    phone: '(225) 555-0118',
    email: 'jane@microsoft.com',
    country: 'United States',
    status: true
  },
  {
    id: 2,
    name: 'Jane Cooper',
    company: 'Yahoo',
    phone: '(225) 555-0118',
    email: 'jane@microsoft.com',
    country: 'United States',
    status: false
  },
  {
    id: 3,
    name: 'Floyd Miles',
    company: 'Adobe',
    phone: '(225) 555-0118',
    email: 'jane@microsoft.com',
    country: 'United States',
    status: true
  }
])

const editItem = (item: DataItem) => {
  // Implement your edit logic here
  console.log(`Editing item ${item.id}`)
}

const removeItem = (itemId: number) => {
  // Implement your remove logic here
  data.value = data.value.filter((item) => item.id !== itemId)
}
</script>

<style scoped>
.data-table {
  background-color: white;
  border-collapse: separate;
  border-spacing: 0 1px;
  width: 100%;
  padding: 0 20px 20px;
}

.data-table th {
  color: #b5b7c0;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 15px;
  border-bottom: 1px solid #eeeeee;
  text-align: left;
}

.data-table tr {
  color: #292d32;
  font-size: 14px;
  font-weight: 500;
}

.data-table td {
  padding: 10px 15px;
  border-bottom: 1px solid #eeeeee;
}
</style>
