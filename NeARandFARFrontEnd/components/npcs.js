const NPCservice = {
  position: null,
  activeConversationNode: 0,
  visibleDistanceLat: 0.0001,
  visibleDistanceLon: 0.0003,

  getNPCs: function (id, position) {
    if (id != null && id != undefined) {
      console.log('returning', this.NPCs[id]);
      return this.NPCs[id];
    } else if (position) {
      return this.NPCs.filter(npc => {
        return npc.position.lat < position.coords.latitude + this.visibleDistanceLat &&
          npc.position.lat > position.coords.latitude - this.visibleDistanceLat &&
          npc.position.lon < position.coords.longitude + this.visibleDistanceLon &&
          npc.position.lon > position.coords.longitude - this.visibleDistanceLon
      });
    }

  },

  // TODO: Move to backend
  NPCs: [
    {
      geometry: 'text',
      scale: '40 40 40',
      conversationStart: 0,
      position: {
        lat: 59.29260,
        lon: 18.05047
      }
    },
    {
      geometry: 'text',
      scale: '40 40 40',
      conversationStart: 13,
      position: {
        lat: 59.29250,
        lon: 18.05027
      }
    },
    {
      geometry: 'sphere', // TODO: Find nice animated 3dmodel
      name: 'Scrat',
      scale: '40 40 40',
      conversationStart: 0,
      position: {
        lat: 59.19718,
        lon: 17.62594
      }
    },
  ]
}