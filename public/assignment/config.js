/**
 * Created by Ayush on 9/5/2016.
 */

(function () {
    angular
        .module("WebAppMaker")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/",{
                templateUrl : "/assignment/views/home.html"
            })
            .when("/login", {
                templateUrl: "/assignment/views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })

            .when("/flickr", {
                templateUrl: "/assignment/views/widget/widget-flickr-search.view.client.html",
                controller: "FlickrImageSearchController",
                controllerAs: "model"
            })

            .when("/register", {
                templateUrl: "/assignment/views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })

            .when("/user",{
                templateUrl : "/assignment/views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn : checkLoggedIn
                }
            })

            .when("/user/:id",{
                templateUrl : "/assignment/views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn : checkLoggedIn
                }
            })

            .when("/user/:userId/website", {
                templateUrl : "/assignment/views/website/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model"
            })

            .when("/user/:userId/website/new", {
                templateUrl : "/assignment/views/website/website-new.view.client.html",
                controller: "NewWebsiteController",
                controllerAs: "model"
            })

            .when("/user/:userId/website/:websiteId", {
                templateUrl : "/assignment/views/website/website-edit.view.client.html",
                controller: "EditWebsiteController",
                controllerAs: "model"
            })

            .when("/user/:userId/website/:websiteId/page", {
                templateUrl : "/assignment/views/page/page-list.view.client.html",
                controller: "PageListController",
                controllerAs: "model"
            })

            .when("/user/:userId/website/:websiteId/page/new", {
                templateUrl : "/assignment/views/page/page-new.view.client.html",
                controller: "NewPageController",
                controllerAs: "model"
            })

            .when("/user/:userId/website/:websiteId/page/:pageId", {
                templateUrl : "/assignment/views/page/page-edit.view.client.html",
                controller: "EditPageController",
                controllerAs: "model"
            })

            .when("/user/:userId/website/:websiteId/page/:pageId/widget", {
                templateUrl : "/assignment/views/widget/widget-list.view.client.html",
                controller: "WidgetListController",
                controllerAs: "model"
            })

            .when("/user/:userId/website/:websiteId/page/:pageId/widget/new", {
                templateUrl : "/assignment/views/widget/widget-chooser.view.client.html",
                // controller: "WidgetListController",
                // controllerAs: "model"
            })

            .when("/user/:userId/website/:websiteId/page/:pageId/widget/editHeader", {
                templateUrl : "/assignment/views/widget/widget-heading.view.client.html",
                // controller: "WidgetListController",
                // controllerAs: "model"
            })

            .when("/user/:userId/website/:websiteId/page/:pageId/widget/editHeader", {
                templateUrl : "/assignment/views/widget/widget-heading.view.client.html",
                // controller: "WidgetListController",
                // controllerAs: "model"
            })

            .when("/user/:userId/website/:websiteId/page/:pageId/widget/editYoutube", {
                templateUrl : "/assignment/views/widget/widget-youtube.view.client.html",
                // controller: "WidgetListController",
                // controllerAs: "model"
            })

            .when("/user/:userId/website/:websiteId/page/:pageId/widget/editImage", {
                templateUrl : "/assignment/views/widget/widget-image.view.client.html",
                // controller: "WidgetListController",
                // controllerAs: "model"
            })

            .when("/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", {
                templateUrl : "/assignment/views/widget/widget-chooser.view.client.html",
                // controller: "WidgetListController",
                // controllerAs: "model"
            })

            .otherwise({
                redirectTo: "/login"
            });
        
        function checkLoggedIn($rootScope, $q, UserService, $location) {

            var deferred = $q.defer();

            UserService
                .loggedIn()
                .then(
                    function (response) {
                        var user = response.data;
                        console.log(user);
                        if(user == '0') {
                            deferred.reject();
                            $rootScope.currentUser = null;
                            $location.url("/login");
                        }
                        else {
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        }
                    },
                    function (err) {
                        $location.url("/login");
                    }
                );
            return deferred.promise;
        }
    };
})();