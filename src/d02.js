console.time("d02");
const rl = require("./utils").getInputRL("d02");

//const NUMBER_SEPARATOR = " ";
const NUMBER_SEPARATOR = "\t";

function programReadLine(rl) {
  let sumPart1 = 0;
  let sumPart2 = 0;
  rl.on("line", line => {
    let numbers = line.split(NUMBER_SEPARATOR).map(Number);
    sumPart1 += Math.max(...numbers) - Math.min(...numbers);
    sumPart2 += numbers.map(n => n / numbers.find(n2 => n !== n2 && n % n2 === 0)).find(x => x);
  });

  rl.on("close", () => {
    console.log("Answer (part I):", sumPart1);
    console.log("Answer (part II):", sumPart2);

    console.timeEnd("d02");
  });
}

programReadLine(rl);
