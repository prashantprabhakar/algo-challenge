/**
 * url: https://leetcode.com/problems/smallest-sufficient-team/
 */


function smallestSufficientTeamV1(reqSkills, people) {
    function _smallestSufficientTeam(reqSkills, people, peopleIndex, result) {
        if(reqSkills.length === 0) return result;
        if(peopleIndex === people.length) return Array(61); // since people.length can be upto 60 only,

        let skip = _smallestSufficientTeam(reqSkills, people, peopleIndex+1, result);
        let personSkills = people[peopleIndex];
        let remainingSkillsNeeded = reqSkills.filter(skill => !personSkills.includes(skill))
        let take = _smallestSufficientTeam(remainingSkillsNeeded, people, peopleIndex+1, result.concat(peopleIndex))
        return skip.length < take.length ? skip : take
    }
    return _smallestSufficientTeam(reqSkills, people, 0, [])
}

// Changes over v1 is that we removed results from function dependency, which makes less variables to function, which can later be used to memoize result.
function smallestSufficientTeamV2(reqSkills, people) {

    function _smallestSufficientTeam(reqSkills, people, peopleIndex,) {
        if(reqSkills.length === 0) return [];
        if(peopleIndex === people.length) return Array(61); // since people.length can be upto 60 only,

        let skip = _smallestSufficientTeam(reqSkills, people, peopleIndex+1);
        let personSkills = people[peopleIndex];
        let remainingSkillsNeeded = reqSkills.filter(skill => !personSkills.includes(skill))
        let take = [peopleIndex, ..._smallestSufficientTeam(remainingSkillsNeeded, people, peopleIndex+1 )]
        return skip.length < take.length ? skip : take
    }
    return _smallestSufficientTeam(reqSkills, people, 0, [])

}

function smallestSufficientTeamV3(reqSkills, people) {

    let memo = {};
    function _smallestSufficientTeam(reqSkills, people, peopleIndex,) {
        if(reqSkills.length === 0) return [];
        if(peopleIndex === people.length) return Array(61); // since people.length can be upto 60 only,

        let key = `${peopleIndex}_${reqSkills.join('_')}`;
        if(memo[key]) return memo[key]

        let skip = _smallestSufficientTeam(reqSkills, people, peopleIndex+1);
        let personSkills = people[peopleIndex];
        let remainingSkillsNeeded = reqSkills.filter(skill => !personSkills.includes(skill))
        let take = [peopleIndex, ..._smallestSufficientTeam(remainingSkillsNeeded, people, peopleIndex+1 )]
        memo[key] = skip.length < take.length ? skip : take
        return memo[key]
    }
    return  _smallestSufficientTeam(reqSkills, people, 0, [])

}


const testCases = [
    {
        reqSkills: ["java","nodejs","reactjs"],
        people:  [["java"],["nodejs"],["nodejs","reactjs"]],
        expected: [0, 2]
    },
    {
        reqSkills: ["algorithms","math","java","reactjs","csharp","aws"],
        people: [["algorithms","math","java"],["algorithms","math","reactjs"],["java","csharp","aws"],["reactjs","csharp"],["csharp","math"],["aws","java"]],
        expected: [1, 2]
    },
    // this case gives TLE with v1 and v2 solution, v3 however passes but less optimized
    {
        reqSkills: ["hdbxcuzyzhliwv","uvwlzkmzgis","sdi","bztg","ylopoifzkacuwp","dzsgleocfpl"],
        people: [["hdbxcuzyzhliwv","dzsgleocfpl"],["hdbxcuzyzhliwv","sdi","ylopoifzkacuwp","dzsgleocfpl"],["bztg","ylopoifzkacuwp"],["bztg","dzsgleocfpl"],["hdbxcuzyzhliwv","bztg"],["dzsgleocfpl"],["uvwlzkmzgis"],["dzsgleocfpl"],["hdbxcuzyzhliwv"],[],["dzsgleocfpl"],["hdbxcuzyzhliwv"],[],["hdbxcuzyzhliwv","ylopoifzkacuwp"],["sdi"],["bztg","dzsgleocfpl"],["hdbxcuzyzhliwv","uvwlzkmzgis","sdi","bztg","ylopoifzkacuwp"],["hdbxcuzyzhliwv","sdi"],["hdbxcuzyzhliwv","ylopoifzkacuwp"],["sdi","bztg","ylopoifzkacuwp","dzsgleocfpl"],["dzsgleocfpl"],["sdi","ylopoifzkacuwp"],["hdbxcuzyzhliwv","uvwlzkmzgis","sdi"],[],[],["ylopoifzkacuwp"],[],["sdi","bztg"],["bztg","dzsgleocfpl"],["sdi","bztg"]]
    }
]

const tests1 = testCases.map(testCase => ({
    actual: smallestSufficientTeamV1(testCase.reqSkills, testCase.people),
    expected: testCase.expected
}))

const tests2 = testCases.map(testCase => ({
    actual: smallestSufficientTeamV2(testCase.reqSkills, testCase.people),
    expected: testCase.expected
}))

const tests3 = testCases.map(testCase => ({
    actual: smallestSufficientTeamV3(testCase.reqSkills, testCase.people),
    expected: testCase.expected
}))


console.log(tests3)

// tests1.forEach(test => console.log(test))