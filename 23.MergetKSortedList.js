/**
 * url: https://leetcode.com/problems/merge-k-sorted-lists/description/
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

// Time complexity O(n * n * log k)
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

/**
 * Complexity analysis
 *  function f is called with list size n -> n/2 -> n/4 and so on and and we make exact same calls to merge2SortedList fn. 
 *  so kind of we make calls k*log(k) times where k is no of lists
 *  function merge2Sorted List loops over 2 lists and has complexity of O(m) where m is length of smalles list -> O(n) where n is items in list.
 *  Time complexity: O(n * k* log k)
 *  Space complexity: ?? 
 */
function mergeKSortedList2(lists) {

    // time: O(n), space: O(n)
    function merge2SortedLists(list1, list2) {
        let node = new ListNode();
        let nodeHead = node;
        while(list1 && list2) {
            if(list1.val <= list2.val) {
                node.next = new ListNode(list1.val)
                list1 = list1.next;
            } else {
                node.next = new ListNode(list2.val);
                list2 = list2.next
            }
            node = node.next
        }
        if(list1) node.next = list1
        if(list2) node.next = list2
        return nodeHead.next
    }

    // time: O(k * log k): O(k) for loop and log(k) for recursive calls,
    // space: O(n*log K) for each temp list
    function f(lists) {
        if(lists.length === 0) return null
        if(lists.length === 1)
             return lists[0];
        let tempList = [];

        // O(k)
        for(let i=0; i<lists.length; i+=2) {
            let l1 = lists[i];
            let l2 = i===lists.length-1 ? null:  lists[i+1]
            let l = merge2SortedLists(l1, l2);
            tempList.push(l);
        }

        return f(tempList)
    }

    return f(lists)

}


const tests = [
    {
        actual: listToArray(mergeKSortedList2([[1,4,5],[1,3,4],[2,6]].map(arr => arrayToList(arr)))),
        expected: [1,1,2,3,4,4,5,6]
    },
    {
        actual: listToArray(mergeKSortedList2([[1,4,5],[2,6]].map(arr => arrayToList(arr)))),
        expected: [1,2,4,5,6]
    },
    {
        actual: listToArray(mergeKSortedList2([])),
        expected: []
    },
    {
        actual: listToArray(mergeKSortedList2([[]].map(arr=> arrayToList(arr)))),
        expected: []
    },
    {
        actual: listToArray(mergeKSortedList2([[1]].map(arr => arrayToList(arr)))),
        expected: [1]
    }
]

tests.forEach(test => console.log(test))