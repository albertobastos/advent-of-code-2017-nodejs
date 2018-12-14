console.time("d09");
const rl = require("./utils").getInputRL("d09");

function programReadLine(rl) {
  let inputs = [];
  rl.on("line", line => {
    inputs.push(line);
  });

  rl.on("close", () => {
    inputs.forEach((input, index) => {
      console.log(`Input #${index + 1}:`);
      let result = run(input);
      console.log("Answer (part I):", result.totalScore);
      console.log("Answer (part II):", result.garbageRemoved);
      console.log();
    });

    console.timeEnd("d09");
  });
}

function run(input) {
  let data = {
    deepestGroup: -1,
    totalScore: 0,
    garbageRemoved: 0
  };

  let ignoreNext = false;
  let currentDepth = 0;
  let inGarbage = false;

  for (let i = 0; i < input.length; i++) {
    let curr = input.charAt(i);
    if (ignoreNext) {
      ignoreNext = false;
      continue;
    }
    if (inGarbage) {
      switch (curr) {
        case "!":
          ignoreNext = true;
          continue;
        case ">":
          inGarbage = false;
          continue;
        default:
          data.garbageRemoved++;
          continue; // garbage keeps going
      }
    } else {
      switch (curr) {
        case "{":
          currentDepth++;
          continue;
        case "}":
          data.totalScore += currentDepth;
          currentDepth--;
          continue;
        case "<":
          inGarbage = true;
          continue;
        case ",":
          continue;
        default:
          throw new Error("Unexpected character: " + c);
      }
    }
  }

  return data;
}

programReadLine(rl);
