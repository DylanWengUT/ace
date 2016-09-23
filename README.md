# ACE Homepage
This repository is for the ACE homepage.

# Web master team - How to contribute
## Directory Structure
- root
  - index.html --> the main page
  - css --> global stylesheets (the style rules that apply to all pages on the ACE website)
  - data --> stores information such as team members, navigation options, and profile pictures
  - fonts (DO NOT MODIFY) --> a dependency of materialize.css. It makes the website fonts look nice.
  - js --> global scripts (the scripts that will be valid at all time regardless of the pages you are in)
  - components (most of development will com here) --> each webpage is a component, mounted on the body of index.html

## Setting up the environment
- Any server code that serves files from the root of this repository will work, I am using Node.js
- Node.js static server Tutorial
  - coming soon

## Some code conventions
- [ECMAScript 2015](https://babeljs.io/docs/learn-es2015/) syntax
- Avoid heavily nested DOM structure. Try other methods before wrapping a single element with a div
- Use dependencies/libraries/frameworks only if it reduces coding significantly and can be applied widely

## Create a component
- Create new .html and possibly .js and .css file in the components folder
- All html components are wrapped by template tag
- Link .js and .css files, path starting with "components/"
- Add features
- Add click event listeners in main.js
- Test in your browser
- Pull request

## Edit a component

### Edit data
- Find the corresponding data file in the data folder
- Modify data in JSON format. [What is JSON?](www.json.org)   [How to use it?](http://www.w3schools.com/json/)
- Save the changes and Test it in the browser
- Pull request

### Edit an HTML component
- Find the .html file in components folder
- Find the .js and .css file corresponding to that component
- Modify as needed
- Save the changes and Test it in the browser
- Pull request

# Progress
- building a skeleton for the static elements
  - [x] about us
  - [ ] logo
  - [ ] events
  - [ ] sponsors
  - [ ] contact
  - [ ] input real data
  - [ ] route with #href
- full page homepage
- adding interactive features
  - sign up for events
  - sign up for membership
  - payment
  - event gallery view
- making it mobile friendly
- making it into a progressive web app
- optimize performance