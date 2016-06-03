(function() {
    'use strict';

    angular
        .module('<%=angularAppName%>')
        .controller('BootswatchController', BootswatchController);

    BootswatchController.$inject = ['$scope', 'BootSwatchService'];

    function BootswatchController ($scope, BootSwatchService) {
        var vm = this;

        getThemes();

        function getThemes () {
            /* Get the list of availabel bootswatch themes */
            BootSwatchService.get().then(function(themes) {
                vm.themes = themes;
                vm.themes.unshift({name:'Default',css:''});
            });
        }
    }
})();
