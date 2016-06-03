(function() {
    'use strict';

    angular
        .module('<%=angularAppName%>')
        .directive('jhSwitchTheme', jhSwitchTheme);

    function jhSwitchTheme () {
        var vm = this;

        return {
            restrict: 'A',
            scope: {
                theme : '=jhSwitchTheme'
            },
            link: link
        };

        function link(scope, element, attrs) {
            var currentTheme = $("#bootswatch-css").attr('title');
            if(scope.theme.name === currentTheme){
                element.parent().addClass("active");
            }

            element.on('click',function(){
                $("#bootswatch-css").attr("href", scope.theme.css);
                $(".theme-link").removeClass("active");
                element.parent().addClass("active");
            });
        }
    }
})();
