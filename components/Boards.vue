<script setup>
    defineProps({
        title: String
    })
</script>

<template>
    <div class="board">
        <h3 class="title">{{ title }}</h3>
        <div class="card-group">
            <slot></slot>
        </div>
    </div>
</template>