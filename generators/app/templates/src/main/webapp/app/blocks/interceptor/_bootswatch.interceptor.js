(function() {
    'use strict';

    angular
        .module('<%=angularAppName%>')
        .factory('BootswatchInterceptor', BootswatchInterceptor);

    function BootswatchInterceptor () {
        var service = {
            request: request
        };

        return service;

        function request(config) {
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
    }
})();
