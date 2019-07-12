require(['./config'], () => {
    require(['jquery', 'loadHF', 'cookie', 'loadAS'], ($) => {
        // 登陆注册类
        class LoginRegister {
            constructor() {
                this.addListener()
            }

            addListener() {
                $(".button_reg").on("click", this.registerHandler.bind(this))
                $(".login_btn").on("click", this.loginHandler)
            }

            registerHandler(e) {
                e.preventDefault()
                // 获取待提交的用户注册信息
                const data = $(".form-register").serialize()
                console.log(data)
                $.post('http://localhost/ShiseidoPC/api/register.php', data, (res) => {
                    console.log(res)
                    if (res.data.status === 1) { // 注册成功
                        // 使用session存储用户信息
                        let reg_username = $(".reg_name").val()
                        let reg_password = $(".reg_password").val()
                        let registerInfo = {
                            "username": reg_username,
                            "password": reg_password
                        }
                        console.log(registerInfo)
                        $.cookie('register', JSON.stringify(registerInfo), {path: '/'})

                        alert("注册成功！请登录")
                        this.showInfo()
                    }
                    else {
                        $('.register-error').removeClass('hidden').text(res.data.message)
                    }
                }, 'json')
            }

            //将用户信息，发送到登录表单中
            showInfo() {
                const objInfo = {}
                const infoData = $(".form-register").serialize().split("&")
                // console.log(infoData)
                // 将数组传换成对象
                infoData.forEach((val) => {
                    let new_infoData = val.split("=")
                    objInfo[new_infoData[0]] = new_infoData[1]
                })

                $(".loginUsername").val(objInfo.username)
                $(".loginPassword").val(objInfo.password)
            }

            // 登录
            loginHandler(e) {
                e.preventDefault()
                const data = $(".login_form").serialize()
                $.post('http://localhost/ShiseidoPC/api/login.php', data, (res) => {
                    if (res.data.status === 1) {

                        // 储存用户登录信息
                        let
                            log_username = $(".loginUsername").val(),
                            log_password = $(".loginPassword").val()

                        $.cookie('login', JSON.stringify({
                            "username": log_username,
                            "password": log_password
                        }), {path: '/'})

                        alert("登录成功，快去购物吧！")
                        location = 'http://localhost:1905/'

                    }else {
                        $('.login-error').removeClass('hidden').text(res.data.message)
                    }
                }, 'json')
            }
        }

        new LoginRegister()
    })
})