angular.module('alurapic').controller('FotoController', function($scope, $http, $routeParams) {

	$scope.foto = {};
	$scope.mensagem = '';

	if (angular.isDefined($routeParams.fotoId)) {
		$http.get('v1/fotos/' + $routeParams.fotoId)
			.success(function(retorno) {
				$scope.foto = retorno;
			})
			.error(function(erro) {
				console.log('Não foi possível obter a foto');
				$scope.mensagem = 'Não foi possível obter a foto';
			});
	}

	$scope.submeter = function() {

		if (!$scope.formulario.$valid) {
			return;
		}
		if (angular.isDefined($scope.foto._id)) {
			$http.put('/v1/fotos/' + $scope.foto._id, $scope.foto)
				.success(function() {
					$scope.mensagem = `Foto ${$scope.foto.titulo} alterada com sucesso`;
					$scope.formulario.$setPristine();
				})
				.error(function(erro) {
					console.log('Não foi possível alterar a foto');
					$scope.mensagem = 'Não foi possível cadastrar a foto';
				});
		} else {
			$http.post('/v1/fotos', $scope.foto)
				.success(function() {
					$scope.foto = {};
					$scope.mensagem = 'Foto cadastrada com sucesso';
					$scope.formulario.$setPristine();
				})
				.error(function(erro) {
					console.log('Não foi possível cadastrar a foto');
					$scope.mensagem = 'Não foi possível cadastrar a foto';
				});
		}
	};
});