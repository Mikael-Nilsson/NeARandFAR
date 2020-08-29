let conversationService = {
  getConversation: function (id) {
    return this.nodes.filter(c => c.id === id);
  },

  // * This only allows for one active conversation per NPC at a time. If we need more, we will have to change this.
  updateActiveConversationNode: function(NPC, nodeId, relationship) {

    let currentNode = this.currentNodes.filter(node => node.npc === NPC);

    if(currentNode.length > 0) {
      currentNode.forEach(node => {
        node.relationship = relationship;
        node.id = nodeId;
      });
    }
  },

  getActiveConversationNode: function() {

    // TODO: If no activeNPC, no conversation
    if(NPCservice.getNPCs(globalState.activeNPC)) {
      const currentNodeInfo = this.currentNodes.filter(n => n.NPC === globalState.activeNPC)[0];
      console.log('found info about nodes', currentNodeInfo, ' for NPC ', globalState.activeNPC);
      let currentNode = null;


      if(currentNodeInfo) {
        currentNode = this.nodes.filter(n => n.id === currentNodeInfo.id)[0];
      } else { 
        // No conversation started with this NPC
        const conversationId = 0;
        currentNode = {
          NPC: globalState.activeNPC,
          relationship: 0,
          id: NPCservice.getNPCs(globalState.activeNPC).conversationStart
        };

        this.currentNodes.push(currentNode);
      }

      // TODO: filtering out the relationship-unrelated answers
      return currentNode;
    }
  },
  
  currentNodes: [
    {
      NPC: 0,
      relationship: 1,
      id: 0
    }
  ],

  // TODO: Move to backend
  nodes: [
    {
      id: 0,
      line: 'Hello there!',
      replies: [
        {
          line: 'General Kenobi?',
          next: [
            {
              id: 1
            }
          ]
        },
        {
          line: 'Well hello there, who are you?',
          next: [
            {
              id: 1
            }
          ]
        },
        {
          line: 'Eww a rat!',
          next: []
        }
      ]
    },
    {
      id: 1,
      line: `I'm Scrat, appointed diplomat of the Svedmyra rat clan. We need your help.`
    },
    {
      id: 12,
      line: "Bleh, it's you",
      replies: [
        {
          line: "Yeah no, still not talking to rats",
          effect: -1,
          next: [
            {
              relation: [-10, 0],
              id: 15
            }
          ]
        }
      ]
    },
    {
      id: 13,
      line: "Oh, hey!",
      replies: [
        {
          relation: [-10, -1],
          line: "Yeah hi, I wanted to apologize for before",
          effect: 1,
          next: [
            {
              id: 16
            }
          ]
        }
      ]
    },
    {
      id: 14,
      line: "Hey, nice to c u!",
      replies: [
        {
          line: "Hi",
          next: [
            {
              id: 16
            }
          ]
        }
      ]
    },
    {
      id: 15,
      line: "Y u so mean? ;("
    },
    {
      id: 16,
      line: "I do still need your help you know"
    }
  ]
};