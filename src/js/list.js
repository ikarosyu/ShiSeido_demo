require(['./config'], function () {
    require(['jquery', 'template', 'loadHF', 'loadAS'], function ($, template) {
        // List列表类
        class List {
            constructor() {
                this.getData()
                this.showProd()
            }

            getData() {
                const url = `http://rap2api.taobao.org/app/mock/223440/api/list`
                $.getJSON(url, resp => {
                    // 获取响应数据中使用的商品信息部分
                    const _new = resp.res_body.list
                    console.log(_new)


                    const pageSize = 9
                    const dataCount = _new.length
                    console.log(dataCount)

                    const pager = new Pagination('.page-container', {
                        pageSize: pageSize,
                        autoLoad: true,
                        unit: '条',
                        toPage: function (index, _pageSize) {
                            // 设置记录总数，用于生成分页HTML内容
                            if (index === 0 || _pageSize) this.updateCount(dataCount, _pageSize)

                            // 根据页码以及分页大小生成html内容
                            let pageListHtml = ''
                            for (var i = 0; i < (_pageSize || pageSize); i++) {
                                pageListHtml += `
                                    <li class="ac">
                                        <a href="/html/detail.html?id=${index * (_pageSize || pageSize) + i + 1}" target="_blank"><img src="${_new[i].images}" alt=""></a>
                                        <p><a href="/html/detail.html?id=${index * (_pageSize || pageSize) + i + 1}">${_new[i].title}</a></p>
                                        <p>${_new[i].size}ml</p>
                                        <p>￥${_new[i].price}</p>
                                        <a href="#" class="addBtn">加入购物车</a><br>
                                        <a href="#" class="seeDetail">详情</a>
                                    </li>
                                    `
                            }
                            $('.page-list').html(pageListHtml)
                        }
                    })
                })
            }

            showProd() {
                const url = `http://rap2api.taobao.org/app/mock/223440/api/list`
                $.getJSON(url, resp => {
                    const _prod = resp.res_body.list
                    const data = {list: _prod}
                    const html = template("some-template", data)
                    $(".fun").prepend(html)
                })
            }

        }

        new List()
    })
})