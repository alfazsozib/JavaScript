// 1. Write a function to reverse a string.
// manual way 
function rev(strr){
    let revArr = [];
    let spltString = strr.split("");
    while(spltString.length!==0){
        let lastItem = spltString.pop()
        revArr.push(lastItem);
    }
    console.log(revArr.join(''))
}

// by using builit function 
function revbuilt(strr){
    let splitedArr = strr.split('');
    return splitedArr.reverse().join("");
}
let ans = revbuilt("Alfaz");


// 2. Write a function to check if a string is a palindrome.


f
