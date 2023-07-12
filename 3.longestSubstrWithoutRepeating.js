/**
 * Given a string, find the length of the longest substring without repeating characters.
 */

// Time complexity O(n) | space complexity: O(1)
function longestSubstrwithoutRepeatingChars(str) {
    if(str.length < 2) return str.length;

    let windowStart = 0, windowEnd;
    // here we'll store last index of a char
    const charIndexMap = {};
    let result = 1; 

    for( windowEnd= 0; windowEnd < str.length; windowEnd++) {
        let char = str[windowEnd]
        if(charIndexMap[char] !== undefined && charIndexMap[char] >= windowStart) {
            // We have found a repeating char
            result = Math.max(result, windowEnd-windowStart);
            // windowStart from last seen of given repeatedChar + 1
            windowStart = charIndexMap[char] + 1;
        }
        charIndexMap[char] = windowEnd;
    }
    return Math.max(result, windowEnd-windowStart);
}

const tests = [
    {
      actual: longestSubstrwithoutRepeatingChars('abcabcbb'),
      expcted: 3
    },
    {
      actual: longestSubstrwithoutRepeatingChars("bbbbb"),
      expcted: 1,
    },
    {
      actual: longestSubstrwithoutRepeatingChars("pwwkew"),
      expcted: 3,
    },
    {
      actual: longestSubstrwithoutRepeatingChars("a"),
      expcted:1,
    },
    {
      actual: longestSubstrwithoutRepeatingChars("a"),
      expcted:1,
    },
    {
      actual: longestSubstrwithoutRepeatingChars("au"),
      expcted: 2,
    },
    {
      actual: longestSubstrwithoutRepeatingChars("dvdf"),
      expcted: 3
    },
    {
      actual: longestSubstrwithoutRepeatingChars("abcdeaf"),
      expcted: 6
    },
    {
      actual: longestSubstrwithoutRepeatingChars('abcwxywtpoa'),
      expcted: 7
    },
  ]
  
  tests.forEach(test => console.log(test))