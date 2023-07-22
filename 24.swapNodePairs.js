/**
 * url: https://leetcode.com/problems/swap-nodes-in-pairs/
 * Given a linked list, swap every two adjacent nodes and return its head.\
 * You may not modify the values in the list's nodes, only nodes itself may be changed.
 * 
 * Constraints
 *  The number of nodes in the list is in the range [0, 100].
 *  0 <= Node.val <= 100

    Example:
        Given 1->2->3->4, you should return the list as 2->1->4->3.
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

// Time complexity: O(n) | Space complexity: O(1)
function swapNodePairs(head) {
    // in case of list has less than 2 elements, there can't be a swap
    if(!head || !head.next) return head;
    let res = new ListNode();
    let prev = res;
    let n1 = head;
    while(n1 && n1.next) {
        // save
        let n2 = n1.next;
        let n3 = n2.next;

        // reverse
        n2.next = n1;
        n1.next = n3;
        prev.next = n2

        // update
       prev = n1;
       n1 = n3
    }
    return res.next;
    
}

const tests = [
    {
        actual: listToArray(swapNodePairs(arrayToList([1,2,3,4,5,6]))),
        expected: [2,1,4,3,6,5]
    }
]

tests.forEach(test => console.log(test))