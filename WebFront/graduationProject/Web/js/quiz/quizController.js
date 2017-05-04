/**
 * Created by Lee on 2017/4/26.
 */
angular.module('quizApp').controller('quizController', ['$rootScope', '$scope', '$state', 'settings', function ($rootScope, $scope, $state, settings) {
    $scope.$on('$viewContentLoaded', function () {
        // initialize core components
        App.initAjax();
        // console.log($('.nav-item.active').find('.nav-link').data('page-bar-index'));
        page.changePageBar(getCookie('currentSideBar'));
        // set default layout mode
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;

    });
    $scope.newQuiz = function () {
        console.log('跳转');
        var param = {
            openCode: 1,
            quizAllData: {
                quiz:{
                    quizID:Guid.newGuid().toString('g'),
                    templateID:Guid.newGuid().toString('g'),
                    status:0
                },
                ask:{
                    templateFlag:0
                }
            }
        };
        $state.go('newQuiz', {param: JSON.stringify(param)});
    };
}]);
