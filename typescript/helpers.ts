export const random = function(max : number, min = 0) : number {
  return Math.floor(Math.random() * Math.floor(max - min)) + min;
}
