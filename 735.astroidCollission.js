/**
 * url: https://leetcode.com/problems/asteroid-collision/
 */

/**
 * if a > 0 && b > 0: --> --> : no collission
 * if a < 0 && b < 0: <--  <-- : no collission
 * if a < 0 && b > 0: <-- -->: no collission
 * if a > 0 && b < 0: --> <-- : collission
 */

function a1(asteroids) {
  let result = [asteroids[0]];

  for(let i=1; i<asteroids.length; i++) {
    let isCollission = result[result.length-1] > 0 && asteroids[i] < 0;
    if(!isCollission) {
        result.push(asteroids[i]);
        continue;
    }

    // now there will be a collission
    // case 1: current astroid is bigger than waht we had last -> remove prev, place curr and repeat
    // case 2: current astroid is same as prev, remove prev
    // case 3: last astroid is bigger than current, continue;

    let shouldAddCurrent = false;
    while(result.length) {
        let prev = result[result.length-1];
        let curr = asteroids[i];
        let currAbs = Math.abs(curr);
        let prevAbs = Math.abs(prev);

        isCollission = prev > 0 && curr < 0
        if(!isCollission) {
            break;
        }
        if(prevAbs > currAbs) {
            shouldAddCurrent = undefined;
            break;
        }
        if(currAbs === prevAbs) {
            shouldAddCurrent = undefined
            result.pop();
            break;
        }
        if(prevAbs < currAbs) {
            shouldAddCurrent = true;
            result.pop();
        }
    }
    if(shouldAddCurrent) result.push(asteroids[i])

  }
  return result || []
}

function astroidCollission(asteroids) {
    let result = [asteroids[0]];
    for(let i=1; i<asteroids.length; i++) {
        let curr = asteroids[i];
        let shouldAddCurrrent = true;
        while(result.length) {
            let prev = result[result.length-1];
    
            let isCollission = prev > 0 && curr < 0;
            if(!isCollission) {
                shouldAddCurrrent = true;
                break
            }
            // collission is happening

            if(Math.abs(prev) > Math.abs(curr)) {
                // prev is bigger, so no need to add current, also there won't be any further collissions
                shouldAddCurrrent = false;
                break;
            }

            // prev is same as current so both will be destroyed, hence pop last and also don't need to add current
            if(Math.abs(prev) === Math.abs(curr)) {
                shouldAddCurrrent = false;
                result.pop()
                break;
            }

            // current is bigger, so prev will be destrotyed, so pop and the continue the loop
            if(Math.abs(prev) < Math.abs(curr)) {
                // current is larger than prev, so there will be collission which can continue
                shouldAddCurrrent = true;
                result.pop();
            }

           
        }

        if(shouldAddCurrrent) {
            result.push(curr);
        }

    }
    return result
}

const tests = [
    {
        actual: astroidCollission([5,10,-5]), expected: [5,10]
    },
    {
        actual: astroidCollission([8, -8]), expected: []
    },
    {
        actual: astroidCollission([-8, 8]), expected: [-8, 8]
    },
    {
        actual: astroidCollission([10,2,-5]), expected: [10]
    },
    {
        actual: astroidCollission([1,2,3, -10]), expected: [-10]
    },
    {
        actual: astroidCollission([1,2,3,4,5,]), expected: [1,2,3,4,5,]
    },
    {
        actual: astroidCollission([-2,-1,1,2]), expected: [-2,-1,1,2]
    },
    {
        actual: astroidCollission([1,-1,-2,-2]), expected: [-2,-2]
    }
]


tests.forEach(test => console.log(test))