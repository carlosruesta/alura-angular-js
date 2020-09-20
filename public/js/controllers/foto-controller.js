angular.module('alurapic').controller('FotoController', function($scope, $routeParams, recursoFoto) {

	$scope.foto = {};
	$scope.mensagem = '';

	if (angular.isDefined($routeParams.fotoId)) {
		recursoFoto.get({fotoId: $routeParams.fotoId},
			function(foto) {
				$scope.foto = foto;
			},
			function(erro) {
				console.log(erro);
				$scope.mensagem = 'Não foi possível obter a foto'
			});
	}

	$scope.submeter = function() {

		if (!$scope.formulario.$valid) {
			return;
		}
		if (angular.isDefined($scope.foto._id)) {
			recursoFoto.update({fotoId: $scope.foto._id}, $scope.foto,
				function() {
					$scope.mensagem = `Foto ${$scope.foto.titulo} alterada com sucesso`;
					$scope.formulario.$setPristine();
				},
				function(erro) {
					console.log(erro);
					console.log('Não foi possível alterar a foto');
					$scope.mensagem = 'Não foi possível cadastrar a foto';
				});
		} else {
			recursoFoto.save($scope.foto,
				function() {
					$scope.foto = {};
					$scope.mensagem = 'Foto cadastrada com sucesso';
					$scope.formulario.$setPristine();
				},
				function(erro) {
					console.log(erro);
					console.log('Não foi possível cadastrar a foto');
					$scope.mensagem = 'Não foi possível cadastrar a foto';
				});
		}
	};
});