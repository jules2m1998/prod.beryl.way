<script setup lang="ts">
import { ref } from 'vue';

const test = ref<string>("Tester")
</script>

<template>
    <table class="table table-rounded table-flush">
        <thead>
            <tr class="fw-bold fs-7 text-danger border-bottom border-gray-200 py-4">
                <th>Name</th>
                <th>Position</th>
                <th>Office</th>
                <th>Age</th>
                <th>Start date</th>
                <th>Salary</th>
            </tr>
        </thead>
        <tbody>
            <tr class="py-5 fw-bold border-bottom border-gray-300 fs-5">
                <td>Tiger Nixon</td>
                <td>System Architect</td>
                <td>Edinburgh</td>
                <td>61</td>
                <td>2011/04/25</td>
                <td>$320,800</td>
            </tr>
            <tr class="py-5 fw-bolder border-bottom border-gray-400 fs-4">
                <td>Garrett Winters</td>
                <td>Accountant</td>
                <td>Tokyo</td>
                <td>63</td>
                <td>2011/07/25</td>
                <td>$170,750</td>
            </tr>
        </tbody>
    </table>
</template>