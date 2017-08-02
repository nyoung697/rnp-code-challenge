const shuffleArray = (array) => {
  const length = array.length;
  array = array.slice();

  for (let i = 0; i < length; i++) {
    var n = Math.floor(Math.random() * length);
    [array[i], array[n]] = [array[n], array[i]];
  }

  return array;
}

export default shuffleArray;