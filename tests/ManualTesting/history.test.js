
console.log('loaded');
let historyManager = {changeUrl: (url)=>{
  window.history.pushState({xD: 'xD'}, '', url.display)
  return true;
}};

let testing = {

  changeUrl: [
    {real: 'someUrl', display: 'another'},
    {real: 'well'},
  ]

};


describe('HistoryManager', function() {

  describe('# Functions', function() {

    testing.changeUrl.forEach((url, index) => {

      let display = url.expected ? url.expected.display : (url.display || url.real);

      it(`changeUrl() #${index}`, function() {
        chai.expect(historyManager.changeUrl(url), 'Returned value is incorrect').to.be.true;
        chai.expect(window.history.state, 'History state didn\'t change').to.deep.equal(url);
        chai.expect(window.location.pathname, 'Window location didn\'t changed').to.equal(display);
        window.history.go(-1);
      });
    });



  });



});
