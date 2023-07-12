/**
 * Write a function to find the longest common prefix string amongst an array of strings.
 * If there is no common prefix, return an empty string "".
 */

// Time complexity: O(m*n), space complexity: O(1)
function longestCommonPrefix(strs) {
    // 1. find length of smalles string. Our longest prefix can not be longer than smallest string
    let smallestLength = Math.min.apply(undefined, strs.map(str => str.length));
    let prefixCharArray = [];
    // 2. Loop over all strings from index 0 to smallestLength. Check charAt given `index` should be 
    // same for all strings. If not, return result.
    for(let index=0; index<smallestLength; index++) {
        let ch = strs[0][index];
        for(let strIndex=1; strIndex<strs.length; strIndex++) {
            let str = strs[strIndex];
            if(str[index] !== ch) {
                return prefixCharArray.join('');
            }
        }
        prefixCharArray.push(ch)
    }
    return prefixCharArray.join('');
}

const tests = [
    {
        actual: longestCommonPrefix(["flower","flow","flight"]),
        expected: 'fl'
    },
    {
        actual: longestCommonPrefix(["dog","racecar","car"]),
        expected: ''
    },
    {
        actual: longestCommonPrefix(["","racecar","car"]),
        expected: ''
    },
    {
        actual: longestCommonPrefix(["a"]),
        expected: 'a'
    }
]

tests.forEach(test => console.log(test))