define(['jquery'], function ($) {
    class LoadAside {
        constructor() {
            this.loadAside()
        }

        loadAside() {
            $('aside').load('/html/include/aside.html', () => {
                window.onscroll = function () {
                    let _scrollTop = document.documentElement.scrollTop || document.body.scrollTop

                    if (_scrollTop > 130) {
                        $(".backTop").show(500)
                    } else {
                        $(".backTop").hide(500)
                    }
                }

                $(".to_top").on('click', () => {
                    document.documentElement.scrollTop = 0
                })
            })
        }
    }
    return new LoadAside()
})