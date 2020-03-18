angular.module('bnpbApp.services')
.factory("Dashboard", function($resource) {
    var apiUrl = 'api';
        apiUrl = 'https://bnpb.alfath.tech/api'
        apiUrl = globalApiUrl;
    return $resource(apiUrl+"/kejadian", {
        id: "@id"
    }, {
        list: {
            method: 'GET',
            url: apiUrl+"/kejadian",
        },
        detail : {
            method: 'GET',
            url: apiUrl+"/kejadian/detail/:id",  
        }
    });
});