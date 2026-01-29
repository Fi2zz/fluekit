<template>
  <Column :gap="20">
    <Table :columns="columns" :dataSource="data" />
    <Text>With Stripe and Border</Text>
    <Table :columns="columns" :dataSource="data" stripe border />
  </Column>
</template>

<script setup lang="ts">
import { Table, Column, Text } from "fluekit";

const columns = [
  { title: "Name", key: "name", width: 150 },
  { title: "Age", key: "age", width: 100, align: "center" },
  { title: "Address", key: "address" },
];

const data = [
  { name: "John Brown", age: 32, address: "New York No. 1 Lake Park" },
  { name: "Jim Green", age: 42, address: "London No. 1 Lake Park" },
  { name: "Joe Black", age: 32, address: "Sidney No. 1 Lake Park" },
];
</script>
