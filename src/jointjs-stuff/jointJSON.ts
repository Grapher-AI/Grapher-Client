import { z } from "zod";

const typeEnum = z.enum(['customShapes.BeginShape','customShapes.EndShape','customShapes.ProcedureShape','customShapes.ConditionShape','customShapes.ConditionOuterLink','customShapes.DefaultLink']);

export const cells = z.object({
  cells: z.array(
    z.object({
      id: z.number(),
      type: typeEnum,
      text: z.string(),
      source: z.object({
        id: z.string(),
      }),
      target: z.object({
        id: z.string(),
      }),
    }).partial({source: true, target: true})
  )
})

export function parseResponse(cells: Array<any>) {
  const result = []
  for(const cell of cells) {
    const newCell: any = {};
    newCell.z = cell.id;
    newCell.id = cell.id;
    newCell.type = cell.type;

    if(cell.type === 'customShapes.DefaultLink' || cell.type === 'customShapes.ConditionOuterLink') {
      newCell["labels"] = [
        {
          "attrs": {
            "text": {
              "text": cell.type === 'customShapes.ConditionOuterLink' ? cell.text : null,
            }
          }
        }
      ];

      newCell['source'] = cell.source;
      newCell['target'] = cell.target;

      newCell["router"] = {
        "name": "rightAngle",
          "args": {
          "margin": 25,
            "sourceDirection": "bottom",
            "targetDirection": "left"
        }
      };

      newCell["connector"] = {
        "name": "straight",
          "args": {
          "cornerType": "line"
        }
      };

      newCell["attrs"] = {}
      result.push(newCell);
      continue;
    }

    newCell["attrs"] = {
      "label": {
        "text": cell.text || 'n/a'
      }
    }
    result.push(newCell);
  }
  return {cells: result}
}

const testResponnce = [
  {
    "id": "1",
    "type": "customShapes.Begin",
    "text": "Start Process of Making a Decision on a New Project Proposal.",
    "source": {
      "id": "1"
    },
    "target": {
      "id": "2"
    }
  },
  {
    "id": "2",
    "type": "customShapes.Procedure",
    "text": "Gather all necessary information and project details.",
    "source": {
      "id": "2"
    },
    "target": {
      "id": "3"
    }
  },
  {
    "id": "3",
    "type": "customShapes.Condition",
    "text": "Is the project aligned with strategic goals?",
    "source": {
      "id": "3"
    },
    "target": {
      "id": "4"
    }
  },
  {
    "id": "4",
    "type": "customShapes.conditionOuterLink",
    "text": "Yes",
    "source": {
      "id": "3"
    },
    "target": {
      "id": "5"
    }
  },
  {
    "id": "5",
    "type": "customShapes.Procedure",
    "text": "Conduct a feasibility study.",
    "source": {
      "id": "5"
    },
    "target": {
      "id": "6"
    }
  },
  {
    "id": "6",
    "type": "customShapes.Condition",
    "text": "Is the project feasible and sustainable?",
    "source": {
      "id": "6"
    },
    "target": {
      "id": "7"
    }
  },
  {
    "id": "7",
    "type": "customShapes.conditionOuterLink",
    "text": "Yes",
    "source": {
      "id": "6"
    },
    "target": {
      "id": "11"
    }
  },
  {
    "id": "11",
    "type": "customShapes.Procedure",
    "text": "Create a project plan and allocate resources.",
    "source": {
      "id": "11"
    },
    "target": {
      "id": "12"
    }
  },
  {
    "id": "12",
    "type": "customShapes.Procedure",
    "text": "Get approval from management.",
    "source": {
      "id": "12"
    },
    "target": {
      "id": "13"
    }
  },
  {
    "id": "13",
    "type": "customShapes.End",
    "text": "Start the project.",
    "source": {
      "id": "13"
    },
    "target": {
      "id": "13"
    }
  },
  {
    "id": "8",
    "type": "customShapes.conditionOuterLink",
    "text": "No",
    "source": {
      "id": "3"
    },
    "target": {
      "id": "9"
    }
  },
  {
    "id": "9",
    "type": "customShapes.End",
    "text": "Reject the proposal.",
    "source": {
      "id": "9"
    },
    "target": {
      "id": "9"
    }
  },
  {
    "id": "10",
    "type": "customShapes.conditionOuterLink",
    "text": "No",
    "source": {
      "id": "6"
    },
    "target": {
      "id": "14"
    }
  },
  {
    "id": "14",
    "type": "customShapes.End",
    "text": "Re-evaluate or discard the proposal.",
    "source": {
      "id": "14"
    },
    "target": {
      "id": "14"
    }
  }
]

