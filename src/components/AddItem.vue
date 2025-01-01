<template>
    <div class="border-4 border-white rounded-md bg-white text-black size-full relative">
        <div class="flex flex-col items-center justify-center size-full">
            <div class="p-1">
                Enter food name:
                <input v-model="foodName" type="text" class="text-lg w-24 text-black bg-zinc-100 border-b-2 border-zinc-900"/>
            </div>
            <div class="p-1">
                Enter quantity (in grams):
                <input v-model="weight" type="text" class="text-lg w-24 text-black bg-zinc-100 border-b-2 border-zinc-900"/>
            </div>
            <div class="p-1">
                <button @click="submit" type="button" class="bg-zinc-500 text-base rounded-xl text-white p-2 font-semibold border-2 border-transparent hover:bg-zinc-100 hover:text-zinc-900 hover:border-zinc-900 transition-colors duration-200">Create</button>
            </div>
            <div v-html="errorMessage" class="text-red-600 font-semibold text-sm px-2 max-w-full break-words"></div>
            <div v-html="successMessage" class="text-green-600 font-semibold text-sm px-2 max-w-full break-words"></div>
        </div>
        <div class="p-2 hover:bg-zinc-200 rounded-xl inline-block absolute top-0 left-0" @click="$emit('addItemToggle')">
            <svg-icon type="mdi" :path="mdiArrowLeft"></svg-icon>
        </div>
    </div>
</template>

<script setup lang="ts">

    import { useRoute, type RouteLocationNormalizedLoaded as Route } from "vue-router";
    import { ref, type Ref } from 'vue';
    import SvgIcon from '@jamescoyle/vue-icon';
    import { mdiArrowLeft } from '@mdi/js';
    import { BACKEND_URL } from '@/utils/constants';

    const route: Route = useRoute();
    const foodName: Ref<string> = ref("");
    const weight: Ref<string> = ref("");
    const errorMessage: Ref<string> = ref("");
    const successMessage: Ref<string> = ref("");

    const props = defineProps({
        date: { type: Date, required: true },
    });
    const emit = defineEmits({
        updateLoggedItems: (fromDate: Date, toDate: Date) => {
            return (fromDate instanceof Date && toDate instanceof Date);
        },
        addItemToggle: () => {return true},
    });

    function checkFood(): string {
        let error: string = "";
        const weightNum: number = parseInt(weight.value);
        if ((weightNum < 1) || (weightNum > 10000))
            error = "weight must be a number between 1 and 10,000"
        if (isNaN(weightNum))
            error = "weight must be a number";
        if (!weight.value)
            error = "weight can't be empty";
        if (!foodName.value)
            error = "food name can't be empty";
        if (error)
            error = `Error: ${error}`;
        return error;
    }

    function submit() {
        errorMessage.value = checkFood();
        if (errorMessage.value)
            successMessage.value = "";
        else {
            fetch(`${BACKEND_URL}/logged_item/${route.params.user_id}` + "?" + new URLSearchParams({
                date: props.date.toLocaleDateString(),
            }).toString(), {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    "food_name": foodName.value,
                    "weight": weight.value,
                }),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.error) {
                    successMessage.value = "";
                    errorMessage.value = data.error;
                }
                else {
                    successMessage.value = JSON.stringify(data);
                    emit("updateLoggedItems", props.date, props.date);
                    // successMessage.value = `Successfully submitted new entry:\n${weight.value} grams of ${foodName.value}`;
                }
                foodName.value = "";
                weight.value = "";
            })
            .catch(err => errorMessage.value = err)
        }
        emit("updateLoggedItems", props.date, props.date);
    }

</script>

