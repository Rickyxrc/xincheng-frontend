<template>
    <el-col :span="6" :offset="9">
        <el-card class="box-card blurin">
            <template #header>
                <div class="card-header">
                    <el-form :model="userinfo">
                        <!-- <span>登录到新成OJ</span> -->
                        <el-form-item label="登录到新成OJ">

                        </el-form-item>
                    <!-- <el-button class="button" text>Operation button</el-button> -->
                        <el-form-item label="用户">
                            <el-input v-model="userinfo.username" placeholder="用户名或邮箱" />
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input type="password" v-model="userinfo.password" placeholder="密码" show-password />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="getSession()">登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </template>

        </el-card>
    </el-col>
</template>

<style>
/* body {
    width:100vw;
    height:100vh;
    background:
	linear-gradient(
		limegreen,
		transparent
	),
	linear-gradient(
		90deg,
		skyblue,
		transparent
	),
	linear-gradient(
		-90deg,
		coral,
		transparent
	);
	
    background-blend-mode: screen;
    overflow: hidden;
} */
@keyframes blurin {
    0%{
        filter:blur(40px);
        transform: translateY(20px);
        opacity: 0;
    }
    100%{
        
    }
}
.blurin{
    animation: blurin 1s;
}
</style>

<script lang="ts">
import { ElNotification } from 'element-plus';
import { defineComponent } from 'vue'
import post from 'axios';

export default defineComponent({
    data: () => {
        return {
            userinfo: {
                username:"",
                password:""
            }
        }
    },
    methods: {
        getSession() {
            post('https://api.oj.rickyxrc.top/users/login', {
                params: {
                    username:this.userinfo['username'],
                    password:this.userinfo['password']
                }
            }).then((data: any) => {
                if (data['data']['stat'] != 0) {
                    ElNotification.error({
                        title: "登录失败",
                        message: "用户不存在或密码错误",
                    });
                }
                else {
                    ElNotification.success({
                        title: "登录成功",
                        message: "正在跳转，请稍等......",
                    });
                    this.$emit('transfer', data['data']['session']);
                }
            })
        }
    }
})
</script>