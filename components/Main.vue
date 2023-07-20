<template>
    <div class="main">
        <Filter :tags="tags" @filter-tasks="filterTasks"/>
        <div class="board-container">
            <Boards title="未対応" :tasks="filteredTask.length == 0 ? tasks : filteredTask" :position="1">
                <template v-slot:modal>
                    <Modal value="課題の追加..." :tags="tags" @create-tag="createTag" @create-task="createTask" :position="1" :tasks="tasks"/>
                </template>
            </Boards>
            <Boards title="処理中" :tasks="filteredTask.length == 0 ? tasks : filteredTask" :position="2">
                <template v-slot:modal>
                    <Modal value="課題の追加..." :tags="tags" @create-tag="createTag" @create-task="createTask" :position="2" :tasks="tasks"/>
                </template>
            </Boards>
            <Boards title="レビュー中" :tasks="filteredTask.length == 0 ? tasks : filteredTask"  :position="3">
                <template v-slot:modal>
                    <Modal value="課題の追加..." :tags="tags" @create-tag="createTag" @create-task="createTask" :position="3" :tasks="tasks"/>
                </template>
            </Boards>
            <Boards title="完了" :tasks="filteredTask.length == 0 ? tasks : filteredTask" :position="4">
                <template v-slot:modal>
                    <Modal value="課題の追加..." :tags="tags" @create-tag="createTag" @create-task="createTask" :position="4" :tasks="tasks"/>
                </template>
            </Boards>
        </div>
    </div>
</template>

<script>
    import { defineComponent } from 'vue';
    export default defineComponent({
        data() {
            const tags = ref([]);
            const tasks = ref([]);
            const filteredTask = ref([]);
            return{
                tags,
                tasks,
                filteredTask
            }
        },

        watch: {
            tags: {
                deep: true,
                handler(newTag) {
                    localStorage.setItem('tags', JSON.stringify(newTag))
                }
            },
            tasks: {
                deep: true,
                handler(newTask) {
                    localStorage.setItem('tasks', JSON.stringify(newTask))
                }
            },
            filteredTask: {
                deep: true,
                handler(newTask) {
                    localStorage.setItem('filteredTask', JSON.stringify(newTask))
                }
            }
        },

        methods: {
            filterTasks(filters) {
                // let filteredTask = []
                this.filteredTask = []
                // console.log(this.filteredTask)
                let trueCount = []
                for (let i = 0; i < this.tasks.length; i++) {
                    trueCount[i] = 0
                }
                filters.forEach((filter, index) => {
                    for(let i = 0; i < this.tasks.length; i++) {
                        for(let j = 0; j < this.tasks[i].tags.length; j++) {
                            if(filter.title == this.tasks[i].tags[j].title) {
                                trueCount[i]++
                            }
                        }
                    }
                })

                trueCount.forEach((value, index) => {
                    if(value == filters.length) {
                        this.filteredTask.push(this.tasks[index])
                    }
                })
                
                // console.log(filteredTask)
                // return filteredTask
                // if(filteredTask.length != 0) {
                //     this.filterTasks = filteredTask
                // }
                // console.log(this.filteredTask)

            },

            createTag(params) {
                this.tags.push({
                    title : params
                })
            },

            createTask(params) {
                // console.log(params)
                this.tasks.push({
                    title: params.title,
                    tags: params.tags,
                    position: params.position
                })
            }
        },

        mounted() {
            this.tasks = JSON.parse(localStorage.getItem('tasks')) || []
            this.tags = JSON.parse(localStorage.getItem('tags')) || []
            this.filteredTask = JSON.parse(localStorage.getItem('filteredTask')) || []
        }
    })
</script>

<style>
    .main > * {
        margin: 0 58px;
    }
    
    .board-container {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 40px;
        margin-top: 40px;
    }

    .board-container > .board {
        min-width: 250px;
        width: 100%;
        margin-bottom: 10px;
    }
</style>