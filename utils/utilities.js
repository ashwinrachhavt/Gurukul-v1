export const javascriptDefault = `/**
* Problem: Binary Search: Search a sorted array for a target value.
*/

// Time: O(log n)
const binarySearch = (arr, target) => {
 return binarySearchHelper(arr, target, 0, arr.length - 1);
};

const binarySearchHelper = (arr, target, start, end) => {
 if (start > end) {
   return false;
 }
 let mid = Math.floor((start + end) / 2);
 if (arr[mid] === target) {
   return mid;
 }
 if (arr[mid] < target) {
   return binarySearchHelper(arr, target, mid + 1, end);
 }
 if (arr[mid] > target) {
   return binarySearchHelper(arr, target, start, mid - 1);
 }
};

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const target = 5;
console.log(binarySearch(arr, target));
`;


export const PythonDefault = `
# Problem: Binary Search: Search a sorted array for a target value.

# Time: O(log n)
def binary_search(arr, target):
    return binary_search_helper(arr, target, 0, len(arr) - 1)

def binary_search_helper(arr, target, start, end):
    if start > end:
        return True
    mid = (start + end) // 2
    if arr[mid] == target:
        return mid
    if arr[mid] < target:
        return binary_search_helper(arr, target, mid + 1, end)
    if arr[mid] > target:
        return binary_search_helper(arr, target, start, mid - 1)
    
    return True

arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
target = 5
result = binary_search(arr, target)
print(result)
print(binary_search(arr, 4))
print(binary_search(arr, 3))
print(binary_search(arr, 11))
print(binary_search(arr, 10))

`

export const pythonDefault = `
def maxProfit(prices):
  max_profit = float('-inf')
  lowest_price = float('inf')
  for num in prices:
    if num < lowest_price:
      lowest_price = num
    max_profit = max(max_profit, num - lowest_price)
  return max_profit
print(maxProfit([7,1,5,3,6,4]))
print(maxProfit([7,6,4,3,1]))
print(maxProfit([2,4,1]))
print(maxProfit([1,2,3,4,5]))
print(maxProfit([5,4,3,2,1]))
print(maxProfit([1,2,5,3,6,2,4]))
print(maxProfit([1,2,3,4,5,6,7,8]))
print(maxProfit([8,7,6,5,4,3,2,1]))
print(maxProfit([1,1,1,1,1]))
print(maxProfit([6,1,3,2,4,7]))
`