<template>
    <div class="mt-8 font-bold text-lg text-white">Make new user</div>
    <div class="flex flex-col gap-2">
        <div class="flex gap-2">
            <div class="text-lg text-white">Username:</div>
            <input v-model="username" type="text" class="text-lg w-24 text-black"/>
        </div>
        <div class="flex gap-2">
            <div class="text-lg text-white">Age:</div>
            <input v-model="age" type="text" class="text-lg w-24 text-black"/>
        </div>
        <div class="flex gap-2">
            <div class="text-lg text-white">Height:</div>
            <input v-model="height" type="text" class="text-lg w-24 text-black"/>
        </div>
        <div class="flex gap-2">
            <div class="text-lg text-white">Weight:</div>
            <input v-model="weight" type="text" class="text-lg w-24 text-black"/>
        </div>
    </div>
    <button @click="createUser" type="button" class="bg-gray-500 text-base border-4 border-white rounded-md text-white p-1 font-semibold">Create</button>
    <div v-html="errorMessage" class="text-red-600 font-semibold text-lg"></div>
    <div v-html="successMessage" class="text-green-600 font-semibold text-lg"></div>
</template>

<script setup lang="ts">

    import { ref, type Ref } from 'vue';
    import { BACKEND_URL } from "@/utils/constants";
    
    const errorMessage: Ref<string> = ref("");
    const successMessage: Ref<string> = ref("");
    const username: Ref<string> = ref("");
    const age: Ref<string> = ref("");
    const height: Ref<string> = ref("");
    const weight: Ref<string> = ref("");

    function checkUser(): string {
        let error = "";
        let weightNum: number = parseInt(weight.value);
        let heightNum: number = parseInt(height.value);
        let ageNum: number = parseInt(age.value);
        if (isNaN(weightNum))
            error = "weight must be a number";
        if (weightNum < 1 || weightNum > 500)
            error = "weight must be between 1 and 500";
        if (isNaN(heightNum))
            error = "height must be a number";
        if (heightNum < 50 || heightNum > 300)
            error = "height must be between 50 and 300";
        if (isNaN(ageNum))
            error = "age must be a number";
        if (ageNum < 15 || ageNum > 100)
            error = "age must be between 15 and 100";
            
        if (!weight.value)
            error = "weight is missing";
        if (!height.value)
            error = "height is missing";
        if (!age.value)
            error = "age is missing";
        if (!username.value)
            error = "username is missing";

        if (error)
            error = `Error: ${error}`;
        return error;
    }

    function createUser() {

        errorMessage.value = checkUser()
        successMessage.value = "";
        if (!errorMessage.value) {
            fetch(`${BACKEND_URL}/user_info/`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    "username": username.value,
                    "age": age.value,
                    "height": height.value,
                    "weight": weight.value,
                }),
            })
            .then(response => response.json())
            .then(data => successMessage.value = JSON.stringify(data))
            .catch(err => errorMessage.value = err);
        }

    }

</script>

