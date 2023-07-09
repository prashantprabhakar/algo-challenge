/**
 * Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
 * You may assume that each input would have exactly one solution, and you may not use the same element twice.
 */

/**
 * Constraints:
 * arr.length > 1
 */

function twoSum(arr, target) {
    let numberIndexMap = {}
    arr.forEach((number, index) => {
        numberIndexMap[number] ? numberIndexMap[number].push(index): numberIndexMap[number] = [index]
    });


    // now we have a map with each number and array of their index
    for(let [numberStr, indices] of Object.entries(numberIndexMap)) {
        let number = Number(numberStr); // since object keys are string
        let requiredNum = target - number;

        if(requiredNum === number && indices.length > 1){
            return [indices[0], indices[1]]
        }

        let requiredNumIndices = numberIndexMap[requiredNum];
        if(requiredNumIndices) {
            return [indices[0], requiredNumIndices[0]]
        }
    }

    return [-1, -1]


}

const tests = [
    {
        actual: twoSum([2, 7, 11, 15], 9),
        expected: [0,1]
    },
    {
        actual: twoSum([3,3,4,4,4,3,3,], 6),
        expected: [0,1]
    },
    {
        actual: twoSum([3,4,3,3], 6),
        expected: [0,2]
    },
    {
        actual: twoSum([3,2,4], 6),
        expected: [1,2]
    },
    {
        actual: twoSum([4,4], 8),
        expected: [0,1]
    }
]

tests.forEach(test => console.log(test))