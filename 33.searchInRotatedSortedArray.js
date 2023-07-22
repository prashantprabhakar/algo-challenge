/**
 * Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.
 * (i.e., [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2]).
 * You are given a target value to search. If found in the array return its index, otherwise return -1.
 * You may assume no duplicate exists in the array.
 * Your algorithm's runtime complexity must be in the order of O(log n).
*/

/**
 * Constraints
    1 <= nums.length <= 5000
    -104 <= nums[i] <= 104
    All values of nums are unique.
    nums is an ascending array that is possibly rotated.
    -104 <= target <= 104
 */

// when on pivot point: left > mid && right > mid;
// when mid lies in sorted region, left < mid < right -> array is in increasing order, we can search easily
// for other parts, left < mid > right
// So looks like left is always smaller than mid






function searchInRotatedSortedArray(nums, target, start=0, end=nums.length-1) {
    let mid = start + Math.floor((end-start)/2);
    if( end < start ) return -1;
    if(nums[mid] === target) return mid;

    // left side is sorted
    if(nums[start] <= nums[mid]) {
        if(target >= nums[start]  && target <= nums[end]) {
            // left search
            return searchInRotatedSortedArray(nums, target, start, mid-1)
        } else {
            // right search
            return searchInRotatedSortedArray(nums, target, mid+1, end)
        }
    } else {
        // right side is sorted
        if(target >= nums[mid] && target <= nums[end]) {
            // right search
            return searchInRotatedSortedArray(nums, target, mid+1, end)
        } else {
            // left search
            return searchInRotatedSortedArray(nums, target, start, mid-1)
        }
    }


}


const tests = [
    {
        actual: searchInRotatedSortedArray([4,5,6,7,0,1,2], 0),
        expected: 4
    },
    {
        actual: searchInRotatedSortedArray([4,5,6,7,0,1,2], 3),
        expected: -1
    },
    {
        actual: searchInRotatedSortedArray([1], 1),
        expected:0
    },
    {
        actual: searchInRotatedSortedArray([1], 0),
        expected: -1
    }
]

tests.forEach(test => console.log(test))