const test =[
  {
    "position": {
      "x": 0,
      "y": 75
    },
    "size": {
      "width": 100,
      "height": 100
    },
    "angle": 0,
    "type": "customShapes.Begin",
    "id": "400f6357-fafc-4531-a6b0-228c3708ce4c",
    "z": 1,
    "attrs": {}
  },
  {
    "position": {
      "x": 150,
      "y": 75
    },
    "size": {
      "width": 100,
      "height": 100
    },
    "angle": 0,
    "type": "customShapes.Procedure",
    "id": "5a4e154c-0263-4b1a-821b-e88f89683623",
    "z": 2,
    "attrs": {
      "label": {
        "text": "Process one"
      }
    }
  },
  {
    "position": {
      "x": 300,
      "y": 75
    },
    "size": {
      "width": 100,
      "height": 100
    },
    "angle": 0,
    "type": "customShapes.Condition",
    "id": "2552d897-3cbe-4965-9ce3-93f3f66dc3cb",
    "z": 3,
    "attrs": {
      "label": {
        "text": "Condition one"
      }
    }
  },
  {
    "position": {
      "x": 450,
      "y": 0
    },
    "size": {
      "width": 100,
      "height": 100
    },
    "angle": 0,
    "type": "customShapes.Procedure",
    "id": "7ef1698f-2436-458c-ba2c-3d4bc124f968",
    "z": 4,
    "attrs": {
      "label": {
        "text": "Process two"
      }
    }
  },
  {
    "position": {
      "x": 450,
      "y": 150
    },
    "size": {
      "width": 100,
      "height": 100
    },
    "angle": 0,
    "type": "customShapes.Procedure",
    "id": "910110a6-c597-4e76-81db-54cc7b00b8aa",
    "z": 5,
    "attrs": {
      "label": {
        "text": "Process three"
      }
    }
  },
  {
    "position": {
      "x": 600,
      "y": 75
    },
    "size": {
      "width": 100,
      "height": 100
    },
    "angle": 0,
    "type": "customShapes.End",
    "id": "292d5ec8-fe4e-40d3-b11b-f897df815c97",
    "z": 6,
    "attrs": {}
  },
  {
    "type": "customShape.defaultLink",
    "source": {
      "id": "400f6357-fafc-4531-a6b0-228c3708ce4c"
    },
    "target": {
      "id": "5a4e154c-0263-4b1a-821b-e88f89683623"
    },
    "id": "ba5c8f3f-f344-4f48-9cd7-b2b2478f16df",
    "z": 7,
    "router": {
      "name": "orthogonal"
    },
    "connector": {
      "name": "straight",
      "args": {
        "cornerType": "line"
      }
    },
    "attrs": {}
  },
  {
    "type": "customShape.defaultLink",
    "source": {
      "id": "5a4e154c-0263-4b1a-821b-e88f89683623"
    },
    "target": {
      "id": "2552d897-3cbe-4965-9ce3-93f3f66dc3cb"
    },
    "id": "01a05329-6064-4423-9cc3-b3bf81ef0c7f",
    "z": 8,
    "router": {
      "name": "orthogonal"
    },
    "connector": {
      "name": "straight",
      "args": {
        "cornerType": "line"
      }
    },
    "attrs": {}
  },
  {
    "type": "customShape.conditionOuterLink",
    "source": {
      "id": "2552d897-3cbe-4965-9ce3-93f3f66dc3cb"
    },
    "target": {
      "id": "7ef1698f-2436-458c-ba2c-3d4bc124f968"
    },
    "id": "c3f37d87-ade7-4ea2-9749-c5fb759eed91",
    "z": 9,
    "router": {
      "name": "rightAngle",
      "args": {
        "margin": 25,
        "sourceDirection": "top",
        "targetDirection": "left"
      }
    },
    "labels": [
      {
        "attrs": {
          "text": {
            "text": "Yes"
          }
        }
      }
    ],
    "connector": {
      "name": "straight",
      "args": {
        "cornerType": "line"
      }
    },
    "attrs": {}
  },
  {
    "type": "customShape.conditionOuterLink",
    "source": {
      "id": "2552d897-3cbe-4965-9ce3-93f3f66dc3cb"
    },
    "target": {
      "id": "910110a6-c597-4e76-81db-54cc7b00b8aa"
    },
    "id": "db361c0c-b706-4af2-b0e9-b71c66269f0d",
    "z": 10,
    "labels": [
      {
        "attrs": {
          "text": {
            "text": "No"
          }
        }
      }
    ],
    "router": {
      "name": "rightAngle",
      "args": {
        "margin": 25,
        "sourceDirection": "bottom",
        "targetDirection": "left"
      }
    },
    "connector": {
      "name": "straight",
      "args": {
        "cornerType": "line"
      }
    },
    "attrs": {}
  },
  {
    "type": "customShape.defaultLink",
    "source": {
      "id": "7ef1698f-2436-458c-ba2c-3d4bc124f968"
    },
    "target": {
      "id": "292d5ec8-fe4e-40d3-b11b-f897df815c97"
    },
    "id": "e8fa27a9-ce00-4d19-8f09-787abe81b225",
    "z": 11,
    "router": {
      "name": "orthogonal"
    },
    "connector": {
      "name": "straight",
      "args": {
        "cornerType": "line"
      }
    },
    "attrs": {}
  },
  {
    "type": "customShape.defaultLink",
    "source": {
      "id": "910110a6-c597-4e76-81db-54cc7b00b8aa"
    },
    "target": {
      "id": "292d5ec8-fe4e-40d3-b11b-f897df815c97"
    },
    "id": "71805e14-32ef-4c0d-8a9f-933f2db80895",
    "z": 12,
    "router": {
      "name": "orthogonal"
    },
    "connector": {
      "name": "straight",
      "args": {
        "cornerType": "line"
      }
    },
    "attrs": {}
  }
]
