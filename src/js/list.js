require(['./config'], function () {
    require(['jquery', 'template', 'loadHF'], function ($, template) {
        // List列表类
        class List {
            constructor() {
                // this.container = $('.prod_list_ul')
                this.getData().then((list) => {
                    // 首先then里面接收了resolve传递过来的list数据，紧接着继续传递给renderList
                    this.renderList(list)
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
                let str = template('list-template', { list })
                $('.prod_list_ul').html(str)
            }

            // 初始化渲染页面
            // initProductList() {
            //     $.get('http://rap2api.taobao.org/app/mock/223440/api/list', resp => {
            //         // console.log(resp)
            //         // 调用template方法，第一个参数就是script的id（不带#），第二个参数是当前模板需要的数据
            //         const str = template('list-template', {list: resp.res_body.list})
            //         // console.log(str)
            //         $('.prod_list_ul').html(str)
            //     })
            // }
        }

        new List()
    })
})