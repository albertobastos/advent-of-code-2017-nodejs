console.time("d08");
const rl = require("./utils").getInputRL("d08");

function programReadLine(rl) {
  let state = {}; // register: value
  let historyMax = null;

  rl.on("line", line => {
    let [reg, op, n, _, condReg, condOp, condN] = line.split(" ");
    let regValue = (state[reg] = state[reg] || 0);
    let condRegValue = (state[condReg] = state[condReg] || 0);
    let cond = eval(`${condRegValue} ${condOp} ${condN}`); // thanks, eval!
    if (cond) {
      regValue = state[reg] = regValue + Number(n) * (op === "inc" ? 1 : -1);
      historyMax = Math.max(historyMax, regValue);
    }
  });

  rl.on("close", () => {
    console.log("Answer (part I):", Math.max(...Object.values(state)));
    console.log("Answer (part II):", historyMax);

    console.timeEnd("d08");
  });
}

programReadLine(rl);
