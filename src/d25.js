console.time("d25");
const rl = require("./utils").getInputRL("d25");

function programReadLine(rl) {
  let regexes = {
    beginState: /Begin in state ([A-Z]+)/,
    checksumStep: /Perform a diagnostic checksum after ([0-9]+) steps./,
    stateStart: /In state ([A-Z]+):/,
    valueStart: /If the current value is ([0-9]+):/,
    valueToWrite: /Write the value ([0-9]+)./,
    cursorMove: /Move one slot to the ([a-z]+)/,
    nextState: /Continue with state ([A-Z]+)/
  };

  let machine = {
    initialState: null,
    checksumStep: null,
    states: {} // stateId => { values: currentValue => { newValue, moveDirection, newState } }
  };

  let parser = {
    currentState: null,
    currentValue: null
  };

  rl.on("line", line => {
    if (line.trim() === "") return; // empty line, just skip

    if ((match = regexes.beginState.exec(line))) {
      machine.initialState = match[1];
      return;
    }

    if ((match = regexes.checksumStep.exec(line))) {
      machine.checksumStep = Number(match[1]);
      return;
    }

    if ((match = regexes.stateStart.exec(line))) {
      parser.currentState = match[1];
      parser.currentValue = null;
      machine.states[parser.currentState] = { values: {} };
      return;
    }

    if ((match = regexes.valueStart.exec(line))) {
      parser.currentValue = Number(match[1]);
      machine.states[parser.currentState].values[parser.currentValue] = {};
      return;
    }

    // up to this point, the line must refer to a state and value feature
    let obj = machine.states[parser.currentState].values[parser.currentValue];

    if ((match = regexes.valueToWrite.exec(line))) {
      obj.newValue = Number(match[1]);
      return;
    }

    if ((match = regexes.cursorMove.exec(line))) {
      obj.cursorMove = match[1];
      return;
    }

    if ((match = regexes.nextState.exec(line))) {
      obj.newState = match[1];
      return;
    }

    console.log("WARNING", "Unparsed line:", line);
  });

  rl.on("close", () => {
    let runValues = [0];
    let runCursor = 0;
    let runState = machine.initialState;

    for (let i = 0; i < machine.checksumStep; i++) {
      let transition = machine.states[runState].values[runValues[runCursor]];

      runValues[runCursor] = transition.newValue;
      runState = transition.newState;
      runCursor = runCursor + (transition.cursorMove === "right" ? 1 : -1);

      if (runCursor === -1) {
        runValues = [0].concat(...runValues);
        runCursor = 0;
      } else if (runCursor === runValues.length) {
        runValues = runValues.concat(0);
      }

      //printState(i + 1, runState, runValues, runCursor);
    }

    let howMany1s = runValues.filter(value => value === 1).length;

    console.log("Answer (part I):", howMany1s);
    console.log("Answer (part II):", "TODO (not enough stars!)");

    console.timeEnd("d25");
  });
}

function printState(step, state, values, cursor) {
  let tmp = values.map((value, index) =>
    index === cursor ? `[${value}]` : value
  );
  console.log("" + step, "|", state, "|", tmp.join(" "));
}

programReadLine(rl);
