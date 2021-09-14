'use strict'

module.exports = function(num) {
  if(num % 3 === 0) {
    return 'Fizz'
  }
  if(num % 5 === 0) {
    return 'Buzz'
  }
  if( num % 15 === 0) {
    return 'FizzBuzz'
  }
  return String(num)
}