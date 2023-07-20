<template>
    <span class="tagTitle">{{ title }}</span>
</template>

<script>
    import { defineComponent } from 'vue'
    export default defineComponent({
        props: {
            title : String
        }
    })
</script>

<style>
    .tagTitle {
        color: #FFFFFF;
        background: #A1AF2F;
        border-radius: 10px;
        width: 49px;
        height: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>