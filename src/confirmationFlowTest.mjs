import { createMachine, state, transition, interpret, invoke, reduce } from 'robot3';

async function deleteSomething() {
  // must return a promise
}

// transition(actionName, nextState)
// state(transition) or state(transition(1), transition(2))

// transition('begin', 'confirming')
// The above statement is like saying when the "begin" event is triggered or when the "begin" action occurs transition the state from where it currently is to the "confirming" state

// The only way out of a state machine is through a valid transition

// A state without any transitions is a FINAL state

// This is similar to event emission in node

// The return value from the 'createMachine' function is just the skeleton of the state machine. We need to turn it on.

const confirmationFlow = createMachine({
  // State machine goes here.....duhhhh 💁🏾‍♂️
  initial: state(transition('begin', 'confirming')),

  confirming: state(transition('confirm', 'loading'), transition('cancel', 'initial')),

  loading: invoke(
    deleteSomething,
    transition('done', 'initial'),
    transition('error', 'confirming'),
    reduce((context, event) => ({
      ...context,
      error: event.error,
    }))
  ), // Final state because there are no state transitions defined for it
});

// This service is like an event emitter in node that sends events/actions to our state machine (confirmationFlow) and has access to the current state of the machine. It is like an interface that allows us to interact with the state machine

const service = interpret(confirmationFlow, s => {
  console.log(`state is changing to ${s.machine.context}`);
});

// When using the 'invoke' function, the transitions must either be a success or error transition. By transition I mean the transitions defined after passing the function to be invoked

// We can store information in a state machine's context. Like useRef, stores information that we need persisted between state transitions

// The 'reduce' function lets us change the context of the machine. Context is remembered between state changes, and you can access its value from 'service.context'.

console.log('State is', service.machine.current);
service.send('begin');
console.log('State is', service.machine.current);
service.send('confirm');
console.log('State is', service.machine.current);
