'use strict';

angular.module('<%=angularAppName%>')
    .factory('BootswatchInterceptor', function ($rootScope, $q, $location, localStorageService) {
        return {
            // Add authorization token to headers
            request: function (config) {
                config.headers = config.headers || {};
                // exclude bootswatch url
                if(config.url.indexOf('api.bootswatch.com') !== -1){
                  <% if (authenticationType == 'oauth2') { %>
                  delete config.headers['Authorization'];
                  <% } %><% if (authenticationType == 'xauth') { %>
                  delete config.headers['x-auth-token'];
                  <% } %>
                }
                return config;
            }
        };
    });
