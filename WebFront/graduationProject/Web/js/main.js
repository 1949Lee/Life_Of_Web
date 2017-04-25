var quizApp = angular.module('quizApp', ['ui.router', 'oc.lazyLoad']);
quizApp.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);
quizApp.controller('AppController', ['$scope', '$rootScope', function ($scope, $rootScope) {
//        $scope.$on('$viewContentLoaded', function () {
//            //App.initComponents(); // init core components
//            //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive
//        });
}]);
quizApp.config(['$controllerProvider', function ($controllerProvider) {
    // this option might be handy for migrating old apps, but please don't use it
    // in new ones!
    $controllerProvider.allowGlobals();
}]);
quizApp.factory('settings', ['$rootScope', function ($rootScope) {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        assetsPath: '../assets',
        globalPath: '../assets/global',
        layoutPath: '../assets/layouts/layout2',
    };

    $rootScope.settings = settings;

    return settings;
}]);
quizApp.config(function ($stateProvider) {
    // Redirect any unmatched url
//                $urlRouterProvider.otherwise("/index.html");

    $stateProvider
    //                        首页
        .state('index', {
            url: "/index",
            templateUrl: "default.html",
            data: {pageTitle: '主页'},
            controller: 'generalPageController',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'indexCss',
                            insertBefore: '#ng_load_css_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                            files: [
                                <!--select2  CSS+JS-->
                                '../assets/global/plugins/select2/css/select2.css',
                                '../assets/global/plugins/select2/css/select2-bootstrap.min.css',

                                <!--模态框 CSS+JS-->
                                '../assets/global/plugins/bootstrap-modal/css/bootstrap-modal-bs3patch.css',
                                '../assets/global/plugins/bootstrap-modal/css/bootstrap-modal.css'
                            ]
                        },
                        {
                            name: 'indexJs',
                            insertBefore: '#ng_load_js_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                            files: [
                                <!--select2 CSS+JS-->
                                '../assets/global/plugins/select2/js/select2.full.js',
                                '../assets/pages/scripts/components-select2.js',
                                <!--模态框 CSSS+JS-->
                                '../assets/global/plugins/bootstrap-modal/js/bootstrap-modalmanager.js',
                                '../assets/global/plugins/bootstrap-modal/js/bootstrap-modal.js',
                                '../assets/pages/scripts/ui-extended-modals.js',
                                '../js/generalPageControllers.js',
                            ]
                        }
                    ]);
                }]
            }
        })

        // 问卷管理
        .state('quiz', {
            url: "/quiz",
            templateUrl: "quiz/quizIndex.html",
            data: {pageTitle: '问卷管理'},
            controller: 'generalPageController',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        // {
                        //     name: 'indexCss',
                        //     insertBefore: '#ng_load_css_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        //     files: [
                        //
                        //     ]
                        // },
                        {
                            name: 'indexJs',
                            insertBefore: '#ng_load_js_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                            files: [
                                '../js/generalPageControllers.js',
                            ]
                        }
                    ]);
                }]
            }
        })

        //模板管理
        .state('template', {
            url: "/template",
            templateUrl: "template/templateIndex.html",
            data: {pageTitle: '模板管理'},
            controller: 'generalPageController',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        // {
                        //     name: 'css',
                        //     insertBefore: '#ng_load_css_before',
                        //     files: [
                        //         //添加引用文件
                        //
                        //     ]
                        // },
                        {
                            name: 'js',
                            insertBefore: '#ng_load_js_before',
                            files: [
                                //添加引用文件
                                '../js/generalPageControllers.js'
                            ]
                        }
                    ]);
                }]
            }
        })

        // 数据统计
        .state('statistics', {
            url: "/statistics",
            templateUrl: "statistics/statisticsIndex.html",
            data: {pageTitle: 'AngularJS Ui Select'},
            controller: 'generalPageController',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        // {
                        //     name: 'css',
                        //     insertBefore: '#ng_load_css_before',
                        //     files: [
                        //         //添加引用文件
                        //
                        //     ]
                        // },
                        {
                            name: 'js',
                            insertBefore: '#ng_load_js_before',
                            files: [
                                //添加引用文件
                                '../js/generalPageControllers.js'
                            ]
                        }
                    ]);
                }]
            }
        })

        // 个人中心
        .state('profile', {
            url: "/profile",
            templateUrl: "profile/profileIndex.html",
            data: {pageTitle: 'AngularJS UI Bootstrap'},
            controller: 'generalPageController',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        // {
                        //     name: 'css',
                        //     insertBefore: '#ng_load_css_before',
                        //     files: [
                        //         //添加引用文件
                        //
                        //     ]
                        // },
                        {
                            name: 'js',
                            insertBefore: '#ng_load_js_before',
                            files: [
                                //添加引用文件
                                '../js/generalPageControllers.js'
                            ]
                        }
                    ]);
                }]
            }
        })

        // 系统设置
        .state('sysConfig', {
            url: "/sysConfig",
            templateUrl: "sysConfig/sysConfigIndex.html",
            data: {pageTitle: 'jQuery Tree View'},
            controller: 'generalPageController',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        // {
                        //     name: 'css',
                        //     insertBefore: '#ng_load_css_before',
                        //     files: [
                        //         //添加引用文件
                        //
                        //     ]
                        // },
                        {
                            name: 'js',
                            insertBefore: '#ng_load_js_before',
                            files: [
                                //添加引用文件
                                '../js/generalPageControllers.js'
                            ]
                        }
                    ]);
                }]
            }
        });
});
quizApp.run(["$rootScope", "settings", "$state", function ($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view
}]);