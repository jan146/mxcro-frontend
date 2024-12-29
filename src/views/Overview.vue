<template>
    <div class="w-full flex gap-4">
        <div>
            <UserInfo />
        </div>
        <div>
            <DailyView />
        </div>
    </div>
</template>

<script setup lang="ts">
    import DailyView from "@/components/DailyView.vue";
    import UserInfo from "@/components/UserInfo.vue";
</script>

