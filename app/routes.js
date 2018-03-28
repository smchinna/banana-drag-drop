// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from './utils/asyncInjectors';
import { combineReducers } from 'redux';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};
export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: '/',
      name:'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('./containers/Home/index'),
        ]);

        const renderRoute = loadModule(cb);
       
        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/tasty',
      name:'tasty',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
         // import('./containers/TastyPage/reducer'),
          //import('./containers/TastyPage/saga'),
          import('./containers/TastyPage/index'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
         // injectReducer('tasty',reducer.default),
          // injectSagas(sagas.default),
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path:'/sample',
      name:'sample',
      getComponent(nextState,cb) {
        const importModules = Promise.all([
          import('./sample/index')
        ]);
        const renderRoute = loadModule(cb);
        importModules.then(([component]) => {
          renderRoute(component);
        })
      }
    }
  ];
}
