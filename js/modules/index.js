// Modularize and import
import hello from './hello.js';
import bind_help from './help.js'

function component() {
  console.log( hello() );
  console.log( bind_help() );
  // move to $(document).ready(){...}
}

component();