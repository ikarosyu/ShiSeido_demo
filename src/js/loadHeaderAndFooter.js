// 定义模块， 复用页面头部、尾部
define(['jquery', 'cookie'], function ($) {
    // 定义类， 该类主要用于加载头部、尾部
    class LoadHeaderAndFooter {
        constructor() {
            this.loadHeader()
            this.loadFooter()
        }

        // 加载头
        loadHeader() {
            $('header').load('/html/include/header.html', () => {
                this.addListener()
                this.initHeader()
            })
        }

        // 添加事件监听
        addListener() {
            // 搜索框， 绑定“keyup”事件
            $('.search input:first').on("keyup", this.suggesteHandler)
            // 提示的内容点击， 显示到搜索框中：事件委派
            $('.suggest').delegate("div", "click", this.suggestClickHandler)
            // 推出登录
            $(".exit-login").on("click", this.exitLoginHandler)
        }

        // 读取登录用户信息
        initHeader() {
            let userInfo = $.cookie("login");
            if (userInfo) {
                userInfo = JSON.parse(userInfo);
                console.log(userInfo);

                $(".loginUserName").html(userInfo.username);
                $(".un_login").css({display: "none"});
                $(".al_login").css({display: "block"})
            }
        }

        // 退出登录
        exitLoginHandler() {
            if (confirm("你确定要退出吗？")) {
                // 删除cookie
                $.removeCookie('login', '/')

                // 切换显示页面
                $(".un_login").css({display: "block"});
                $(".al_login").css({display: "none"})
            }
        }

        // 点击建议项处理
        suggestClickHandler(e) {
            // 将选中内容填充到搜索框中
            $('.search input:first').val($(e.target).html())
            // 清空提示内容
            $('.suggest').empty()
        }

        // 提示建议处理
        suggesteHandler(e) {
            // 获取输入的内容
            const _val = $(e.target).val()
            // 跨域访问淘宝的提示接口
            const _url = `https://suggest.taobao.com/sug?code=utf-8&q=${_val}&callback=?`
            $.getJSON(_url, (data) => {
                // 相当于就是原生jsonp中定义的全局回调函数，用于处理响应回来的数据
                console.log(data)
                const html = data.result.map(curr => `<div>${curr[0]}</div>`).join("")
                $(".search .suggest").html(html)
            })
        }

        // 加载尾部
        loadFooter() {
            $('footer').load('/html/include/footer.html')
        }
    }

    return new LoadHeaderAndFooter()
})