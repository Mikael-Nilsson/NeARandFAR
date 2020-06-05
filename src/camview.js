Vue.component('camview', async (resolve, reject) => {
    console.log('1. calling getLocation from app');

    
    const position = await getLocation();

    console.log('4. position on new site: ', position);
    
    resolve({
        template: `
        <div>
            <a-text value="This content will always face you." look-at="[camera]"
                scale="60 60 60" gps-entity-place="latitude: 59.2927; longitude: 18.0505;"></a-text>

            <!--<a-text value="Syns det här?" look-at="[camera]" scale="500 5000 500" gps-entity-place="latitude: 59.292314; longitude: 18.050335;"></a-text>-->
            <!--<a-text value="Hej Tommy!" look-at="[camera]" scale="100 100 100" gps-entity-place="latitude: 59.188992; longitude: 17.609069;"></a-text>-->
            <a-camera gps-camera rotation-reader> </a-camera>
        </div>
        `
    });

});