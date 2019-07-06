require(['./config'], function () {
    require(['jquery', 'swiper', 'loadHF', 'cookie'], function ($, Swiper) {
        // 主页类
        class Home {
            constructor() {
                // this.checkUser()
                this.initCarousel()
            }

            // 初始化轮播图
            initCarousel() {
                new Swiper ('.swiper-container', {
                    loop: true, // 循环模式选项
                    autoplay: true, // 自动轮播

                    // 如果需要前进后退按钮
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                })
            }

            // 检查用户是否登录
            // checkUser() {
            //     let userInfo = $.cookie("register");
            //     if (userInfo) {
            //         userInfo = JSON.parse(userInfo);
            //         console.log(userInfo);
            //
            //         $(".loginUserName").html(userInfo.username);
            //         $(".un_login").css({display: "none"});
            //         $(".al_login").css({display: "block"})
            //     }
            // }
        }

        new Home()
    })
})













// let
//     lis = $(".bannerUL li"),
//     len = lis.length,
//     currentIndex = 0,
//     nextIndex = 1;
//
// console.log(lis, len);
//
// function move() {
//     $(lis[currentIndex]).fadeOut();
//     $(lis[nextIndex]).fadeIn();
//
//     currentIndex = nextIndex;
//     nextIndex++;
//     if (nextIndex >= len) {
//         nextIndex = 0;
//     }
// }
//
// let timer = setInterval(move, 4000);
//
// $("#goPrev").on('click', function () {
//     nextIndex = currentIndex - 1;
//     if (nextIndex < 0)
//         nextIndex = len - 1;
//     move();
// });
// $("#goNext").on("click", move);