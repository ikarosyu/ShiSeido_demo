require(['./config'], () => {
    require(['jquery', 'template', 'loadHF'], function ($, template) {
        // 商品详情类
        class Detail {
            constructor() {
                this.init()
                this.getData().then((list) => {
                    // 首先then里面接收了resolve传递过来的list数据，紧接着继续传递给renderList
                    this.renderList(list)
                })
                this.addListener()
            }

            // 初始化渲染详情页面
            init() {
                // 获取商品id
                const _id = window.location.search.slice(4)
                // 构建请求后端的 url
                const url = `http://rap2api.taobao.org/app/mock/223440/api/detail?id=${_id}`
                $.getJSON(url, resp => {
                    // 获取响应数据中使用的商品信息部分
                    const _prod = resp.res_body.list
                    // 准备渲染的数据
                    const data = {prod: _prod}
                    // 利用模板引擎渲染
                    const html = template("detail-template", data)
                    // 显示渲染结果
                    $(".prod_des").prepend(html)
                })
            }

            getData() {
                // 请求后端接口拿到列表数据
                return new Promise(resolve => {
                    $.get('http://rap2api.taobao.org/app/mock/223440/api/list', resp => {
                        if (resp.res_code === 200) {
                            // 传递实参，把从接口取到的数据传递给 then
                            resolve(resp.res_body.list)
                        }
                    })
                })
            }
            renderList(list) {
                // 第二个参数 {list: list} 这个对象里的key指的是template里面需要的变量名，value指的是从接口获取的值
                // let str = template('list-template', { list: list })
                let str = template('some-template', { list })
                $('.rec-list').html(str)
            }

            // 注册事件监听
            addListener() {

            }

        }

        new Detail()
    })
})