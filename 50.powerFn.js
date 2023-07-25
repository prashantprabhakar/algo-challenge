/**
 * https://leetcode.com/problems/powx-n/
 */

/**
 * Implement pow(x, n), which calculates x raised to the power n (i.e., xn).
 * Constraints:
        -100.0 < x < 100.0
        -2**31 <= n <= 2**31-1
        n is an integer.
        Either x is not zero or n > 0.
        -104 <= xn <= 104
 */

function pow(x,n) {

    if(x === 0) return 0
    let dp =  [];

    function f(x, n) {
        // base cases
        if(n === 0) return 1
        if(n === 1) return x;
        if( n === -1) return  1/x
        const dpKey = `x_${x}_n_${n}`
        if(dp[dpKey]) return dp[dpKey];

        let n1 = Math.floor(n/2);
        let res = n % 2 == 0 ? f(x,n1) * f(x,n1) :   f(x,n1) * f(x,n1) * x;
        dp[dpKey] = res;
        return res;
    }

    return f(x, n)
}

console.log(powRec(2,10))
// console.log(powRec(2.1,3))
// console.log(powRec(2, -2))
// console.log(powRec(0.00001, 2147483647))