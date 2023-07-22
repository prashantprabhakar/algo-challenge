/**
 * https://leetcode.com/problems/count-and-say/
 */

function coundAndSay(n) {
     n = n.toString()
    if(n === 1) return 1;
    let result = '1'
    for(let i=1; i<n; i++) {
        result = say(result)
    }
    return result
}

function say(num) {
    let res = ''
    let count = 1
    for(let i=1; i<num.length; i++) {
        if(num[i] == num[i-1]) {
            count++;
        } else {
            res += `${count}${num[i-1]}`;
            count = 1
        }
    }

    res += `${count}${num[num.length-1]}`
    
    return res
}

console.log(coundAndSay('4'))