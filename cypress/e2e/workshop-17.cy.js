/**
 * Workshop #17
 *
 * Task #1
 * Topic: Array.length + Array.push()
 * 1. Create new spec file, which would validate how many options for priorities Jira issue have
 * 2. Access the field of priorities
 * 3. Invoke values from the field and save them into an Array
 * 4. Assert invoked array to be the same length as we expect it to be
 * 5. Invoked array will have initially 4 elements in it, push fifth element from initially selected priority value
 *
 * Expected result:
 * You have a test that validates values in issue priorities
 * Finished array must have 5 elements: [“Lowest“, “Low“, “Medium”, “High“, “Highest”]

 * Task #2
 * Topic: Regex
 * 1. Create new spec file with opening or creating new issue
 * 2. Open the created issue and invoke assignee name
 * 3. Assert that it has only characters in it (no numbers, no special characters etc).
 * Regex to be used: /^[A-Za-z]*$/
 *
 * Expected result:
 * 1. You will have a test that validates assignee matching defined characters
 *

 * Task #3
 * Topic: String.trim()
 * 1. Create new spec file with creating new issue
 * 2. Define issue title as a variable and add multiple spaces between words
 *      Example: const title = 'Hello             world';
 * 3. Create issue with this title, save the issue and observe it on the board (issue on the board will not have extra spaces and be trimmed)
 * 4. Invoke issue title from the board and assert it with variable defined, but remove extra spaces from it
 *
 * Expected result:
 * 1. You will have a test that validates, that issue title on the board does not have extra spaces in it
 
 * Task #4
 * Add new test to test file  issue-detail-edit-3.cy.js.
 * 1. Predefine empty array variable. Decide, which definition is needed: const or let?
 * 2. Push into the array first element from initially selected priority value.
 * 3. Access the list of all priority options (you have to open the list before by clicking on the priority field)
 * 4. Loop through the elements: each time invoke text value from the current field and save it into an Array. 
 * 5. Print out added value and length of the array during each iteration, using cy.log(…) command.
  
 * As a result Array will have 5 elements:
 * [“High“, “Lowest“, “Low“, “Medium”, “Highest”]
   
 * Bonus task: validate on the last cycle iteration, that saved array has length as predefined constant number.

 * workshop #17 tasks #1 & #2 done at page „issue-filtering-5.cy“
 * workshop #17 tasks #3 & #4 done at page „issue-details-edit-3.cy“

 */

