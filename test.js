var array = [1,2,3,4,5,6,7,8,9,10];
console.log(chunkArray(array));

function chunkArray(array) {
   let resultArr = [];
   const chunkSize = 5;
   for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      resultArr.push(chunk);
   }

   return resultArr;
}