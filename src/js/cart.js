require(['./config'], () => {
    require(['jquery', 'template', 'loadHF'], function ($, template) {
        // 购物车类
        class Cart {
            constructor() {
                this.cart = JSON.parse(localStorage.getItem('cart')) || []
                this.initCart()
                this.addListener()
            }

            // 初始化渲染购物车
            initCart() {
                // 如果购物车为空， 则显示为空的信息
                if (this.cart.length === 0) {
                    $('.cart-empty').show()
                        .next().hide()
                    return
                }
                console.log(this.cart)
                // 购物车非空
                $(".cart-empty").hide()
                    .next().removeClass("hidden")
                // 渲染显示购物车内容
                const html = template("cart-template", {cart: this.cart})
                $(".cart-item").html(html)
            }

            // 添加事件监听
            addListener() {
                // 删除
                $(".cart-item").on("click", ".btn-delete", this.removeHandler.bind(this))
                // 加减数量
                $(".cart-item").on("click", ".btn-decrease, .btn-increase", this.modifyHandler.bind(this))
                // 输入修改数量
                $(".cart-item").on("blur", ".prod-amount", this.modifyHandler.bind(this))
                // 全选
                $(".chk_all").on("click", this.checkAllHandler.bind(this))
                // 部分选中
                $(".cart-item").on("click", ".chk-prod", this.checkProductHandler.bind(this))
            }

            // 删除处理
            removeHandler(e) {
                // 获取待删除的行
                const _tr = $(e.target).parents("tr")
                // 获取待删除行中商品的id
                const _id = _tr.data("id")
                // 从购物车数组中删除该id 对应的商品元素
                this.cart = this.cart.filter(curr => curr.id != _id) // filter() 过滤器， 返回筛选后的数组
                // 从存储的结果中删除该id对应的商品元素
                localStorage.cart = JSON.stringify(this.cart)
                // 从DOM树中删除行
                _tr.remove()

                this.calcTotalPrice()
            }

            // 修改数量处理
            modifyHandler(e) {
                // 获取待修改的行
                const _tr = $(e.target).parents("tr")
                // 获取待修改的商品id
                const _id = _tr.data("id")
                // 将购物车中对应的元素数量更新
                const prod = this.cart.find(curr => curr.id == _id) // 数组中存在的对应元素
                if ($(e.target).is(".btn-increase")) { // 加
                    prod.amount += 1
                } else if ($(e.target).is(".btn-decrease")) { // 减
                    if (prod.amount <= 1)
                        return
                    prod.amount -= 1
                } else if ($(e.target).is(".prod-amount")) { // 输入数量
                    // 获取输入的值
                    const _val = $(e.target).val()
                    // 判断输入是否合法
                    if (!/^[1-9]\d*$/.test(_val)) {
                        console.log("123");
                        $(e.target).val(prod.amount)
                    }// 输入不是整数数字，则将数量还原为原始数量值
                    prod.amount = Number(_val)
                }
                // 保存到localStorage
                localStorage.cart = JSON.stringify(this.cart)
                // 更新显示修改后的数量及小计
                _tr.find(".prod-amount").val(prod.amount)
                _tr.find(".p-subtotal").text((prod.amount * prod.price).toFixed(2))

                this.calcTotalPrice()
            }

            // 全选，取消全选
            checkAllHandler(e) {
                // 获取“全选”复选框的选中状态
                // 通常 checked、selected、disabled 这些个属性值获取与设置使用 prop() 方法
                const _status = $(e.target).prop("checked")
                // 将各行前的复选框选中状态设置为与“全选”一致
                $(".chk-prod").prop("checked", _status)

                this.calcTotalPrice()
            }

            // 部分选中
            checkProductHandler(e) {
                console.log($(".chk-prod:checked").length)
                console.log(this.cart.length)
                $(".chk_all").prop("checked", $(".chk-prod:checked").length === this.cart.length)

                this.calcTotalPrice()
            }

            // 计算合计金额
            calcTotalPrice() {
                let sum = 0
                // console.log($(".chk-prod:checked"))
                $(".chk-prod:checked").each((index, element) => {
                    // console.log($(element).parents("tr").find(".p-subtotal").text())
                    sum += Number($(element).parents("tr").find(".p-subtotal").text())
                })
                $("#total-price").text(sum.toFixed(2))
            }
        }

        new Cart()
    })
})