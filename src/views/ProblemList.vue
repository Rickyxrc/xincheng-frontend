<template>
    <el-input v-model="searchBoxContent" placeholder="键入以搜索题目......" />
    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="pid" label="PID" />
        <el-table-column prop="score" label="分数">
            <template #default="scope">
                <span class="ml-2 " v-if="scope.row.score <= 20" style="color:var(--el-color-danger-light-3)">{{
                        scope.row.score
                }}</span>
                <span class="ml-2" v-else-if="scope.row.score < 100" style="color:var(--el-color-warning-light-3)">{{
                        scope.row.score
                }}</span>
                <span class="ml-2" v-else-if="scope.row.score == 100" style="color:var(--el-color-success-light-3)">{{
                        scope.row.score
                }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="title" label="标题">
            <template #default="scope">
                {{ scope.row.title }}&nbsp;
                <el-tag class="ml-2" type="danger" v-if="scope.row.difficulty == 1">渣渣题</el-tag>
                <el-tag class="ml-2" type="warning" v-else-if="scope.row.difficulty == 2">简单题</el-tag>
                <el-tag class="ml-2" type="success" v-else-if="scope.row.difficulty == 3">中等题</el-tag>
                <el-tag class="ml-2" v-else-if="scope.row.difficulty == 4">口算题</el-tag>
                <template v-for="i in scope.row.tags" :key="i in scope.row.tags">&nbsp;<el-tag>{{ i }}</el-tag>
                </template>
            </template>
        </el-table-column>
    </el-table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ElNotification } from "element-plus";
import post from "axios";

export default defineComponent({
    data() {
        return {
            searchBoxContent: "",
            tableData: this.getData()
        }
    },
    methods: {
        getData() {
            // var url = ""
            // if (this.searchBoxContent != undefined)
            //     url += '?data=' + 
            post('https://api.oj.rickyxrc.top/problems/list', {
                params: {
                    data:this.searchBoxContent
                }
            })
                .then((data: any) => {
                    this.tableData = data["data"];
                    console.log(data["data"]);

                });
        }
    },
    watch: {
        searchBoxContent() {
            this.getData();
        }
    }
});
</script>

<script lang="ts" setup>
</script>

