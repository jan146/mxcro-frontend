<template>
    <div class="grid grid-cols-12 gap-0 custom-border rounded-md">
        <div @click="() => changeDate(-1)" class="col-span-2 custom-border flex justify-center arrow-hover">
            <svg-icon type="mdi" :path="mdiArrowLeft"></svg-icon>
        </div>
        <div class="col-span-8 custom-border flex justify-center text-white font-semibold">{{date_str}}</div>
        <div @click="() => changeDate(1)" class="col-span-2 custom-border flex justify-center arrow-hover">
            <svg-icon type="mdi" :path="mdiArrowRight"></svg-icon>
        </div>
        <div class="col-span-11 row-span-3">
            <div class="col-span-2 custom-border flex justify-center arrow-hover">
                <svg-icon type="mdi" :path="mdiArrowUp"></svg-icon>
            </div>
            <div class="col-span-2 custom-border">Entry</div>
            <div class="col-span-2 custom-border">Entry</div>
            <div class="col-span-2 custom-border">Entry</div>
            <div class="col-span-2 custom-border flex justify-center arrow-hover">
                <svg-icon type="mdi" :path="mdiArrowDown"></svg-icon>
            </div>
        </div>
        <div class="col-span-1 row-span-3 bg-green-400 custom-border flex items-center justify-center group hover:bg-white transition-colors duration-200" @click="addItem">
            <svg-icon class="text-white group-hover:text-green-300 transition-colors duration-200" type="mdi" :path="mdiPlusCircle"></svg-icon>
        </div>
        <!-- <div class="col-span-3 bg-red-200 custom-border">Footer</div> -->
    </div>
    <AddItem />
</template>

<script setup lang="ts">

    import { ref, type Ref } from 'vue';
    import SvgIcon from '@jamescoyle/vue-icon';
    import { mdiArrowUp, mdiArrowDown, mdiArrowLeft, mdiArrowRight, mdiPlusCircle } from '@mdi/js';
    import AddItem from './AddItem.vue';

    const today: Date = new Date();
    let date: Date = new Date();
    let date_str: Ref<string> = ref(date.toLocaleString("en-GB", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) + " (today)");

    function changeDate(change: number) {
        const target: Date = new Date(date.getTime() + change * (1000*60*60*24));
        date = (target >= today ? today : target);
        date_str.value = date.toLocaleString("en-GB", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) + (target >= today ? " (today)" : "");
    }

    function addItem() {

    }

</script>

<style scoped>
.custom-border {
    @apply border border-2 border-gray-100;
}
.arrow-hover {
    @apply text-white hover:text-zinc-900 bg-zinc-900 hover:bg-white transition-colors duration-200;
}
</style>
