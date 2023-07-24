/**
 * https://leetcode.com/problems/first-missing-positive/
 */

function firstMissingPositive(nums) {
    
    let max = nums.length + 2; // solution will always be less than this value
    // replace all negative and zero values with max
    nums = nums.map(num => num <= 0 ? max : num);
    nums.forEach((num) => {
        num = Math.abs(num)
        let correctIndex = num - 1
        if(correctIndex >=0 && correctIndex < nums.length && nums[correctIndex] >= 0) {
                nums[correctIndex] = -1 * nums[correctIndex];
        }
    })
    console.log(nums)

    for(let i=1; i<= nums.length; i++) {
        if(nums[i-1] > 0 ) {
            return i
        }
    }

    return nums.length+1
}

const tests = [
    { actual: firstMissingPositive([1,2,0]), expected: 3 },
    { actual: firstMissingPositive([0,1,2]), expected: 3},
    { actual: firstMissingPositive([3,4,-1,1]), expected: 2 },
    { actual: firstMissingPositive([7,8,9,11,12]), expected: 1 },
    { actual: firstMissingPositive([1]), expected: 2},
    { actual: firstMissingPositive([1,1]), expected: 2},
]

tests.forEach(test => console.log(test))