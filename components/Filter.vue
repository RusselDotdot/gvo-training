<template>
    <div class="filter">
        <label for="">タグ</label><br/>
        <div class="filter-bar" @click="toggleShow"></div>
        <div v-show="filterShow" class="filter-container">
            <div class="filter-content">
                <input type="text" class="filter-search" placeholder="タグを検索..." v-model="searchVal">
                <button class="unselect-all" @click="unselectAll">未選択</button>
                <div class="filter-list">
                    <div v-for="tag in filteredTags" class="tag-item">
                        <input type="checkbox" :id="tag.title" class="filter-choices" :value="tag.title"><label :for="tag.title" @click="selected">{{ tag.title }}</label>
                    </div>
                </div>
            </div>
            <div class="filter-btn" @click="filterTasks">絞り込む</div>
        </div>
    </div>
</template>

<script>
    import { defineComponent } from 'vue';
    export default defineComponent({
        props: {
            tags: Object
        },

        data() {
            const filterShow = ref<Boolean>(false)
            const searchVal = ref('');
            const selectedFilter = ref([])
            return {
                filterShow,
                searchVal,
                selectedFilter
            }
        },

        methods: {
            toggleShow() {
                this.filterShow = !this.filterShow
                this.selectedFilter.forEach(item => {
                    document.querySelectorAll('.filter-choices').forEach(element => {
                        if(element.value == item.title) {
                            element.checked = true
                        }
                    })
                })
            },
            unselectAll() {
                document.querySelectorAll('.filter-choices').forEach(item => {item.checked = false})
                this.selectedFilter = []
            },
            filterTasks() {
                this.$emit('filter-tasks', this.selectedFilter)
                this.toggleShow()
            },
            selected(event) {
                const checkbox = event.target.previousElementSibling

                if(checkbox.checked) {
                    this.selectedFilter = this.selectedFilter.filter(tag => {
                        return tag.title != event.target.textContent
                    })
                    return
                }
                checkbox.checked
                this.selectedFilter.push({
                    title : event.target.textContent
                })
            }
        },

        computed: {
            filteredTags() {
                const filteredTags = this.tags.filter((tag) => {
                    return tag.title.includes(this.searchVal)
                })
                return filteredTags
            }
        },

        watch: {
            selectedFilter: {
                deep: true,
                handler(selectedFilter) {
                    localStorage.setItem('selectedFilter', JSON.stringify(selectedFilter))
                }
            },
        },

        mounted() {
            this.filteredTags
            this.selectedFilter = JSON.parse(localStorage.getItem('selectedFilter')) || []
        },

        emits: ['filter-tasks'],
    })

</script>

<style>
    .filter label {
        font-size: 14px;
    }

    .filter-bar {
        width: 150px;
        height: 30px;
        border-radius: 3px;
        display: flex;
        align-items: center;
        background: url(../assets/images/arr-down.png) center right 5% no-repeat, #FFFFFF;
        padding: 6px;
        cursor: pointer;
        border: 1px solid #BCBCBC;
    }

    .filter-container {
        width: 150px;
        height: 207px;
        position: absolute;
        background: #FFFFFF;
        border-radius: 3px;
        border: 1px solid #BCBCBC;
        transform: translateY(-5px);
        padding-top: 5px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .filter-container > * {
        padding-left: 5px;
        padding-right: 5px;
    }

    .filter-container *:not(.filter-search) {
        cursor: pointer;
    }

    .filter-search {
        font-size: 14px;
        width: 140px;
        height: 30px;
        display: flex;
        align-items: center;
    }

    .filter-container::placeholder {
        color: #A5A4A4;
    }

    .unselect-all {
        margin: 12px 0 5px 6px;
        border: none;
        background: none;
    }

    .filter-content {
        height: 179px;
    }

    .filter-list {
        display: flex;
        flex-direction: column;
        gap: 6px;
        overflow-y: scroll;
        margin-bottom: 6px;
        height: 90px;
    }

    .filter-list > .tag-item {
        padding: 2px 0;
    }

    .filter-list > .tag-item > label {
        padding: 0 6px;
    }

    .filter-btn {
        height: 28px;
        width: 100%;
        background: #000000;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
    }

</style>