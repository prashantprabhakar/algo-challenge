/**
 * URL: https://leetcode.com/problems/search-insert-position/
 * Given a sorted array of distinct integers and a target value, return the index if the target is found. 
 * If not, return the index where it would be if it were inserted in order.
 * You must write an algorithm with O(log n) runtime complexity.
 */

/**
  Constraints:
    1 <= nums.length <= 104
    -104 <= nums[i] <= 104
    nums contains distinct values sorted in ascending order.
    -104 <= target <= 104
*/

function searchInsert(nums, target) {
  
  function searchInternal(nums, target, start, end){
    if(start > end ) return start
    let mid = start + Math.floor((end-start)/2);
    if(nums[mid] === target)
      return mid;

    if(end === start) {
      return target < nums[start] ? start: start+1
    }

   
    
   

    if(nums[mid] < target)
      return searchInternal(nums, target, mid+1, end)

    if(nums[mid] > target)
      return searchInternal(nums, target, start, mid-1)
  }


  return searchInternal(nums, target, 0, nums.length-1)
}

const tests = [
  { actual: searchInsert([1,3,5,6], 5), expected: 2},
  { actual: searchInsert([1,3,5,6], 2), expected: 1},
  { actual: searchInsert([1,3,5,6], 7), expected: 4},
  { actual: searchInsert([1,3,5,6], 0), expected: 0},
  { actual: searchInsert([1,3,5,6, 7], 0), expected: 0},
  { actual: searchInsert([1], 1), expected: 0},
]

tests.forEach(test => console.log(test))