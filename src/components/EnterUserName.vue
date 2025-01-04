<template>
    <div class="font-bold text-lg text-white">Enter username:</div>
    <div class="flex gap-2">
        <input v-model="username" type="text" class="text-lg text-black w-64" @keyup="logOut"/>
        <button @click="logOut" type="button" class="bg-gray-500 text-base border-4 border-white rounded-md text-white p-1 font-semibold">Submit</button>
    </div>
</template>

<script setup lang="ts">

    import { useRouter, type Router } from "vue-router";
    import { ref, type Ref } from 'vue';
    import { BACKEND_URL } from "@/utils/constants";
    
    const router: Router = useRouter();
    const username: Ref<string> = ref("janez");
    
    function switchUrl() {
        fetch(`${BACKEND_URL}/api/v1/user_info/username/${username.value}`)
        .then(response => response.json())
        .then(data => {
            if (data.error)
                console.error(data.error);
            else
                router.push({ name: "overview", params: { user_id: data.id } });
        })
        .catch(err => console.error(err));
    }

    function logOut(event: KeyboardEvent | MouseEvent) {
        if (event instanceof MouseEvent) {
            switchUrl();
        }
        else if (event instanceof KeyboardEvent && event.key === "Enter") {
            switchUrl();
        }
    }

</script>

