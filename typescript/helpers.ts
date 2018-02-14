export const random = function(max, min = 0) {
  return Math.floor(Math.random() * Math.floor(max - min)) + min;
}
