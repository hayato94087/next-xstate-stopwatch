import { assign, fromCallback, setup } from "xstate";

/* eslint-plugin-xstate-include */

type StopwatchContext = {
  elapsed: number;
};

type StopwatchEvent =
  | { type: "START" }
  | { type: "STOP" }
  | { type: "RESET" }
  | { type: "TICK" };

export const stopwatchMachine = setup({
  types: {} as {
    context: StopwatchContext;
    events: StopwatchEvent;
  },
  actors: {
    ticks: fromCallback(({ sendBack }) => {
      const interval = setInterval(() => {
        sendBack({ type: "TICK" });
      }, 10);
      return () => clearInterval(interval);
    }),
  },
}).createMachine({
  id: "stopwatch",
  initial: "stopped",
  context: {
    elapsed: 0,
  },
  states: {
    stopped: {
      on: {
        START: "running",
      },
    },
    running: {
      invoke: {
        src: "ticks",
      },
      on: {
        TICK: {
          actions: assign({
            elapsed: ({ context }) => context.elapsed + 1,
          }),
        },
        STOP: "stopped",
      },
    },
  },
  on: {
    RESET: {
      actions: assign({
        elapsed: 0,
      }),
      target: ".stopped",
    },
  },
});