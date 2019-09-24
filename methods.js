module.exports =
{
    increaseSize: increaseSize,
    testPromise: testPromise,
    asyncTest : asyncFunc,
    asyncAwaitTest: asyncAwait,
    callbackPromiseTest: init
};

//Callback
function increaseSize(size, callback)
{
    console.log("Size is currently " + size + " points");
    size += 10;
    callback(size);
}

//Promise
function testPromise()
{
    let promise = new Promise(function(resolve, reject){
        if(new Date().getHours < 23)
        {
            resolve("Success!");
        }
        else(false)
        {
            reject(new Error("Failed to complete the task before deadline!"));
        }
    })

    promise.then
    (
        resolve => console.log("Succeded!"),
        reject => console.log("Rejected: " + reject.message)
    );
}

//Async
async function asyncFunc()
{
    console.log("Starting async task");
    sleep(100);
    console.log("Finished async task");
}

function sleep(miliseconds) {
    var currentTime = new Date().getTime();
    while (currentTime + miliseconds >= new Date().getTime()) {
    }
 }

//Async + Await
async function asyncAwait()
{
    console.log("Starting async + await function");
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Finished function"), 1000);
  })

  let result = await promise;

  console.log(result);
}

//Callback + Promise
function startFunc(callback) {
    console.log("Starting callback + promise function");
    callback();
  }
  
  function init()
  {
    startFunc(() => {
        let promise = new Promise((resolve, reject) => {
          setTimeout(() => reject(new Error("Error occured")), 1000);
        })
      
        promise.then(
          result => console.log("Finished callback"),
          error => console.log(error.message)
        );
      });
  }
  