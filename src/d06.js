console.time("d06");
const rl = require("./utils").getInputRL("d06");

function programReadLine(rl) {
  let memory = null;
  rl.on("line", line => {
    memory = line.split("\t").map(Number);
  });

  rl.on("close", () => {
    let result = processPart1(JSON.parse(JSON.stringify(memory)));
    console.log("Answer (part I):", result.steps);
    console.log("Answer (part II):", result.loopSize);
    console.timeEnd("d06");
  });
}

function redistribute(memory) {
  let blocks = Math.max(...memory);
  let index = memory.indexOf(blocks);

  memory[index] = 0;
  let i = (index + 1) % memory.length;
  for (let i = (index + 1) % memory.length; blocks > 0; i = (i + 1) % memory.length) {
    memory[i]++;
    blocks--;
  }
  return memory;
}

function processPart1(memory) {
  let history = [memory.join("-")];
  let steps = 0;
  let loopSize = null;
  let exit = false;
  while (!exit) {
    steps++;
    memory = redistribute(memory);
    let serialized = memory.join("-");
    let historyIndex = history.indexOf(serialized);
    if (historyIndex === -1) {
      // new combination, keep going
      history.push(serialized);
    } else {
      // already seen combination, infinite loop detected
      loopSize = steps - historyIndex;
      exit = true;
    }
  }
  return { steps, loopSize };
}

programReadLine(rl);
