let str = '';
for (let i = 0; i < 5; i++) {
    let rand = Math.round(Math.random()*24) + 97
    str += String.fromCharCode(rand);
}
console.log(str);