<template>
    <div class="grid grid-cols-12 gap-0 custom-border rounded-md size-full">
        <div @click="() => changeDate(-1)" class="col-span-2 custom-border flex justify-center items-center arrow-hover">
            <svg-icon type="mdi" :path="mdiArrowLeft"></svg-icon>
        </div>
        <div class="col-span-8 custom-border flex justify-center items-center text-white font-semibold">{{dateStr}}</div>
        <div @click="() => changeDate(1)" class="col-span-2 custom-border flex justify-center items-center arrow-hover">
            <svg-icon type="mdi" :path="mdiArrowRight"></svg-icon>
        </div>
        <div class="col-span-10 row-span-3 grid grid-rows-5">
            <div class="col-span-2 custom-border flex justify-center items-center arrow-hover" @click="() => scrollItems(-1)">
                <svg-icon type="mdi" :path="mdiArrowUp"></svg-icon>
            </div>
            <div v-for="index in Array.from({ length: 3 }, (_, i) => i)" class="col-span-2 flex items-center justify-between custom-border px-4 text-white">
                <div class="size-10"></div>
                <div>
                    {{ getLoggedItemStr(index) }}
                </div>
                <button @click="" type="button" class="flex items-center justify-center size-10 hover:bg-red-950 rounded-lg transition-colors duration-200 group">
                    <svg-icon class="group-hover:text-red-600 text-white" type="mdi" :path="mdiTrashCan"></svg-icon>
                </button>
            </div>
            <div class="col-span-2 custom-border flex justify-center items-center arrow-hover" @click="() => scrollItems(1)">
                <svg-icon type="mdi" :path="mdiArrowDown"></svg-icon>
            </div>
        </div>
        <div class="col-span-2 row-span-3 bg-green-400 custom-border flex items-center justify-center group hover:bg-white transition-colors duration-200" @click="$emit('addItemToggle')">
            <svg-icon class="text-white group-hover:text-green-300 transition-colors duration-200" type="mdi" :path="mdiPlusCircle"></svg-icon>
        </div>
        <!-- <div class="col-span-3 bg-red-200 custom-border">Footer</div> -->
    </div>
</template>

<script setup lang="ts">

    import { ref, type Ref, computed, type ComputedRef } from 'vue';
    import SvgIcon from '@jamescoyle/vue-icon';
    import { mdiArrowUp, mdiArrowDown, mdiArrowLeft, mdiArrowRight, mdiPlusCircle, mdiTrashCan } from '@mdi/js';
    import { toTitleCase } from '@/utils/common';

    const today: Date = new Date();
    let date: Date = new Date();
    let dateStr: Ref<string> = ref(date.toLocaleString("en-GB", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) + " (today)");
    const props = defineProps({
        loggedItems: { type: Array<object>, required: true },
    });
    let loggedItemsOffset: Ref<number> = ref(0);
    const emit = defineEmits({
        updateLoggedItems: (from_date: Date, to_date: Date) => {
            return (from_date instanceof Date && to_date instanceof Date);
        },
        addItemToggle: () => {return true},
    });

    function changeDate(change: number) {
        const target: Date = new Date(date.getTime() + change * (1000*60*60*24));
        date = (target >= today ? today : target);
        dateStr.value = date.toLocaleString("en-GB", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) + (target >= today ? " (today)" : "");
        if (target <= today) {
            loggedItemsOffset.value = 0;
            emit("updateLoggedItems", date, date);
        }
    }

    function scrollItems(change: number) {
        loggedItemsOffset.value += change;
        loggedItemsOffset.value = Math.max(0, loggedItemsOffset.value);
        loggedItemsOffset.value = Math.min(props.loggedItems.length - 3, loggedItemsOffset.value);
    }

    function getLoggedItemStr(offset: number): ComputedRef<string> {
        const getLoggedItemStrParametrized = computed<string>(() => {
            const logged_item: object = props.loggedItems[loggedItemsOffset.value+offset];
            if (logged_item)
                return `${logged_item.weight_g}g × ${toTitleCase(logged_item.name)}`;
            else
                return "/";
        });
        return getLoggedItemStrParametrized;
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
