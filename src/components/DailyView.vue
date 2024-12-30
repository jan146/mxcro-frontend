<template>
    <div class="w-80 h-80">
        <div class="size-full" v-if="addItemShown">
            <AddItem :addItemShown @add-item-toggle="addItemToggle" />
        </div>
        <div class="size-full" v-else>
            <DailyViewCalendar :addItemShown @add-item-toggle="addItemToggle" />
        </div>
    </div>
</template>

<script setup lang="ts">

    import { ref, type Ref } from 'vue';
    import AddItem from './AddItem.vue';
    import DailyViewCalendar from './DailyViewCalendar.vue';

    let addItemShown: Ref<boolean> = ref(false);

    function addItemToggle() {
        addItemShown.value = !addItemShown.value;
    }

</script>
