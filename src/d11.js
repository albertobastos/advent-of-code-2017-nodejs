console.time("d11");
const rl = require("./utils").getInputRL("d11");

let STEPS;

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
    console.log("Answer (part I):");
    console.log("Answer (part II):");
    console.timeEnd("d11");
  });
}

programReadLine(rl);
