(function() {
    'use strict';

    angular
        .module('<%=angularAppName%>')
        .factory('BootSwatchService', BootSwatchService);

    BootSwatchService.$inject = ['$http'];

    function BootSwatchService ($http) {
        return {
            get: get
        };

        function get() {
            return $http.get('http://bootswatch.com/api/3.json').then(function (response) {
                return response.data.themes;
            });
        }
    }
})();
