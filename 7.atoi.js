/**
 * Implement atoi which converts a string to an integer.
 * The function first discards as many whitespace characters as necessary until the first non-whitespace character is found. Then, starting from this character, takes an optional initial plus or minus sign followed by as many numerical digits as possible, and interprets them as a numerical value.
 * The string can contain additional characters after those that form the integral number, which are ignored and have no effect on the behavior of this function.
 * If the first sequence of non-whitespace characters in str is not a valid integral number, or if no such sequence exists because either str is empty or it contains only whitespace characters, no conversion is performed.
 * If no valid conversion could be performed, a zero value is returned.
 */


function atoi(str) {
    let minCap = -1 * 2**31, maxCap = 2**31-1;
    let number = 0;
    let decimal = 10;
    let isNegativeNumber = false;
    // we need isValidCharFound so that any non numeric char found after a valid int fond will break the loop 
    let isValidCharFound = false;

    for(let i=0; i<str.length; i++) {
        let charCode = str.charCodeAt(i);

        if(charCode >= 48 && charCode <= 57) {
            isValidCharFound= true;
            // we have found a number and will append to result
            number = number*decimal;
            number += parseInt(str[i]);
             
        } else {
            if(isValidCharFound) break;

            // if space ignore
            if(charCode === 32) {
                continue;
            }
            
            else if(charCode === 45) {
                isNegativeNumber = true
                isValidCharFound = true
            }
            else if(charCode === 43) {
                isNegativeNumber = false
                isValidCharFound= true
            }
            else break;

        }
    }

    if(isNegativeNumber && number !==0 ) number = -1 * number;
    if(number < minCap) return minCap;
    if(number > maxCap) return maxCap;
    return number
}



const tests = [
    { actual: atoi("$12+3"), expected: 0 },
    { actual: atoi("-12 3"), expected: -12 },
    { actual: atoi("+-23"), expected: 0 },
    { actual: atoi("123- "), expected: 123 },
    { actual: atoi("   -001"), expected: -1 },
    { actual: atoi("   -00"), expected: 0 },
    // This test case is failing as per leetcode's expected. Ideally expected should be 2147483647 (2**31-1)
    { actual: atoi("91283472332"), expected: -2147483648},
]

tests.forEach(test => console.log(test))


