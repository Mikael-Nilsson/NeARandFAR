console.log('defining routes');

const routes = [
    {
      path: '/', 
      name: 'home'
    },
    {
        path: '/dash',
        name: 'dash',
        component: dashView
    },
    {
        path: '/cam',
        name: 'cam',
        component: camView
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
            up: camView,
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
            up: camView,
            down: mapView
        },
        props: true
    }
];
