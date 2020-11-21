const LOADING = 'loading...     ';
const mockLoadingData = (() => {
  const array = [];
  for (let i=0; i<10; i++) {
    array.push(LOADING)
  }
  return array;
})();

export default mockLoadingData
