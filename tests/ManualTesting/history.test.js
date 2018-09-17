
console.log('loaded');
let historyManager = {loadUrl: ()=>true};

let testing = {

  loadUrl: [
    {real: 'someUrl', display: 'another'},
    {real: 'well'},
  ]

};


describe('HistoryManager', function() {

  describe('# Functions', function() {

    testing.loadUrl.forEach((url, index) => {

      let display = url.expected ? url.expected.display : (url.display || url.real);

      it(`loadUrl() #${index}`, function() {
        
        chai.expect(historyManager.loadUrl(url), 'Returned value is incorrect').to.be.true;
        chai.expect(window.history.state, 'History state didn\'t change').to.deep.equal(url);
        chai.expect(window.location.pathname, 'Window location didn\'t changed').to.equal(display);

        // TDD style
        // chai.assert.deepEqual(historyManager.loadUrl(url), true, 'Returned value is incorrect');
        // chai.assert.deepEqual(window.history.state, url, 'History state didn\'t change');
        // chai.assert.strictEqual(window.location.pathname, display, 'Window location didn\'t changed');
        //
      });
    });



  });



});
