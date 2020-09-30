console.log('defining routes');

const routes = [
    {
      path: '/', 
      name: 'home'
    },
    {
        path: '/app',
        name: 'app',
        component: appView
    },
    {
        path: '/log',
        name: 'log',
        component: logView
    },
    {
        path: '/dash',
        name: 'dash',
        component: dashView
    },
    {
        path: '/cam',
        name: 'cam',
        component: frameView
    },
    {
        path: '/scene',
        name: 'scene',
        component: sceneView
    },
    {
        path: '/map',
        name: 'map',
        component: mapView
    },
    {
        path: '/login',
        name: 'login',
        component: loginView
    },
    {
        path: '/dashcam',
        name: 'dashcam',
        components: {
            up: frameView,
            down: dashView
        },
        props: true
    },
    {
        path: '/dashmap',
        name: 'dashmap',
        components: {
            up: mapView,
            down: dashView
        },
        props: true
    },
    {
        path: '/mapcam',
        name: 'mapcam',
        components: {
            up: frameView,
            down: mapView
        },
        props: true
    }
];
