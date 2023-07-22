/**
 * url: https://leetcode.com/problems/remove-duplicates-from-sorted-array/
 */


function removeDupsFromSortedArray(nums) {
    let pointer = 1;
    for(let i=1; i<nums.length; i++) {
        if(nums[i] !== nums[pointer-1]) {
            nums[pointer] = nums[i];
            pointer++
        }
    }
    console.log(nums)
    return pointer
}

const tests = [
    {
        actual: removeDupsFromSortedArray([1,1,2]),
        expected: 2
    },
    {
        actual: removeDupsFromSortedArray([0,0,1,1,1,2,2,3,3,4]),
        expected: 5
        // nums = [0,1,2,3,4,_,_,_,_,_]
    },
    {
        actual: removeDupsFromSortedArray([3]),
        expected: 1
        // nums = [3]
    },
    {
        actual: removeDupsFromSortedArray([1,1,1,1,1]),
        expected: 1
        // nums = [1,_]
    }
]

tests.forEach(test => console.log(test))