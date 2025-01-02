<template>
    <div>
        <div>
            <EnterUserId />
        </div>
        <div>
            <EnterUserName />
        </div>
        <div>
            <MakeNewUser />
        </div>
    </div>
</template>

<script setup lang="ts">
    import EnterUserId from "@/components/EnterUserId.vue";
    import EnterUserName from "@/components/EnterUserName.vue";
    import MakeNewUser from '@/components/MakeNewUser.vue';
</script>

