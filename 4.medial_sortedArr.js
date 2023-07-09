/**
 * There are two sorted arrays nums1 and nums2 of size m and n respectively.
 * Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).
 * You may assume nums1 and nums2 cannot be both empty.
 */

// Time complexity : O(m+n), Space Complexity: O(1)
function medialSortedArr(nums1, nums2) {
    let len = nums1.length + nums2.length;
    let [midIndex1, midINdex2] = len%2 !==0 ? [Math.floor(len/2), Math.floor(len/2)] : [len/2 - 1, len/2]
    let requiredNums = [];
    let middleNum1, requiredNum2;

    let count = 0;

    let i=0, j=0;
    while(i < nums1.length && j < nums2.length && requiredNums.length < 2) {
        let num = nums1[[i]] <= nums2[j] ? nums1[i] : nums2[j];
        nums1[[i]] <= nums2[j] ? i++ : j++
        if(count === midIndex1) middleNum1 = num;
        if(count === midINdex2) requiredNum2 = num;
        count++;
    }

    let f1 = midIndex1 - count;
    let f2 = midINdex2 - count;

    // Now one of the array is empty
    if(i === nums1.length){
        if(middleNum1 === undefined) middleNum1 = nums2[j+f1];
        if(requiredNum2 === undefined) requiredNum2 = nums2[j+f2];
    } else if(j === nums2.length) {
        if(middleNum1 === undefined) middleNum1 = nums1[i+f1];
        if(requiredNum2 === undefined) requiredNum2 = nums1[i+f2];
    }

    return (middleNum1 + requiredNum2) / 2;
}

const tests = [
    {
        actual: medialSortedArr([1,3], [2]),
        expected: 2
    },
    {
        actual: medialSortedArr([1,2], [3,4]),
        expected: 2.5
    }
]

tests.forEach(test => console.log(test))