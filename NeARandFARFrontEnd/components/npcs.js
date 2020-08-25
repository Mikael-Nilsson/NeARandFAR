const NPCservice = {
    position: {},
    activeConversationNode: 0,
    visibleDistanceLat: 0.0001,
    visibleDistanceLon: 0.0003,
    
    getNPCs: function (id, position) {
        if(id) {
            return this.NPCs[id];
        } else if(position) {
            return this.NPCs.filter(npc => {
                return npc.position.lat < position.coords.latitude + this.visibleDistanceLat && 
                    npc.position.lat > position.coords.latitude - this.visibleDistanceLat &&
                    npc.position.lon < position.coords.longitude + this.visibleDistanceLon && 
                    npc.position.lon > position.coords.longitude - this.visibleDistanceLon
            });
        }
    },


    NPCs: [
        {
            geometry: 'text',
            scale: '40 40 40',
            conversationId: 0,
            position: {
                lat: 59.29260,
                lon: 18.05047
            }
        },
    ]
}