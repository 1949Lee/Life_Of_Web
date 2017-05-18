/**
 * Created by Lee on 2017/5/16.
 */
angular.module('quizApp').controller('childQuizController', ['$rootScope', '$scope', '$state', 'settings', function ($rootScope, $scope, $state, $stateParams, settings) {
    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        App.initAjax();
        // console.log($('.nav-item.active').find('.nav-link').data('page-bar-index'));
        page.changePageBar(getCookie('currentSideBar'));
        page.loading();
        // 初始化页面布局
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;

        // 初始化布局结束

        var loginInfo = getLogin();
        if(loginInfo == null){
            window.location.href = WebUrl()+'html/login.html';
        }
        // 获取路由参数
        var param = null;
        if ($state.params.param != undefined) {
            param = JSON.parse($state.params.param);
        }
        switch(param.writeStatus){
            case '1'://填写中

                break;
            case '2'://已提交

                break;
            case '3'://未填写
                
                break;
        }
        page.initFinish();
    });
}]);
