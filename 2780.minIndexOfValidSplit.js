/**
 * https://leetcode.com/contest/weekly-contest-354/problems/minimum-index-of-a-valid-split/
 */

function minimumIndex(nums) {
    if(nums.length ===1 ) {
        return -1
    }

    let freqMap = {};
    let dominantNum = nums[0]
    let dominantFreq = 1;
    for(let i=0; i<nums.length; i++) {
        let num = nums[i]
        if(freqMap[num]) {
            freqMap[num] = freqMap[num]+1;
            if(freqMap[num] > dominantFreq) {
                dominantFreq = freqMap[num];
                dominantNum = num;
            }
        }
        else {
            freqMap[nums[i]] = 1;
        }
    }

    let leftFreq = 0;
    for(let i=0; i<nums.length-1; i++) {
        let num = nums[i];
        if(num === dominantNum) {
            leftFreq++;
        }
        let rightFreq = dominantFreq - leftFreq;
        let remaingLen = nums.length - i - 1;
        if(leftFreq * 2 > i+1 && rightFreq * 2 > remaingLen) {
            return i;
        }

    }
    return -1;

}

const tests = [
    { actual: minimumIndex([1,2,2,2]), expected: 2 },
    { actual: minimumIndex([2,1,3,1,1,1,7,1,2,1]), expected: 4 },
    { actual: minimumIndex([3,3,3,3,7,2,2]), expected: -1 },
    { actual: minimumIndex([1]), expected: -1 }
]

tests.forEach(test => console.log(test))