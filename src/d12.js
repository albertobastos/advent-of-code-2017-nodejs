console.time("d12");
const rl = require("./utils").getInputRL("d12");

function programReadLine(rl) {
  const lineRegex = /(\d+) <-> (.*)/;
  rl.on("line", line => {
    //
  });

  rl.on("close", () => {
    console.log("Answer (part I):");
    console.log("Answer (part II):");
    console.timeEnd("d12");
  });
}

programReadLine(rl);
