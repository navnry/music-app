module.exports = {
    devServer: {
        proxy: {// 输入/api 让其去访问http://localhost:3000/api
            '/api': {
                target: 'http://127.0.0.1:3000', // 设置调用的接口域名和端口号 ( 设置代理目标)
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '' // 这是一个通配符，设置完了之后每个接口都要在前面加上/api（特别注意这一点）
                }
            }
        },
    },
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
}