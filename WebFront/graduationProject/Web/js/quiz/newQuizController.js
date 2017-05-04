/**
 * Created by Lee on 2017/4/26.
 */
angular.module('quizApp').controller('newQuizController', ['$rootScope', '$scope','$state', 'settings', function($rootScope, $scope,$state,$stateParams, settings) {
    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        App.initAjax();
        // 初始化页面布局 开始
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        //关闭侧边栏
        $rootScope.settings.layout.pageSidebarClosed = true;
        // 初始化页面布局 结束

        // console.log($('.nav-item.active').find('.nav-link').data('page-bar-index'));
        //改变位置 单行
        page.changePageBar(getCookie('currentSideBar'));
        //初始化步骤 单行
        var param = JSON.parse($state.params.param);
        quizFormWizard.init({quizAllData:param.quizAllData,openCode:param.openCode});
        //渲染特殊控件的响应式
        // window.onresize = resizeSpecialEle;
    });
    console.log(JSON.parse($state.params.param));
}]);