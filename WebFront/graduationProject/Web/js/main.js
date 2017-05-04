var quizApp = angular.module('quizApp', ['ui.router', 'oc.lazyLoad']);
quizApp.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);
quizApp.controller('AppController', ['$scope', '$state', '$rootScope', function ($scope, $state, $rootScope) {
    $scope.$on('$viewContentLoaded', function () {
        App.initComponents(); // init core components
        // Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive
        $('.select2').select2();
        // Layout.initSidebar($state); // init sidebar
    });
    Layout.initFooter($state); // init sidebar
}]);
quizApp.controller('SidebarController', ['$state', '$scope', function ($state, $scope) {
    Layout.initSidebar($state); // init sidebar
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
            pageAutoScrollOnLoad: false // auto scroll to top on page load
        },
        assetsPath: '../assets',
        globalPath: '../assets/global',
        layoutPath: '../assets/layouts/layout2',
    };

    $rootScope.settings = settings;

    return settings;
}]);
quizApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/index");

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
                                <!--模态框 CSS+JS-->
                                '../assets/global/plugins/bootstrap-modal/css/bootstrap-modal-bs3patch.css',
                                '../assets/global/plugins/bootstrap-modal/css/bootstrap-modal.css'
                            ]
                        },
                        {
                            name: 'indexJs',
                            insertBefore: '#ng_load_js_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                            files: [
                                // '../assets/pages/scripts/ui-extended-modals.js',
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
            controller: 'quizController',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'indexJs',
                            insertBefore: '#ng_load_js_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                            files: [
                                '../js/quiz/quizController.js',
                            ]
                        }
                    ]);
                }]
            }
        })

        // 新增问卷
        .state('newQuiz', {
            url: "/newQuiz/:param",
            templateUrl: "quiz/newQuiz.html?"+Math.random(),
            data: {pageTitle: '新增问卷'},
            controller: 'newQuizController',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'indexCss',
                            insertBefore: '#ng_load_css_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                            files: [
                                <!--模态框 CSS+JS-->
                                '../assets/global/plugins/bootstrap-modal/css/bootstrap-modal-bs3patch.css',
                                '../assets/global/plugins/bootstrap-modal/css/bootstrap-modal.css',
                                "../assets/global/plugins/bootstrap-wysihtml5/bootstrap-wysihtml5.css"
                            ]
                        },
                        {
                            name: 'quizApp',
                            insertBefore: '#ng_load_appJs_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                            files: [
                                "../assets/global/plugins/bootstrap-wizard/jquery.bootstrap.wizard.js",
                                "../assets/global/plugins/bootstrap-wysihtml5/wysihtml5-0.3.0.js",
                                "../assets/global/plugins/bootstrap-wysihtml5/bootstrap-wysihtml5.js",
                                // "../assets/global/plugins/bootstrap-wysihtml5/wysihtml5.js"
                            ]
                        },
                        {
                            name: 'indexJs',
                            insertBefore: '#ng_load_js_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                            files: [
                                '../js/quiz/newQuiz.js',
                                '../js/quiz/newQuizController.js',
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
}]);
quizApp.run(["$rootScope", "settings", "$state", function ($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view
}]);