const conversations = {
  currentNodes: [
    {
      NPC: 1,
      relationship: -2,
      id: 15
    }
  ],

  nodes: [
    {
    id: 12,
    line: "Bleh, it's you",
    replies: [
      {
      line: "Yeah no, still not talking to rats",
      effect: -1,
      next: [
        {
          relation: [-10,0],
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
  
}
