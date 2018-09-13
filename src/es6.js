
export default class X {
  constructor() {
    (y) => { let x = 10 + '1' - '1'; return x + y}
  }

  async something() {

    await function doSth() {
      setTimeout(() => {
        resolve('sth')
      }, 1000);
    }

    await function doSthElse() {
      setTimeout(function () {
        resolve('sth else')
      }, 500);
    }

    Promise.all([doSth, doSthElse]).then((...args) => {
      args.forEach((arg)=>{ console.log(arg) });
    })
  }
}
