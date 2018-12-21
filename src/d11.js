console.time("d11");
const rl = require("./utils").getInputRL("d11");

let STEPS;

const DIRECTIONS = ["n", "s", "ne", "nw", "se", "sw"];

/*
  \ n  /
nw +--+ ne
  /    \
-+      +-
  \    /
sw +--+ se
  / s  \
*/

function programReadLine(rl) {
  rl.on("line", line => {
    STEPS = line.split(",");
  });

  rl.on("close", () => {
    console.log("Answer (part I):", runPart1(STEPS));
    console.log("Answer (part II):", runPart2(STEPS));
    console.timeEnd("d11");
  });
}

function runPart1(ALL_STEPS) {
  let steps = [...ALL_STEPS];
  while (stepsReduce(steps)) {
    continue;
  }
  return steps.length;
}

function runPart2(ALL_STEPS) {
  // https://www.redblobgames.com/grids/hexagons/
  let x = (y = z = 0);
  let maxDistance = -Infinity;
  ALL_STEPS.forEach(step => {
    switch (step) {
      case "n":
        y++;
        z--;
        break;
      case "s":
        y--;
        z++;
        break;
      case "ne":
        x++;
        z--;
        break;
      case "se":
        x++;
        y--;
        break;
      case "nw":
        x--;
        y++;
        break;
      case "sw":
        x--;
        z++;
        break;
    }
    maxDistance = Math.max(maxDistance, (Math.abs(x) + Math.abs(y) + Math.abs(z)) / 2);
  });

  return maxDistance;
}

function stepsReduce(steps) {
  let exists = DIRECTIONS.reduce((acc, direction) => {
    acc[direction] = steps.indexOf(direction) > -1;
    return acc;
  }, {});

  if (exists["n"] && exists["s"]) {
    transform(steps, "n", "s");
    return true;
  }
  if (exists["n"] && exists["se"]) {
    transform(steps, "n", "se", "ne");
    return true;
  }
  if (exists["n"] && exists["sw"]) {
    transform(steps, "n", "sw", "nw");
    return true;
  }
  if (exists["ne"] && exists["sw"]) {
    transform(steps, "ne", "sw");
    return true;
  }
  if (exists["ne"] && exists["s"]) {
    transform(steps, "ne", "s", "se");
    return true;
  }
  if (exists["ne"] && exists["nw"]) {
    transform(steps, "ne", "nw", "n");
    return true;
  }
  if (exists["nw"] && exists["se"]) {
    transform(steps, "nw", "se");
    return true;
  }
  if (exists["nw"] && exists["s"]) {
    transform(steps, "nw", "s", "sw");
    return true;
  }
  if (exists["se"] && exists["sw"]) {
    transform(steps, "se", "sw", "s");
    return true;
  }

  return false;
}

function transform(steps, remove1, remove2, add) {
  steps.splice(steps.indexOf(remove1), 1);
  steps.splice(steps.indexOf(remove2), 1);
  if (add) steps.push(add);
}

programReadLine(rl);
