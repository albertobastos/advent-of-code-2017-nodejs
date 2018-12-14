console.time("d07");
const rl = require("./utils").getInputRL("d07");

function programReadLine(rl) {
  let programs = {};
  let lineRegex = /(\w+) \((\d+)\)( -> )?(.*)?/;
  rl.on("line", line => {
    let match = lineRegex.exec(line);
    if (!match) throw new Error("Regex error");
    programs[match[1]] = {
      id: match[1],
      weight: Number(match[2]),
      sumWeight: null,
      children: match[4] ? match[4].split(", ") : [],
      parent: null,
      siblings: []
    };
  });

  rl.on("close", () => {
    // turn references into real nodes
    Object.keys(programs).forEach(program => {
      programs[program].children = programs[program].children.map(c => programs[c]);
      programs[program].children.forEach(c => (c.parent = programs[program]));
    });

    // get root
    let root = programs[Object.keys(programs).find(program => !programs[program].parent)];

    addSumWeights(root);

    console.log("Answer (part I):", root.id);
    console.log("Answer (part II):", findUnbalanced(root).expected);

    console.timeEnd("d07");
  });
}

function addSumWeights(node) {
  node.children.forEach(c => addSumWeights(c));
  node.sumWeight = node.weight + node.children.map(c => c.sumWeight).reduce((acc, curr) => acc + curr, 0);
}

function findUnbalanced(root) {
  let node = root;
  while (true) {
    let childrenSumWeights = node.children.reduce((acc, c) => {
      acc[c.sumWeight] = acc[c.sumWeight] || 0;
      acc[c.sumWeight]++;
      return acc;
    }, {});
    if (Object.keys(childrenSumWeights).length === 1) {
      // if all children have the same accumulated weight, then the current node is the unbalanced one
      // check the sumWeight of a siblings to know how to correct our own weight
      let expectedSumWeight = node.parent.children.filter(c => c.id !== node.id)[0].sumWeight;
      let diff = expectedSumWeight - node.sumWeight;
      let expectedWeight = node.weight + diff;
      return { node: node.id, expected: expectedWeight };
    } else {
      // if one children accumulated weight differs from its siblings, then that is the one that needs to be checked
      let differentWeight = Number(Object.keys(childrenSumWeights).find(w => childrenSumWeights[w] === 1));
      node = node.children.find(c => c.sumWeight === differentWeight);
    }
  }
}

function isBalanced(node) {
  return node.children.length === 0 || new Set(node.children.map(c => c.sumWeight)).size === 1;
}

programReadLine(rl);
