<template>
    <div class="w-80 h-80">
        <div class="size-full" v-if="addItemShown">
            <AddItem @add-item-toggle="addItemToggle" />
        </div>
        <div class="size-full" v-else>
            <DailyViewCalendar :dateStr="dateStr" @change-date="changeDate" @add-item-toggle="addItemToggle" :loggedItems="props.loggedItems" @update-logged-items="updateLoggedItemsProxy" />
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
        updateLoggedItems: (from_date: Date, to_date: Date) => {
            return (from_date instanceof Date && to_date instanceof Date);
        },
    });
    const props = defineProps({
        loggedItems: { type: Array<object>, required: true },
    });

    function addItemToggle() {
        addItemShown.value = !addItemShown.value;
    }

    function updateLoggedItemsProxy(from_date: Date, to_date: Date) {
        emit("updateLoggedItems", from_date, to_date);
    }

    function changeDate(change: number) {
        const target: Date = new Date(date.getTime() + change * (1000*60*60*24));
        date = (target >= today ? today : target);
        dateStr.value = date.toLocaleString("en-GB", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) + (target >= today ? " (today)" : "");
        if (target <= today) {
            updateLoggedItemsProxy(date, date);
        }
    }

</script>

