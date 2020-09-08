const assetService = {
    
    getData: async function() {
        // TODO: Save common url somewhere
        const _assets = await dataService.get('https://43tkyvf00i.execute-api.eu-north-1.amazonaws.com/dev/assets');
        this.assets = JSON.parse(JSON.parse(_assets)); // ! Something is iffy as we need to json-parse doubly. The culprit needs to be found.
        //console.log(this.assets);
        return this.assets;
        // return this.assets;
    },

    // TODO: Move to backend
    //assets: [
    //    {
    //        geometry: 'text',
    //        value: `asset`,
    //        scale: '40 40 40',
    //        position: {
    //            lat: 59.293000,
    //            lon: 18.050400
    //        },
    //        conversationId: 1
    //    },
    //    {
    //        geometry: 'text',
    //        scale: '40 40 40',
    //        value: 'Hej hopp i trädgårn!',
    //        conversationId: 4,
    //        position: {
    //          lat: 59.220337, 
    //          lon: 17.642542
    //        },
    //    },
    //     {
    //         geometry: 'text',
    //         value: 'assets work!',
    //         scale: '30 30 30',
    //         position: {
    //             lat: 59.293010,
    //             lon: 18.050510
    //         }
    //     },
    //     {
    //         geometry: 'text',
    //         value: 'tunnel under åbyvägen',
    //         scale: '300 300 300',
    //         position: {
    //             lat: 59.292764,
    //             lon: 18.033877
    //         }
    //     }
    //],

    
};

const getData = async (id, connection) => {
    console.log('in getData');
    // assetService.assets = [
       

    // ];

    return [
        {
            geometry: 'text',
            value: `Hi there!`,
            scale: '40 40 40',
            conversationId: 3,
            position: {
                lat: 59.293000,
                lon: 18.050500
            }
        }
    ];
}



