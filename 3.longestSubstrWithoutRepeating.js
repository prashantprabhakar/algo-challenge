/**
 * Given a string, find the length of the longest substring without repeating characters.
 */

function longestSubstrwithoutRepeatingChars(str) {
    if(str.length < 2) return str.length;

    let start = 0, end;
    // here we'll store last index of a char
    const charFreqMap = {};
    let result = 1; 

    for( end= 0; end < str.length; end++) {
        let char = str[end]
        if(charFreqMap[char] !== undefined && charFreqMap[char] >= start) {
            // We have found a repeating char
            result = Math.max(result, end-start);
            // start from last seen of given repeatedChar + 1
            start = charFreqMap[char] + 1;
        }
        charFreqMap[char] = end;
    }
    return Math.max(result, end-start);
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