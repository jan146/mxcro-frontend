<template>
    <div class="w-80">
        <div class="size-full" v-if="addItemShown">
            <AddItem :date="date" @add-item-toggle="addItemToggle" @update-logged-items="updateLoggedItemsProxy" />
        </div>
        <div class="size-full" v-else>
            <DailyViewCalendar :date="date" :dateStr="dateStr" @change-date="changeDate" @add-item-toggle="addItemToggle" :loggedItems="props.loggedItems" :loggedItemsSelected="loggedItemsSelected" @update-logged-items="updateLoggedItemsProxy" @toggle-item="toggleItemProxy" @clear-item-selection="$emit('clearItemSelection')"/>
        </div>
    </div>
</template>

<script setup lang="ts">

    import { ref, type Ref } from 'vue';
    import AddItem from './AddItem.vue';
    import DailyViewCalendar from './DailyViewCalendar.vue';
    const today: Date = new Date();
    let date: Date = new Date();
    let dateStr: Ref<string> = ref(date.toLocaleString("en-GB", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) + " (today)");

    let addItemShown: Ref<boolean> = ref(false);
    const emit = defineEmits({
        updateLoggedItems: (fromDate: Date, toDate: Date) => {
            return (fromDate instanceof Date && toDate instanceof Date);
        },
        toggleItem: (loggedItem: object) => {
            return "id" in loggedItem;
        },
        clearItemSelection: () => true,
    });
    const props = defineProps({
        loggedItems: { type: Array<object>, required: true },
        loggedItemsSelected: { type: Array<object>, required: true },
    });

    function toggleItemProxy(loggedItem: object) {
        emit("toggleItem", loggedItem);
    }

    function addItemToggle() {
        addItemShown.value = !addItemShown.value;
    }

    function updateLoggedItemsProxy(fromDate: Date, toDate: Date) {
        emit("updateLoggedItems", fromDate, toDate);
    }

    function changeDate(change: number) {
        const target: Date = new Date(date.getTime() + change * (1000*60*60*24));
        date.setTime(target >= today ? today.getTime() : target.getTime());
        dateStr.value = date.toLocaleString("en-GB", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) + (target >= today ? " (today)" : "");
        if (target <= today) {
            updateLoggedItemsProxy(date, date);
            emit("clearItemSelection");
        }
    }

</script>

