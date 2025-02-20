angular.module('alurapic').controller('FotoController', ['$scope', 'recursoFoto', '$routeParams', 'cadastroDeFotos',

	function($scope, recursoFoto, $routeParams, cadastroDeFotos) {

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
			if ($scope.formulario.$valid) {
				cadastroDeFotos.cadastrar($scope.foto)
					.then(function(dados) {
						$scope.mensagem = dados.mensagem;
						if (dados.inclusao) {
							$scope.foto = {};
							$scope.formulario.$setPristine();
						}
						$scope.focado = true;
					})
					.catch(function(erro) {
						$scope.mensagem = erro.mensagem;
					});
			}
		};
	}
]);