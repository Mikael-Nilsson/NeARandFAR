const assetService = {

  getData: async function () {
    // TODO: Save common url somewhere
    const _assets = await dataService.get('https://43tkyvf00i.execute-api.eu-north-1.amazonaws.com/dev/entities');
    this.assets = JSON.parse(_assets);
    return this.assets;
  },

};


