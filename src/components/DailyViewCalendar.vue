<template>
    <div class="grid grid-cols-12 gap-0 custom-border rounded-md size-full">
        <div @click="changeDateLocal(-1)" class="col-span-2 custom-border flex justify-center items-center arrow-hover">
            <svg-icon type="mdi" :path="mdiArrowLeft"></svg-icon>
        </div>
        <div class="col-span-8 custom-border flex justify-center items-center text-white font-semibold">{{props.dateStr}}</div>
        <div @click="changeDateLocal(1)" class="col-span-2 custom-border flex justify-center items-center arrow-hover">
            <svg-icon type="mdi" :path="mdiArrowRight"></svg-icon>
        </div>
        <div class="col-span-10 row-span-3 grid">
            <div class="col-span-2 custom-border flex justify-center items-center arrow-hover h-12" @click="() => scrollItems(-1)">
                <svg-icon type="mdi" :path="mdiArrowUp"></svg-icon>
            </div>
            <button v-for="index in Array.from({ length: loggedItemsLength }, (_, i) => i)" :class="['col-span-2', 'flex', 'items-center', 'justify-between', 'custom-border', 'px-4', 'text-white', 'h-12', 'group', getItemBgColor(index)]" @click="toggleItemProxy(index)">
                <div class="size-10"></div>
                <div class="group-hover:font-bold">
                    {{ getLoggedItemStr(index) }}
                </div>
                <button v-if="loggedItemsOffset+index < loggedItems.length" @click="deleteItem(index)" type="button" class="flex items-center justify-center size-10 hover:bg-red-950 rounded-lg transition-colors duration-200 group">
                    <svg-icon class="group-last:group-hover:text-red-600 text-white" type="mdi" :path="mdiTrashCan"></svg-icon>
                </button>
                <div v-else class="size-10"></div>
            </button>
            <div class="col-span-2 custom-border flex justify-center items-center arrow-hover h-12" @click="() => scrollItems(1)">
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
    import { BACKEND_URL } from '@/utils/constants';

    const loggedItemsLength: number = 5;
    const props = defineProps({
        loggedItems: { type: Array<object>, required: true },
        loggedItemsSelected: { type: Array<object>, required: true },
        date: { type: Date, required: true },
        dateStr: { type: String, required: true },
    });
    let loggedItemsOffset: Ref<number> = ref(0);
    const emit = defineEmits({
        updateLoggedItems: (fromDate: Date, toDate: Date) => {
            return (fromDate instanceof Date && toDate instanceof Date);
        },
        addItemToggle: () => {return true},
        changeDate: (change: number) => {
            return (typeof change === "number");
        },
        toggleItem: (loggedItem: object) => {
            return "id" in loggedItem;
        },
    });

    function getItemBgColor(index: number) {
        const loggedItem: object = props.loggedItems[loggedItemsOffset.value+index];
        if (props.loggedItemsSelected.includes(loggedItem))
            return "bg-zinc-600 hover:bg-zinc-500";
        return "bg-zinc-900 hover:bg-zinc-700";
    }

    function toggleItemProxy(index: number) {
        const loggedItem: object = props.loggedItems[loggedItemsOffset.value+index];
        if (loggedItem)
            emit("toggleItem", loggedItem);
    }

    function scrollItems(change: number) {
        loggedItemsOffset.value += change;
        loggedItemsOffset.value = Math.min(props.loggedItems.length - loggedItemsLength, loggedItemsOffset.value);
        loggedItemsOffset.value = Math.max(0, loggedItemsOffset.value);
    }

    function getLoggedItemStr(offset: number): ComputedRef<string> {
        const getLoggedItemStrParametrized = computed<string>(() => {
            const logged_item: object = props.loggedItems[loggedItemsOffset.value+offset];
            if (logged_item)
                return `${Math.round(logged_item.weight_g)}g × ${toTitleCase(logged_item.name)}`;
            else
                return "/";
        });
        return getLoggedItemStrParametrized;
    }

    function changeDateLocal(change: number) {
        loggedItemsOffset.value = 0;
        emit("changeDate", change);
    }

    function deleteItem(index: number) {
        const loggedItem: object = props.loggedItems[loggedItemsOffset.value+index];
        console.log(loggedItem);
        console.log(loggedItem.id);
        fetch(`${BACKEND_URL}/api/v1/logged_item/${loggedItem.id}`, {
            method: "DELETE",
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.error)
                console.error(data.error);
            emit("updateLoggedItems", props.date, props.date);
        })
        .catch(err => console.error(err));
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

