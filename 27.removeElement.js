

function removeElement(nums, val) {
    let pointer = 0;
    for(let i=0; i<nums.length; i++) {
        if(nums[i] !== val) {
            nums[pointer] = nums[i];
            pointer++
        }
    }
    console.log(nums)
    return  pointer;
}


const tests = [
    {
        actual: removeElement([3,2,2,3], 3),
        expected: 2
        // nums [2,2,_,_]
    },
    {
        actual: removeElement([0,1,2,2,3,0,4,2], 2),
        expected: 5
        //nums [0,1,4,0,3,_,_,_]
    },
    
]

tests.forEach(test => console.log(test))