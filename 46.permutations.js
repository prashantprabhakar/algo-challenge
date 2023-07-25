/**
 * https://leetcode.com/problems/permutations/
 */

/**
 * Constraints:
 * 1 <= nums.length <= 6
 * -10 <= nums[i] <= 10
 * All the integers of nums are unique.
 */

function permute(nums) {

    let result = [];
    let len = nums.length

    // this function will return all possible permutation for nums, and exclude `exceptionNumber` from list
    function f(nums) {
        if(nums.length === 0) return [];
        if(nums.length === 1) return [[nums[0]]];

        let tempRes = [];
        for(let i=0; i<nums.length; i++) {
            let arr = [...nums.slice(0, i) ,...nums.slice(i+1)];
            let perms = f(arr);
            let r = perms.map(perm => [nums[i], ...perm])
           tempRes.push(...r)
        }
        tempRes.forEach(r => {
            if(r.length == len) result.push(...r)
        })
        return tempRes
    }

    return f(nums)
}

console.log(permute([1, 2, 3, 4]))