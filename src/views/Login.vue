<template>
    <div>
        <div class="font-bold text-lg text-white">Enter user_id:</div>
        <div class="flex gap-2">
            <input v-model="user_id" type="text" class="text-lg w-24 text-black" maxlength="6" @keyup="log_in"/>
            <button @click="log_in" type="button" class="bg-gray-500 text-base border-4 border-white rounded-md text-white p-1 font-semibold">Submit</button>
        </div>
        <div class="mt-8 font-bold text-lg text-white">Or make new user</div>
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
        <button @click="create_user" type="button" class="bg-gray-500 text-base border-4 border-white rounded-md text-white p-1 font-semibold">Create</button>
        <div v-html="errorMessage" class="text-red-600 font-semibold text-lg"></div>
        <div v-html="successMessage" class="text-green-600 font-semibold text-lg"></div>
    </div>
</template>

<script setup lang="ts">

    import { useRouter, type Router } from "vue-router";
    import { ref, type Ref } from 'vue';
    
    const urlBackend: string = "http://localhost:5000/"
    const router: Router = useRouter();
    const errorMessage: Ref<string> = ref("");
    const successMessage: Ref<string> = ref("");
    const user_id: Ref<string> = ref("123");
    const username: Ref<string> = ref("");
    const age: Ref<string> = ref("");
    const height: Ref<string> = ref("");
    const weight: Ref<string> = ref("");

    function check_user(): string {
        let error = "";
        let weight_num: number = parseInt(weight.value);
        let height_num: number = parseInt(height.value);
        let age_num: number = parseInt(age.value);
        if (isNaN(weight_num))
            error = "weight must be a number";
        if (weight_num < 1 || weight_num > 500)
            error = "weight must be between 1 and 500";
        if (isNaN(height_num))
            error = "height must be a number";
        if (height_num < 50 || height_num > 300)
            error = "height must be between 50 and 300";
        if (isNaN(age_num))
            error = "age must be a number";
        if (age_num < 15 || age_num > 100)
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

    function create_user() {

        errorMessage.value = check_user()
        successMessage.value = "";
        if (!errorMessage.value) {
            fetch(`${urlBackend}/user_info/123`, {
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
            .catch(err => errorMessage.value = err)
        }

    }
    
    function log_in(event: KeyboardEvent | MouseEvent) {
        if (event instanceof MouseEvent) {
            router.push({ name: "overview", params: { user_id: user_id.value } });
        }
        else if (event instanceof KeyboardEvent && event.key === "Enter") {
            router.push({ name: "overview", params: { user_id: user_id.value } });
        }
    }

</script>

