require(['./config'], () => {
    require(['jquery', 'template', 'loadHF', 'fly'], function ($, template) {
        // 商品详情类
        class Detail {
            constructor() {
                this.cart = JSON.parse(localStorage.getItem("cart")) || []
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
                    const _new = resp.res_body.list

                    // 把商品id加入到数据对象中
                    const id = { id: _id }
                    const _prod = {
                        ..._new,
                        ...id
                    }
                    // 准备渲染的数据
                    const data = {prod: _prod}
                    console.log(data)
                    // 利用模板引擎渲染
                    const html = template("detail-template", data)
                    // 显示渲染结果
                    $(".prod_des").prepend(html)
                })
            }

            // 渲染相关商品页面
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
                // 点击“加入购物车”按钮，触发表单提交事件
                $(".prod_des").on("click", ".adP", this.addToCarHandler.bind(this))
            }

            // 加入购物车处理
            addToCarHandler(e) {
                e.preventDefault()
                // 获取按钮祖先元素 ".prod-detail"
                const parents = $(e.target).parents(".prod-detail")
                // 获取当前选购商品的信息
                const currProd = {
                    id: parents.data("id"),
                    title: parents.find(".prod-title").text(),
                    image: parents.find(".prod_img").attr("src"),
                    price: parents.find(".prod-price").text(),
                    amount: 1
                }
                console.log(currProd)

                // 确认 localStorage 中保存的购物车数组
                // 如果不确认，可能多个页面同时打开添加购物车时会出现问题
                this.cart = JSON.parse(localStorage.getItem("cart")) || []

                // 判断在购物车数组中是否存在当前选购的商品
                const has = this.cart.some(prod => prod.id === currProd.id)
                // 如果存在， 则修改数组， 不存在，则添加到数组当中
                if (has) { // 存在
                    this.cart = this.cart.map(prod => {
                        if (prod.id === currProd.id)
                            prod.amount += 1
                        return prod
                    })
                } else { // 不存在
                    // 将当前选购的商品保存到购物车数组当中
                    this.cart.push(currProd)
                }

                // 将购物车数组保存到 localStorage 中
                localStorage.setItem("cart", JSON.stringify(this.cart))

                // 加入购物车成功， 添加抛物线效果
                this.fly(e)
            }

            // 加入购物车抛物线效果
            fly(e) {
                console.log("fei")
                // 起点坐标
                const start = {
                    top: e.pageY,
                    left: e.pageX
                };
                // 终点坐标
                const end = $(".bag").offset();
                // 待运动的元素
                const flyerImgHtml = $(".prod_img").attr("src");
                const flyer = $(`<img src="${flyerImgHtml}" style="width: 40px;">`);
                // 实现抛物线运动
                flyer.fly({
                    start,
                    end,
                    onEnd() {
                        this.destroy()

                        // 动画完成，购物车数量 +1
                        let num = parseInt($(".bag span").html());
                        $(".bag span").html(++num)
                    }
                })
            }

        }

        new Detail()
    })
})