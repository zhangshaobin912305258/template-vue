<template>
    <div id="header">
        <div id="header-left">
            <el-button :icon="sideBar?'el-icon-s-unfold':'el-icon-s-fold'" size="medium" @click="toggleSideBar"></el-button>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div id="header-right">
            我是右边导航栏
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {}
        },
        methods: {
            toggleSideBar() {
                this.$store.dispatch('header/toggleSideBar')
            }
        },
        computed: {
            ...mapGetters([
                'sideBar'
            ])
        }
    }
</script>
<style lang="scss" scoped>
    #header {
        height: 50px;
        overflow: hidden;
        position: relative;
        background-color: #fff;
        box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

        #header-left {
            float: left;
            height: 100%;
            line-height: 50px;

            .el-button {
                float: left;
                vertical-align: middle;
                height: 46px;
                cursor: pointer;
                border: none;
                font-size: 16px
            }

            .el-button:hover {
                background: rgba(0, 0, 0, .025);
            }

            .el-button:focus {
                background-color: #FFF;
            }

            .el-breadcrumb {
                line-height: 50px;
                margin-left: 8px;
                float: left;
            }
        }

        #header-right {
            float: right;
            height: 100%;
            line-height: 50px;
        }
    }
</style>