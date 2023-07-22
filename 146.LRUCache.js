/**
 * url: https://leetcode.com/problems/lru-cache/description/
 */

function lruCacheToArray(obj) {
    let list = obj.head.next; // skip first
    let result = [];
    while(list.next) {
        result.push(list.val.key)
        list = list.next
    }
    result.push({ size: Object.keys(obj.map).length})
    return result
}


class DLL {
    constructor(val, next, prev) {
        this.val = val === undefined ? 0 : val
        this.next = next === undefined ? null : next
        this.prev = prev === undefined ? null: prev
    }

    deleteNode(nodetoBeDeleted) {
        let next = nodetoBeDeleted.next;
        let prev = nodetoBeDeleted.prev;
        prev.next = next;
        next.prev = prev
    }

    insertAfter(afterNode, value) {
        let node = new DLL(value);
        let temp = afterNode.next;
        afterNode.next = node;
        node.prev = afterNode;
        node.next = temp;
        temp.prev = node;
        return node;
    }
}

class LRUCache {

    constructor(capacity) {
        this.capacity = capacity;
        const head = new DLL();
        const tail = new DLL();
        head.next = tail;
        tail.prev = head;

        this.head = head;
        this.tail = tail;
        this.list = head;
        this.map = {}; // not using JS map, since it persists insertion order and can be directky used as a DS for LRU Cache
    }

    size() {
        return Object.keys(this.map).length
    }

    get(key) {
        if(!this.map[key]) return -1;

        let node = this.map[key];
        let newNode = this.list.insertAfter(this.head, node.val);
        this.head.deleteNode(node);
        this.map[key] = newNode;
        return node.val.value;
    }

    put(key, value) {

        if(this.map[key] || this.size() >= this.capacity) {
           // we need to delete
           let nodetoBeDeleted = this.map[key];
           this.list.deleteNode(nodetoBeDeleted);
           delete this.map[nodetoBeDeleted.val.key];
        }
        let node = this.list.insertAfter(this.head, {key, value});
        this.map[key] = node;
      
    }


}



// let cache = new LRUCache(2)
// cache.put(1,1);
// cache.put(2,2);
// console.log(lruCacheToArray(cache)) // 2 1
// cache.get(1) // 1
// console.log(lruCacheToArray(cache)) // 1 2
// cache.put(3,3);
// console.log(lruCacheToArray(cache)) // 3 1
// cache.get(2) // -1 (nothing)
// console.log(lruCacheToArray(cache)) // 3 1
// cache.put(4,4);
// console.log(lruCacheToArray(cache)) // 4 3
// cache.put(4,5);
// console.log(lruCacheToArray(cache)) // 4 3


// ["LRUCache","put","put","put","put","put","get","put","get","get","put","get","put","put","put","get","put","get","get","get","get","put","put","get","get","get","put","put","get","put","get","put","get","get","get","put","put","put","get","put","get","get","put","put","get","put","put","put","put","get","put","put","get","put","put","get","put","put","put","put","put","get","put","put","get","put","get","get","get","put","get","get","put","put","put","put","get","put","put","put","put","get","get","get","put","put","put","get","put","put","put","get","put","put","put","get","get","get","put","put","put","put","get","put","put","put","put","put","put","put"]
// [[10],[10,13],[3,17],[6,11],[10,5],[9,10],[13],[2,19],[2],[3],[5,25],[8],[9,22],[5,5],[1,30],[11],[9,12],[7],[5],[8],[9],[4,30],[9,3],[9],[10],[10],[6,14],[3,1],[3],[10,11],[8],[2,14],[1],[5],[4],[11,4],[12,24],[5,18],[13],[7,23],[8],[12],[3,27],[2,12],[5],[2,9],[13,4],[8,18],[1,7],[6],[9,29],[8,21],[5],[6,30],[1,12],[10],[4,15],[7,22],[11,26],[8,17],[9,29],[5],[3,4],[11,30],[12],[4,29],[3],[9],[6],[3,4],[1],[10],[3,29],[10,28],[1,20],[11,13],[3],[3,12],[3,8],[10,9],[3,26],[8],[7],[5],[13,17],[2,27],[11,15],[12],[9,19],[2,15],[3,16],[1],[12,17],[9,1],[6,19],[4],[5],[5],[8,1],[11,7],[5,2],[9,28],[1],[2,2],[7,4],[4,22],[7,24],[9,26],[13,28],[11,26]]
// exp
// [null,null,null,null,null,null,-1,null,19,17,null,-1,null,null,null,-1,null,-1,5,-1,12,null,null,3,5,5,null,null,1,null,-1,null,30,5,30,null,null,null,-1,null,-1,24,null,null,18,null,null,null,null,-1,null,null,18,null,null,-1,null,null,null,null,null,18,null,null,-1,null,4,29,30,null,12,-1,null,null,null,null,29,null,null,null,null,17,22,18,null,null,null,-1,null,null,null,20,null,null,null,-1,18,18,null,null,null,null,20,null,null,null,null,null,null,null]

/**


 */


let input1 = ["LRUCache","put","put","put","put","put","get","put","get","get","put","get","put","put","put","get","put","get","get","get","get","put","put","get","get","get","put","put","get","put","get","put","get","get","get","put","put","put","get","put","get","get","put","put","get","put","put","put","put","get","put","put","get","put","put","get","put","put","put","put","put","get","put","put","get","put","get","get","get","put","get","get","put","put","put","put","get","put","put","put","put","get","get","get","put","put","put","get","put","put","put","get","put","put","put","get","get","get","put","put","put","put","get","put","put","put","put","put","put","put"]
let input2 =[[10],[10,13],[3,17],[6,11],[10,5],[9,10],[13],[2,19],[2],[3],[5,25],[8],[9,22],[5,5],[1,30],[11],[9,12],[7],[5],[8],[9],[4,30],[9,3],[9],[10],[10],[6,14],[3,1],[3],[10,11],[8],[2,14],[1],[5],[4],[11,4],[12,24],[5,18],[13],[7,23],[8],[12],[3,27],[2,12],[5],[2,9],[13,4],[8,18],[1,7],[6],[9,29],[8,21],[5],[6,30],[1,12],[10],[4,15],[7,22],[11,26],[8,17],[9,29],[5],[3,4],[11,30],[12],[4,29],[3],[9],[6],[3,4],[1],[10],[3,29],[10,28],[1,20],[11,13],[3],[3,12],[3,8],[10,9],[3,26],[8],[7],[5],[13,17],[2,27],[11,15],[12],[9,19],[2,15],[3,16],[1],[12,17],[9,1],[6,19],[4],[5],[5],[8,1],[11,7],[5,2],[9,28],[1],[2,2],[7,4],[4,22],[7,24],[9,26],[13,28],[11,26]]

let cache1 = new LRUCache(input2[0]);
let result = [null]
for(let i=1; i<input1.length; i++) {
    let action = input1[i];
    let input = input2[i];
    switch(action) {
        case "put":
            cache1.put(input[0], input[1]);
            result.push(null)
            break;
        
        case "get":
            let val = cache1.get(input[0]);
            result.push(val)
    }
}

console.log(result)