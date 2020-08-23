const assetService = {
    assets: {},
    getData: async () => {
        // TODO: Save common url somewhere
        const assets = await dataService.get('https://43tkyvf00i.execute-api.eu-north-1.amazonaws.com/dev/assets');
        // console.log(assets);
    }
};

const getData = async (id, connection) => {
    console.log('in getData');
    assetService.assets = [
        {
            geometry: 'text',
            value: `Hi there!`,
            scale: '40 40 40',
            conversationId: 3,
            position: {
                lat: 59.293000,
                lon: 18.050500
            }
        },
        {
            geometry: 'text',
            scale: '40 40 40',
            value: 'Am I close?',
            conversationId: 4,
            position: {
              lat: gpsService.position.coords.latitude + 0.0004,
              lon: gpsService.position.coords.longitude + 0.005
            },
        },
        // {
        //     geometry: 'text',
        //     value: 'assets work!',
        //     scale: '30 30 30',
        //     position: {
        //         lat: 59.293010,
        //         lon: 18.050510
        //     }
        // },
        // {
        //     geometry: 'text',
        //     value: 'tunnel under åbyvägen',
        //     scale: '300 300 300',
        //     position: {
        //         lat: 59.292764,
        //         lon: 18.033877
        //     }
        // }

    ];

    return assetService.assets;
}



