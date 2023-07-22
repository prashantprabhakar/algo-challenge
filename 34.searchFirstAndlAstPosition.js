/**
 * URL:https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/
 * Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.
 * If target is not found in the array, return [-1, -1].
 * You must write an algorithm with O(log n) runtime complexity.
 */

/**
     Constraints:
        0 <= nums.length <= 105
        -109 <= nums[i] <= 109
        nums is a non-decreasing array.
        -109 <= target <= 109
 */


function searchRange(nums, target) {

    function search(nums, target, start, end,) {
        if(start > end) return [-1, -1]
        const mid = start + Math.floor((end-start)/2);

        if(nums[mid] === target) {
            let [f1] = search(nums, target, start, mid-1);
            let [_, f2] = search(nums, target, mid+1, end);
            let leftIndex = rightIndex = mid;
            if(f1 !== -1)
                leftIndex  = Math.min(mid, f1);
            if(f2 !== -1) 
                rightIndex = Math.max(mid, f2)
            
            return [leftIndex, rightIndex]
        }
        if(target < nums[mid]) {
            // search left part
            return search(nums, target, start, mid-1)
        }

        if(target > nums[mid]) {
            // search right part
            return search(nums, target, mid+1, end)
        }
        
    }
    return search(nums, target, 0, nums.length-1)
}


const tests = [
    {
        actual: searchRange([5,7,7,8,8,10], 8),
        expected: [3,4]
    },
    {
        actual: searchRange([5,7,7,8,8,10], 6),
        expected: [-1, -1]
    },
    {
        actual: searchRange([], 8),
        expected:[-1, -1]
    },
    {
        actual: searchRange([8,8,8,8,8,8,8,8,8,8], 8),
        expected:[0,9]
    }
]

tests.forEach(test => console.log(test))