<template>
    <div class="grid grid-cols-12 gap-0 custom-border">
        <div class="col-span-1 custom-border flex justify-center">
            <svg-icon type="mdi" :path="mdiArrowLeft"></svg-icon>
        </div>
        <div class="col-span-10 custom-border flex justify-center">{{date}}</div>
        <div class="col-span-1 custom-border flex justify-center">
            <svg-icon type="mdi" :path="mdiArrowRight"></svg-icon>
        </div>
        <div class="col-span-11 row-span-3">
            <div class="col-span-2 custom-border flex justify-center">
                <svg-icon type="mdi" :path="mdiArrowUp"></svg-icon>
            </div>
            <div class="col-span-2 custom-border">Entry</div>
            <div class="col-span-2 custom-border">Entry</div>
            <div class="col-span-2 custom-border">Entry</div>
            <div class="col-span-2 custom-border flex justify-center">
                <svg-icon type="mdi" :path="mdiArrowDown"></svg-icon>
            </div>
        </div>
        <div class="col-span-1 row-span-3 bg-green-400 custom-border flex items-center justify-center">
            <svg-icon type="mdi" :path="mdiPlusCircle"></svg-icon>
        </div>
        <!-- <div class="col-span-3 bg-red-200 custom-border">Footer</div> -->
    </div>
</template>

<script setup lang="ts">

    import SvgIcon from '@jamescoyle/vue-icon'
    import { mdiArrowUp, mdiArrowDown, mdiArrowLeft, mdiArrowRight, mdiPlusCircle } from '@mdi/js'

    const date: string = new Date().toLocaleString("en-GB", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });

</script>

<style scoped>
.custom-border {
    @apply border border-2 border-gray-100;
}
</style>
