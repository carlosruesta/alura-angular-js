angular.module('minhasDiretivas', [])

	.directive('meuPainel', function () {
		var ddo = {};

		/**
		 *  qual é a restricao de uso desse cara.
		 *  Sera usado com tag?, como atributo? como comentario?
		 *      Attribute => <div meu-painel></div>
		 *      Element   => <meu-painel></meu-painel>
		 */
		ddo.restrict = 'AE'     // A = attribute, E = element

		/**
		 * Para que a directiva seja issolada e reutilizavel
		 * ela precisa ter um scope proprio
		 */
		ddo.scope = {
			titulo: '@titulo',      // @ => parametro passado como valor, como string
		};

		/**
		 * Transclude permite que o componente tenha elementos filhos e eles sejam
		 * reconhecidos e renderizados pelo DOM.
		 * Precisa adicionar a diretiva ng-transclude no elemento pai que receberá os filhos
		 */
		ddo.transclude = true;

		/**
		 * Define o template HMTL do componente/directiva dentro da propria diretiva js
		 * É uma das formas, a outra forma seria utilizar a varivel templateUrl (ver abaixo)
		 */

		// ddo.template =
		// 	'<div class="panel panel-default">'
		// 	+   '   <div class="panel-heading">'
		// 	+   '        <h3 class="panel-title text-center">{{titulo}}</h3> '
		// 	+   '   </div>'
		// 	+   '   <div class="panel-body" ng-transclude>'
		// 	+   '   </div>'
		// 	+   '</div>';

		/**
		 * Define o caminho do template HMTL do componente/directiva
		 * Aqui separa codigo JS de código HTML (boa pratica)
		 */
		ddo.templateUrl = 'js/directives/meu-painel.html';

		/**
		 * sempre precisa retornar como padrao
		 * é a diretiva configurada e pronta para ser usada
		 * ddo => directive definition object
		 */
		return ddo;
	})

	.directive('minhaFoto', function () {
		return {
			restrict: 'AE',
			scope: {
				titulo: '@titulo',
				url: '@url',
			},
			templateUrl: 'js/directives/minha-foto.html'
		};
	})

	.directive('meuBotaoPerigo', function() {
		return {
			restrict: 'E',
			scope: {
				nome: '@',
				acao : '&'
			},
			template: '<button class="btn btn-danger btn-block" ng-click="acao()">{{nome}}</button>'
		};
	})

	.directive('meuFocus', function() {
		var ddo = {};
		ddo.restrict = "A";
		ddo.link = function(scope, element) {
			scope.$on('fotoCadastrada', function() {
				element[0].focus();
			});
		};
		return ddo;
	})

	.directive('meusTitulos', function() {
		var ddo = {};
		ddo.restrict = 'E';
		ddo.template = '<ul><li ng-repeat="titulo in titulos">{{titulo}}</li></ul>';
		ddo.controller = function($scope, recursoFoto) {
			recursoFoto.query(function(fotos) {
				$scope.titulos = fotos.map(function(foto) {
					return foto.titulo;
				});
			});
		};
		return ddo;
	});

