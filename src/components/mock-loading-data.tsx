import {LETTER_LENGTH} from "../services/use-get-top-10-by-market-cap";

const loading = 'loading...';
const fullLoadingText = loading + new Array(LETTER_LENGTH - loading.length).fill(' ').join('');
const mockLoadingData = (() => {
  const array = [];
  for (let i=0; i<10; i++) {
    array.push(fullLoadingText)
  }
  return array;
})();

export default mockLoadingData
