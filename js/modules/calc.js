function sum(a, b) {
    return a + b;
}
function minus(a, b) {
    var c = _private( a, b );
    return a - b;
}
function _private( a, b ){
    return a * b;
}
export { sum, minus };