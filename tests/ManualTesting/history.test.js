
console.log('loaded');
let historyManager = {loadUrl: ()=>true};

let testing = {

  loadUrl: [
    {real: 'someUrl', display: 'another'},
    {real: 'well'},
  ]

};


suite('HistoryManager', function() {

  suite('# Functions', function() {

    testing.loadUrl.forEach((url, index) => {

      let display = url.expected ? url.expected.display : (url.display || url.real);

      test(`loadUrl() #${index}`, function() {
        chai.assert.deepEqual(historyManager.loadUrl(url), true, 'Returned value is incorrect');
        chai.assert.deepEqual(window.history.state, url, 'History state didn\'t change');
        chai.assert.strictEqual(window.location.pathname, display, 'Window location didn\'t changed');
      });
    });



  });



});
