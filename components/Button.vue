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