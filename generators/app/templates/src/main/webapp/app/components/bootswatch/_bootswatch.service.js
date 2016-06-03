'use strict';

angular.module('<%=angularAppName%>')
    .factory('BootSwatchService', [ '$http', function ($http) {
        return {
            get: function() {
                return $http.get('http://bootswatch.com/api/3.json').then(function (response) {
                    return response.data.themes;
                });
            }
        };
    }]);
