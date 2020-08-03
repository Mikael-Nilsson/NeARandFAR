const getData = async (id, connection) => {
    console.log('in getData');
    return [
        {
            geometry: 'text',
            value: `.59.293000; 18.050500`,
            scale: '40 40 40',
            position: {
                lat: 59.293000,
                lon: 18.050500
            }
        } ,
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
}



