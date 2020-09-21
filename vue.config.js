module.exports = {
    //lintOnSave: false,
    devServer: {
        port: 8888,
        open: true,
        overlay: {
            warning: false,
            errors: false
        },
        proxy: {
            '/api': {
                target: 'http://localhost:8080', //API服务器的地址
                changeOrigin: true, // 是否跨域，虚拟的站点需要更管origin
                pathRewrite: {
                    // '^/api5'是一个正则表达式，表示要匹配请求的url中，全部'http://localhost:8081/api5' 转接为 http://localhost:8081/api/
                    '^/api5': '/api',
                    //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    '^/api': '',
                }
            }
        }
    }
}