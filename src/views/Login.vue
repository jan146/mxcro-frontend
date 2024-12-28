<template>
    <div class="input">
        <div class="font-bold text-lg text-white">Enter user_id:</div>
        <div class="flex gap-2">
            <input v-model="text_field" type="text" class="text-lg w-24 text-black" maxlength="6" @keyup="log_in"/>
            <button @click="log_in" type="button" class="bg-gray-500 text-base border-4 border-white rounded-md text-white p-1 font-semibold">Submit</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter, type Router } from "vue-router";
import { ref, type Ref } from 'vue';
const router: Router = useRouter();
const text_field: Ref<string> = ref("12345");
function log_in(event: KeyboardEvent | MouseEvent) {
    if (event instanceof MouseEvent) {
        router.push({ name: "overview", params: { user_id: text_field.value } });
    }
    else if (event instanceof KeyboardEvent && event.key === "Enter") {
        router.push({ name: "overview", params: { user_id: text_field.value } });
    }
}
</script>

