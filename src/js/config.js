// 配置
require.config({
    baseUrl: '/',
    paths: {
        jquery: 'libs/jquery/jquery-1.11.3',
        loadHF: 'js/loadHeaderAndFooter',
        swiper: 'libs/swiper/js/swiper.min',
        template: "libs/art-template/template-web",
        fly: "libs/jquery-plugins/jquery.fly.min",
        zoom: "libs/jquery-plugins/jquery.elevateZoom-3.0.8.min",
        cookie: "libs/jquery-plugins/jquery.cookie",
        loadAS: 'js/aside'
        // pagination: "libs/jquery-plugins/jquery.pagination"
    },
    shim: {
        fly: {
            deps: ['jquery']
        },
        zoom: {
            deps: ['jquery']
        },
        cookie: {
            deps: ['jquery']
        }
        // pagination: {
        //     deps: ['jquery']
        // },
    }
})