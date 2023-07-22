/**
 * https://leetcode.com/problems/add-two-numbers-ii/description/
 * 
 * You are given two non-empty linked lists representing two non-negative integers. 
 * The most significant digit comes first and each of their nodes contains a single digit. 
 * Add the two numbers and return the sum as a linked list.
 * You may assume the two numbers do not contain any leading zero, except the number 0 itself.
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

function reverseList(list) {
    let l1 = list;
    let node = null
    while(l1) {
        let t = new ListNode(l1.val);
        t.next = node;
        node = t;
        l1 = l1.next
    }
    return node
}

function findLength(list) {
    let len = 0, node = list
    while(node) {
        node = node.next;
        len++;
    }
    return len
}

function padList(list, padLength) {
    let head = new ListNode();
    let node = head;
    while(padLength) {
        node.next = new ListNode();
        node = node.next;
        padLength--
    }
    node.next = list;
    return head.next;

}

function addTwoNumbers(l1, l2) {
    let len1 = findLength(l1)
    let len2 = findLength(l2)

    // make bigger list as l1 and other as l2;
    if(len1 < len2) {
       let t1 = l1;
       l1 = l2;
       l2 = t1;
       [len1, len2] = [len2, len1];
    }
    // reset n1 and n2
    n1 = l1, n2 = l2;
    
    // let's add and store result as it is
    let lenDiff = len1 - len2;
    let head = new ListNode();
    let prev = head;
    for(let i=0; i<lenDiff; i++) {
        prev.next = new ListNode(n1.val);
        n1 = n1.next;
        prev = prev.next;
    }

    // now n1 and n2 will have same length
    while(n1 && n2) {
        prev.next = new ListNode(n1.val + n2.val);
        n1 = n1.next;
        n2 = n2.next;
        prev = prev.next
    }

    // reverse the sumed list
    let revList = reverseList(head.next);

    let curr = revList;
    let carry = 0
    while(curr) {
        let sum = carry + curr.val;
        carry = sum > 9 ? 1 : 0;
        sum = sum > 9 ? (sum - 10): sum;
        curr.val = sum;
        curr = curr.next
    }

    

    let result = reverseList(revList)

    // if carry remains
    if(carry) {
        let node = new ListNode(carry)
        node.next = result;
        result = node
    }

    return result;


}


// need to fix this. not working
function addTwoNumbers2(l1, l2) {
    let len1 = findLength(l1);
    let len2 = findLength(l2);

    if(len1 > len2) {
        l2 = padList(l2, len1-len2)
    }
    if(len2 > len1) {
        l1 = padList(l1, len2-len1)
    }


    let result = new ListNode();
    let curr = result;
    function sumInternal(n1, n2, carry) {
        if(!n1 || !n2) return null
        let sum = n1.val + n2.val + carry 
        carry = sum > 9 ? 1 : 0;
        sum = sum > 9 ? (sum - 10): sum;
        curr.next = new ListNode(sum);
        curr = curr.next
        sumInternal(n1.next, n2.next, carry);
        console.log({sum, n1:n1.val, n2: n2.val, carry})
    }
    sumInternal(l1, l2, 0)
    console.log(listToArray(result))
    return result.next

}

const inputs = [
    { list1: [7,2,4,3], list2: [5,6,4], expected: [7,8,0,7] },
    { list1: [7,2,4,3], list2: [0], expected: [7,2,4,3] },
    { list1: [5,6,4], list2: [7,2,4,3], expected: [7,8,0,7] },
    { list1: [0], list2: [0], expected: [0] },
    { list1: [1], list2: [9,9,9,9], expected: [1,0,0,0] },
    { list1: [9], list2: [9], expected: [1,8] },
]

const tests = inputs.map(input => ({
    actual: listToArray(addTwoNumbers(arrayToList(input.list1), arrayToList(input.list2))),
    expected: input.expected
}))

const tests2 = inputs.map(input => ({
    actual: listToArray(addTwoNumbers2(arrayToList(input.list1), arrayToList(input.list2))),
    expected: input.expected
}))


console.log(tests2)

