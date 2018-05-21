define [
	"base"
], (App) ->
	historyFileTreeController = ($scope, $element, $attrs) ->
		ctrl = @
		ctrl.handleEntityClick = (file) ->
			ctrl.onSelectedFileChange file: file
		return

	App.component "historyFileTree", {
		bindings:
			fileTree: "<"
			selectedPathname: "<"
			onSelectedFileChange: "&"
		controller: historyFileTreeController
		templateUrl: "historyFileTreeTpl"
	}