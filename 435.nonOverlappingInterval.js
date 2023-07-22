/**
 * Url: https://leetcode.com/problems/non-overlapping-intervals/
 */

function eraseOverlapIntervals_nonWorking(intervals) {
    intervals = intervals.sort((a,b) => a[0] - b[0]);

    function removeInternal(intervals, index, requriredStart) {

        if(index >= intervals.length) return 0;
        // we can only skip this if our requiredStart lies in rage

        let canKeep = intervals[index][0] >= requriredStart; // isNonOverlapping
        let r1;
        if(canKeep) {
            r1 = Math.min(
                removeInternal(intervals, index+1, intervals[index]+1),
                1 + removeInternal(intervals, index+1, requriredStart)
            )
        }


        if(!canKeep) {
            r2 = 1 + removeInternal(intervals, index+1, requriredStart);
        }

        if(r1 === undefined) return r2;
        if(r2 === undefined) return r1;
        return Math.min(r1, r2)
    }

    return removeInternal(intervals, 0, -10)
}

function eraseOverlapIntervals(intervals) {
    let removed = 0;
    intervals = intervals.sort((a,b) => a[0] - b[0]);
    let requiredStart = intervals[0][1]
    for(let i=1; i<intervals.length; i++) {
        let isOverlapping = intervals[i][0] < requiredStart;
        if(isOverlapping) {
            removed++;
            // which one to remove? the one whose end value is higher,
            requiredStart = Math.min(requiredStart, intervals[i][1])
        } else {
            requiredStart = Math.max(requiredStart, intervals[i][1])
        }
    }
    return removed
}


const tests = [
    { 
        actual: eraseOverlapIntervals([[1,2],[2,3],[3,4],[1,3]]),
        expected: 1
    },
    {
        actual: eraseOverlapIntervals([[1,2],[1,2],[1,2]]),
        expected: 2
    },
    {
        actual: eraseOverlapIntervals([[0,3], [2,6], [4,6], [6,8]]),
        expected: 1
    },
    {
        actual: eraseOverlapIntervals([[0,3], [1,2], [2,6], [5,6]]),
        expected: 2
    }
]

tests.forEach(test => console.log(test))