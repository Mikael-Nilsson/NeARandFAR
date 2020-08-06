console.log('defining routes');

const routes = [
    {
      path: '/', 
      name: 'home'
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
