function filterSearchResult(searchString, inputList) {
  let filteredList = [];
  let testRegexp = new RegExp('^' + searchString, 'i');
  inputList.forEach(element => {
    if (testRegexp.test(element.name)) {
      filteredList.push(element.name.toLowerCase());
    }
  });

  return filteredList;
}

module.exports = filterSearchResult;
