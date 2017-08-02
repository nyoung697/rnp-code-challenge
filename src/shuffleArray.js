//Read up on the Fisher-Yates shuffle algorithm, and realized that their's is slightly different
//https://blog.codinghorror.com/the-danger-of-naivete/
//If there were lots of decks, this one wouldn't be as efficient and some permutations would be favoured more than others over a larger number of shuffles.

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
