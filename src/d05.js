console.time("d05");
const rl = require("./utils").getInputRL("d05");

function programReadLine(rl) {
  let initialCpu = {
    instr: [],
    current: 0,
    steps: 0
  };
  rl.on("line", line => {
    initialCpu.instr.push(Number(line));
  });

  rl.on("close", () => {
    let cpu = JSON.parse(JSON.stringify(initialCpu));
    while (cpu.current >= 0 && cpu.current < cpu.instr.length) {
      jump = cpu.instr[cpu.current];
      cpu.instr[cpu.current] = jump + 1;
      cpu.current += jump;
      cpu.steps++;
    }

    console.log("Answer (part I):", cpu.steps);

    cpu = JSON.parse(JSON.stringify(initialCpu));
    while (cpu.current >= 0 && cpu.current < cpu.instr.length) {
      jump = cpu.instr[cpu.current];
      if (jump >= 3) {
        cpu.instr[cpu.current] = jump - 1;
      } else {
        cpu.instr[cpu.current] = jump + 1;
      }
      cpu.current += jump;
      cpu.steps++;
    }

    console.log("Answer (part II):", cpu.steps);
    console.timeEnd("d05");
  });
}

programReadLine(rl);
