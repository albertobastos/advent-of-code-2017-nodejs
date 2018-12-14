console.time("d01");
const rl = require("./utils").getInputRL("d01");

function programReadLine(rl) {
  let input; // array with all numbers
  rl.on("line", line => {
    input = line.split("").map(Number);
  });

  rl.on("close", () => {
    console.log("Answer (part I):", runSum(input, 1));
    console.log("Answer (part II):", runSum(input, input.length / 2));

    console.timeEnd("d01");
  });
}

function runSum(input, offsetComparison) {
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    let inext = (i + offsetComparison) % input.length;
    if (input[i] === input[inext]) {
      sum += input[i];
    }
  }
  return sum;
}

programReadLine(rl);
