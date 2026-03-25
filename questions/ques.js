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
function checkIfPalindrom(str){
    let originalStr = str;
    let revStr = str.split('').reverse().join('');
    if (originalStr.toLowerCase() === revStr.toLowerCase()) return "Palindrome"
    else return "Not Palindrome";
}
let res2 = checkIfPalindrom("Radar");


// 3. Write a function to find the largest number in an array.
// using built in function 
function findLargeNumber(){
    let arr = [3,1,5,7,9,10,4,6];
    return Math.max(...arr);
}
// let res3 = findLargeNumber();

// manual way 
function findLargeNumberManual(arr){
    let newitem = 0;
    for(let i=0; i<arr.length-1;i++){
        let current = arr[i];
        let next = arr[i+1];
        if(next>current){
            current = next;
            newitem = next;

        }
        else{
            newitem = current;
            next = current;
        }
    }

    return newitem;
}

let arr = [3,1,5,7,9,10,4,6,50,5,34,67,33,90,1,4,5,2,1];
let res3 = findLargeNumberManual(arr)
console.log(res3);
