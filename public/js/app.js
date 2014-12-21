var app = angular.module('notes', ['notes.directives']);

app.controller('NoteCtrl', function($scope, $http, $filter) {

    $scope.note = resetModel();
    $scope.lastModified = null;

    $http.get('/getNotes').then(function(obj) {
        console.log(JSON.stringify(obj.data));
        $scope.Notes = obj.data;
        $scope.totalNotes = $scope.Notes.length;
    }, function(e) {
        console.log(e);
    });

    $scope.addNote = function(ev) {
        if ($(ev.target).hasClass('collapsed')) {
            $scope.mode = 'Add';
            $scope.reset();
        }
    };

    $scope.editNote = function(id) {
        var tcheck = $filter('filter')($scope.Notes, {
            id: id
        });
        if (tcheck.length) {
            $scope.mode = 'Edit';
            var o = tcheck[0];
            $scope.note = JSON.parse(angular.toJson(o));
            $('.collapse').collapse('show');
        }
    };

    $scope.saveNote = function() {
        $scope.$broadcast('show-errors-check-validity');
        if ($scope.NoteForm.$valid) {
            var model = JSON.parse(angular.toJson($scope.note));
            var url;
            if ($scope.mode === 'Add') {
                url = '/addNote';
                model.created = new Date();
            } else {
                url = '/editNote';
                model.updated = new Date();
            }

            console.log(model)
            console.log(url)

            $http.post(url, model).then(function(obj) {
                console.log(obj);
                var d = obj.data;
                var id = d.data;
                var msg = d.message;
                if (msg === 'success') {
                    if ($scope.mode === 'Add') {
                        $scope.totalNotes = $scope.totalNotes + 1;
                        model.id = id;
                        console.log('-----------------------');
                        console.log(JSON.stringify(model));
                        $scope.Notes.push(model);
                    } else {
                        var index;
                        for (var i = 0, l = $scope.Notes.length; i < l; i++) {
                            var r = $scope.Notes[i];
                            if (r.id == model.id) {
                                index = i;
                                break;
                            }
                        }
                        console.log('-----------------------');
                        console.log(JSON.stringify(model));
                        $scope.Notes[index] = model;
                        $scope.lastModified = model;
                    }
                    $('.cor-icon').click();
                }
            }, function(e) {
                console.log(e);
            });
        }
    };

    function resetModel() {
        return {
            title: '',
            description: '',
            editable: true,
            updated: null,
            created: null
        };
    }

    $scope.reset = function() {
        $scope.$broadcast('show-errors-reset');
        $scope.note = resetModel();
    };

});
