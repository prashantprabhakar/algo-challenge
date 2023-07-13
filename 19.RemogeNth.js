
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
function removeNthFromEnd(head,n) {
    let length = 0;
    let curr = head;
    // O(n)
    while(curr) {
        length++;
        curr = curr.next;
    }

    let indexToRemove = length - n;
    if(indexToRemove === 0) {
        return head.next
    }
    
    curr = head;
    // O(n)
    for(let i=1; i < indexToRemove; i++) {
        curr = curr.next;
    }
   
    curr.next = curr.next.next;
    return head;
}


const tests = [
    {
        actual: listToArray(removeNthFromEnd(arrayToList([1,2,3,4,5]), 2)),
        expected: [1,2,3,5] 
    },
    {
        actual: listToArray(removeNthFromEnd(arrayToList([1,2,3,4,5]), 4)),
        expected: [1,3,4,5] 
    },
    {
        actual: listToArray(removeNthFromEnd(arrayToList([1,2,3,4,5]), 5)),
        expected: [2,3,4, 5] 
    },
    {
        actual: listToArray(removeNthFromEnd(arrayToList([1,2]), 1)),
        expected: [1] 
    },
    {
        actual: listToArray(removeNthFromEnd(arrayToList([1,2]), 2)),
        expected: [2] 
    },
    {
        actual: listToArray(removeNthFromEnd(arrayToList([1]), 1)),
        expected: [] 
    }
]


tests.forEach(test => console.log(test))