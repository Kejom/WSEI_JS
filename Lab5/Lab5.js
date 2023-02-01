async function main(){
    let testArray = generateArray(50);
    console.log("wygenerowana lista:")
    console.log(testArray);

    console.log("wersja reduce")
    let result = await executionTimer(() => sumAll(testArray));
    console.log(`Suma: ${result}`);

    console.log("wersja szybka")
    let result2 = await executionTimer(() => sumAllButFast(testArray));
    console.log(`Suma: ${result2}`);

    console.log("wersja z przykladu w repo zadania")
    let result3 = await executionTimer(() => sumAllButCopyPaste(testArray));
    console.log(`Suma: ${result3}`);
}


async function sumAll(numsArray){
    return await numsArray.reduce(onReduce);
}

async function onReduce(sum, num){
    let currentSum = await sum;
    return await asyncAdd(currentSum, num);
}

async function sumAllButFast(numsArray){
    let promisesArray = [];
    if(numsArray.length % 2 === 1)
        promisesArray.push(numsArray[numsArray.length-1])

    for (let i = 0; i < numsArray.length-1; i+=2) {  
        promisesArray.push(asyncAdd(numsArray[i], numsArray[i+1]))
    }

    result = await Promise.all(promisesArray);

    if(result.length > 1)
        return sumAllButFast(result);

    return result[0];
}

async function sumAllButCopyPaste(values){
    let data = [...values]

    while (data.length > 1) {
      let asyncTempSums = []
      while (data.length > 0) {
        if (data.length === 1) {
          asyncTempSums.push(Promise.resolve(data.pop()))
        } else {
          const a = data.pop()
          const b = data.pop()
          asyncTempSums.push(asyncAdd(a, b))
        }
      }
      data = await Promise.all(asyncTempSums)
    }
    return data.pop()
}

async function executionTimer(func){
    let start = performance.now();
    let result = await func();
    let stop = performance.now();
    console.log(`czas wykonania kodu: ${stop-start}`);
    return result;
}

function generateArray(length){
return Array.from({length: length}, () => Math.floor(Math.random() * 100));
}
const asyncAdd = async (a,b) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
      return Promise.reject('Argumenty muszą mieć typ number!')
    }
    return new Promise((resolve, reject) => {
      setTimeout(() =>{
        resolve(a+b)
      }, 100)
    })
  }

main();