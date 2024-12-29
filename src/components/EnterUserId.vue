<template>
    <div class="font-bold text-lg text-white">Enter user_id:</div>
    <div class="flex gap-2">
        <input v-model="userId" type="text" class="text-lg text-black w-64" @keyup="logIn"/>
        <button @click="logIn" type="button" class="bg-gray-500 text-base border-4 border-white rounded-md text-white p-1 font-semibold">Submit</button>
    </div>
</template>

<script setup lang="ts">

    import { useRouter, type Router } from "vue-router";
    import { ref, type Ref } from 'vue';
    
    const router: Router = useRouter();
    const userId: Ref<string> = ref("123");
    
    function logIn(event: KeyboardEvent | MouseEvent) {
        if (event instanceof MouseEvent) {
            router.push({ name: "overview", params: { user_id: userId.value } });
        }
        else if (event instanceof KeyboardEvent && event.key === "Enter") {
            router.push({ name: "overview", params: { user_id: userId.value } });
        }
    }

</script>

