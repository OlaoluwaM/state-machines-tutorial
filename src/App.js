import Modal from 'react-modal';

import { useMachine } from 'react-robot';
import { confirmationFlow } from './confirmationFlow';

async function doSomethingCustom() {
  // pretend to delete something
  return new Promise((resolve, reject) => {
    console.log('Beginning custom action...');
    setTimeout(() => {
      console.log('Done custom action');
      reject('Oh no!');
      resolve();
    }, 1000);
  });
}

export default function App() {
  const [current, send] = useMachine(confirmationFlow);
  const isLoading = current.name === 'loading';

  return (
    <div>
      <h1>Modal Test</h1>
      Current state: {current.name}
      <button
        onClick={() =>
          send({
            type: 'begin',
            onCommit: () => doSomethingCustom(),
          })
        }>
        Destroy Something Important
      </button>
      <Modal onRequestClose={() => send('cancel')} isOpen={current.name !== 'initial'}>
        {current.context.error && <div>{current.context.error}</div>}
        Are you sure?!
        <button disabled={isLoading} onClick={() => send('cancel')}>
          Cancel
        </button>
        <button disabled={isLoading} onClick={() => send('confirm')}>
          Yes Definitely
        </button>
      </Modal>
    </div>
  );
}
