console.log("this is the promises");

let prom1 = new Promise((resolve, reject) => {
  let a = Math.random() * 11; //harsh sadh is teh
  if (a < 3) {
    reject("No random number ius supporting");
  } else {
    console.log("yees i am done");
    resolve(a);
  }
});
let prom2 = new Promise((resolve, reject) => {
  let a = Math.random() * 11; //harsh sadh is teh
  if (a < 3) {
    reject("No random number ius supporting 2");
  } else {
    console.log("yees i am done 2");
    resolve(a);
  }
});

let p3 = Promise.allSettled([prom1, prom2]);
p3.then((a) => {
  console.log(a);
}).catch((err) => {
  console.log(err);
});

// prom1
// .then((value) => {
//   console.log(value);
// })
// .catch((err) => {
//   console.log(err);

// });
