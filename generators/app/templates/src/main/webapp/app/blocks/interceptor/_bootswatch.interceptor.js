'use strict';

angular.module('<%=angularAppName%>')
    .factory('BootswatchInterceptor', ['$rootScope', '$q', '$location', '$localStorage', '$sessionStorage', function ($rootScope, $q, $location, $localStorage, $sessionStorage) {
        return {
            // Add authorization token to headers
            request: function (config) {
                config.headers = config.headers || {};
                // exclude bootswatch url
                if(config.url.indexOf('bootswatch.com/api') !== -1){
                  <% if (authenticationType == 'oauth2') { %>
                  delete config.headers['Authorization'];
                  <% } %><% if (authenticationType == 'xauth') { %>
                  delete config.headers['x-auth-token'];
                  <% } %><% if (authenticationType == 'jwt') { %>
                  delete config.headers.Authorization;
                  <% } %>
                }
                return config;
            }
        };
    }]);
