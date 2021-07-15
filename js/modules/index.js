// Modularize and import
import hello from './hello.js';

function component() {
  console.log( hello() );
  // move to $(document).ready(){...}
}

component();