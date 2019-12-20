import initCustomElements from './src/initCustomElements.js';
import Router from './src/Router/Router.js';
import ApiTodo from './src/Api/TodoApi.js';

toastr.options = {
	"closeButton": true,
	"debug": false,
	"newestOnTop": true,
	"progressBar": false,
	"positionClass": "toast-bottom-right",
	"preventDuplicates": false,
	"onclick": null,
	"showDuration": "300",
	"hideDuration": "300",
	"timeOut": "2000",
	"extendedTimeOut": "1000",
	"showEasing": "swing",
	"hideEasing": "linear",
	"showMethod": "fadeIn",
	"hideMethod": "fadeOut"
}

initCustomElements();

const root = document.getElementById('root');

const router = new Router(root);

window.addEventListener('changeRoute', event =>	router.changeRoute(event.detail.route));

ApiTodo.checkAuth()
	.then(res => {
		if (res.isAuthorization) {
			window.dispatchEvent(new CustomEvent('changeRoute', { detail: { route: 'todolist' } }));
		} else {
			window.dispatchEvent(new CustomEvent('changeRoute', { detail: { route: 'login' } }));
		}
	});