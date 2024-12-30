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
        </div>
        <div class="p-2 hover:bg-zinc-200 rounded-xl inline-block absolute top-0 left-0" @click="$emit('addItemToggle')">
            <svg-icon type="mdi" :path="mdiArrowLeft"></svg-icon>
        </div>
    </div>
</template>

<script setup lang="ts">

    import { ref, type Ref } from 'vue';
    import SvgIcon from '@jamescoyle/vue-icon';
    import { mdiArrowLeft } from '@mdi/js';

    const foodName: Ref<string> = ref("");
    const weight: Ref<string> = ref("");

    function submit() {
        // TODO
    }

</script>

