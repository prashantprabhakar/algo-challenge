/**
 * 
 * 
 */

function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

function listToArray(head) {
    let vals = [];
    while(head) {
        vals.push(head.val);
        head = head.next
    }
    return vals
}

function arrayToList(arr) {
    let head = new ListNode(arr[0]);
    let curr = head;
    for(let i=1; i<arr.length; i++) {
        let node = new ListNode(arr[i]);
        curr.next = node;
        curr = node
    }
    return head;
}


function mergeKSortedList(lists) {
    let result = new ListNode();
    let resultHead = result;
    // map indicated how may of lists have we processed (reached to end)
    let processedMap = {};
    let listsProcessed = 0;

    while(listsProcessed < lists.length) {
        let currList = undefined;
        let matchedIndex = 0
        for(let i=0; i<lists.length; i++) {
            if(!lists[i]) {
                if(!processedMap[i]) {
                    processedMap[i] = true;
                    listsProcessed++;
                }
                continue;
            }
            if(!currList) {
                matchedIndex = i;
                currList = lists[i];
                continue;
            }

            if(lists[i].val < currList.val) {
                currList = lists[i]
                matchedIndex = i;
            }
        }
        if(currList)  result.next = new ListNode(currList.val);
        result = result.next;
        if(lists[matchedIndex]) lists[matchedIndex] = lists[matchedIndex].next
    }

    return resultHead.next;

}


const tests = [
    {
        actual: listToArray(mergeKSortedList([[1,4,5],[1,3,4],[2,6]].map(arr => arrayToList(arr)))),
        expected: [1,1,2,3,4,4,5,6]
    },
    {
        actual: listToArray(mergeKSortedList([])),
        expected: []
    },
    {
        actual: listToArray(mergeKSortedList([[]].map(arr=> arrayToList(arr)))),
        expected: []
    },
    {
        actual: listToArray(mergeKSortedList([[1]].map(arr => arrayToList(arr)))),
        expected: [1]
    }
]

tests.forEach(test => console.log(test))