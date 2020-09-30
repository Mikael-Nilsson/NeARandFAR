const assetService = {
    
    getData: async function() {
        // TODO: Save common url somewhere
        const _assets = await dataService.get('https://43tkyvf00i.execute-api.eu-north-1.amazonaws.com/dev/entities');
        this.assets = JSON.parse(_assets);
        return this.assets;
    },

};

//const getData = async (id, connection) => {
//    this.shared.log('in getData');
//    // assetService.assets = [
       

//    // ];

//    return [
//        {
//            geometry: 'text',
//            value: `Hi there!`,
//            scale: '40 40 40',
//            conversationId: 3,
//            position: {
//                lat: 59.293000,
//                lon: 18.050500
//            }
//        }
//    ];
//}



