<script setup>
    defineProps({
        value: String,
        variant: String
    })
    
    const openModal = () => console.log("click")
</script>

<template>
    <button
    :class="variant"
    @click.prevent="openModal"
    >
        {{ value }}
    </button>
</template>

<style>
    .btn-modal {
        border: none;
        color: #02836B;
        font-size: 12px;
        background: none;
        cursor: pointer;
        display: flex;
        align-items: center;
    }

    .btn-modal::before {
        content: url(../assets/images/add-sign.png);
        margin-right: 4px;

    }
</style>