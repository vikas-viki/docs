Given an array arr[] of integers, where each element arr[i] represents the number of pages in the i-th book. You also have an integer k representing the number of students. The task is to allocate books to each student such that:

Each student receives atleast one book.
Each student is assigned a contiguous sequence of books.
No book is assigned to more than one student.
The objective is to minimize the maximum number of pages assigned to any student. In other words, out of all possible allocations, find the arrangement where the student who receives the most pages still has the smallest possible maximum.

Note: If it is not possible to allocate books to all students, return -1.

Input: arr[] = [12, 34, 67, 90], k = 2
Output: 113
Explanation: Allocation can be done in following ways:
=> [12] and [34, 67, 90] Maximum Pages = 191
=> [12, 34] and [67, 90] Maximum Pages = 157
=> [12, 34, 67] and [90] Maximum Pages = 113.
The third combination has the minimum pages assigned to a student which is 113.

1. Approach
   1. find out the range in which the books can be allocated, which is 0 -> sum(all_books_pages).
   2. now we know that for any student, the maximum number of pages allocated, will be within the range.
   3. now we've to find the value (within the range) which is valid.
   4. now we apply binary search on the range we have.
   5. we take a mid and check if its valid
      1. if its valid, we store it as an answer, but there might be even lesser value than that, so we search on that.
      2. if its not valid, meaning, that number of pages can't distributed among students, so we search on right half.
   6. how do we check if its valid.
      1. we'll start by assigning books to the students.
         1. if we give the current book to the student, will it be valid, if so give it to the current student
         2. if not, give it to the next student.
      2. finally check if the number of students got the book, is the number of students there were.