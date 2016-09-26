# Webmaster Team - How to Contribute

In short, you create or edit a component's HTML, CSS, and javascript files and associated JSON data.

## Example: Making the About Page Component

### Step 1: Define a format for the JSON file

[What is JSON?](www.json.org) It is a file format that stores data easily readable and accessible by humans and programming languages.
Create a JSON file in the <code>data</code> folder named "about.json" and paste the following text into it.
```JSON
{
    "title":"What Are We?",
    "picture":"data/sample.jpg",
    "text":"We are ACE! We help students ACE in academics and in life!"
}
```
When you fetch the JSON file by javascript, you will get an object A with the information. e.g A.title = "What Are We?", or A['title']="What Are We?".
The outermost structure of JSON could be [] or {}. The above example could also be written as:
```JSON
[{
    "title":"What Are We?",
    "picture":"data/sample.jpg",
    "text":"We are ACE! We help students ACE in academics and in life!"
},{
    "title":"What Are We?",
    "picture":"data/sample.jpg",
    "text":"We are ACE! We help students ACE in academics and in life!"
}]
```
in which case we can store multiple pieces of information.

The organization of the JSON file is totally up to you, as long as you use javascript Object Notation and can parse the data conveniently later. 
All JSON keys are strings (e.g "title","picture","text")
The basic value data types supported by JSON are:
- Numbers
- Boolean --- lowercase true and false, not True and False
- String --- Note: JSON only accepts double quotes "" not single ''.
- Plain Array or Object --- You can't store an HTML element directly into a json file, but you can store the data it represents.

### Step 2: Create/Edit the HTML
The HTML is the entry point to the component, be sure to update the filename in <code>menus.json</code> in <code>data</code> folder.
Here I have already created an empty contact.html and updated the menus.json
```JSON
"About": "about.html"
```
Therefore, we will start with writing the HTML.
In this project, we wrap each HTML component with a template tag. This is to follow the trend of [WebComponents](http://webcomponents.org/).
```HTML
<template>
    Your code goes here
</template>
```
Next, we will create elements to fill in the data from about.json.
```HTML
<template>
    <main class="about">
        <h1></h1>
        <img src="" alt="ACE"/>
        <p></p>
    </main>
</template>
```
The content between <code>main</code> tag will deliver the data. We will use javascript to load about.json and fill into corresponding elements.

### Step 3: Create javascript file
The primary role of the js file is to fill data into HTML. It may also handle interaction and appearance.
Create a <code>about.js</code> file under the <code>components</code> folder. Refer to it in the HTML file:
```HTML
<template>
    <main class="about">
        <h1></h1>
        <img src="" alt="ACE"/>
        <p></p>
    </main>

    <script src="components/about.js"></script>

</template>
```
We will start by fetching the about.json file we created in Step 1.
```javascript
(function loadAbout() {
    AjaxPromise('get', 'data/about.json', 'json')
})()
```
Here the loadAbout function is an [Immediately-invoked function expression](http://benalman.com/news/2010/11/immediately-invoked-function-expression/). In short, we defined a function loadAbout, wraps it with () so that is acts like a function pointer, and call it immediately with a following (). It is similar to:
```javascript
function loadAbout() {
    AjaxPromise('get', 'data/about.json', 'json')
}
loadAbout()
```
The <code>AjaxPromise</code> function is a help function I wrote in <cpde>helpftn.js</cpde> in the <code>js</code> folder. It simplifies the syntax for requesting resources. <code>AjaxPromise</code> takes in three inputs:method of request, url, and the expected type of response. Here we send a 'get' request to say we need some data from server at the url of the second argument. We expect to receive a .json file. The function returns a [Promise](https://spring.io/understanding/javascript-promises) object (not the value of the json requested!) because it takes time for the server to fetch and send the resource requested, and we don't want the page to stop responding when waiting for this resource. We use it by calling its <code>.then</code> method.
```javascript
(function loadAbout() {
    AjaxPromise('get', 'data/about.json', 'json').then(({title,picture,text})=>{})
})()
```
<code>.then</code> takes in a function and call it with input of the result from the HTTP request (in this case a javascript Object). Inside <code>.then</code> in an [Arrow Function](https://developer.mozilla.org/en/docs/Web/javascript/Reference/Functions/Arrow_functions). It is a new feature and it largely simplifies syntax. In short, the following are similar
```javascript
num=>num*2

or

num=>{
    return num*2
}

or

function anonymous(num){
    return num*2
}
```
Since we know we'll receive an object with the keys{title,picture,text} (corresponding to the json file we created in Step 1), we can just use <code>({title,picture,text})</code> as the input of the function. We can fill the data into <code>about.html</code>
```HTML
<template>
    <main class="about">
        <h1></h1>
        <img src="" alt="ACE"/>
        <p></p>
    </main>

    <script src="components/about.js"></script>

</template>
```
```javascript
// inside the .then method
({title,picture,text})=>{
    const root = $('.about') // select the main element
    const [h1,img,p] = root.children
    // Here the root.children is an HTML Collection of the children elements of root. 
    // It is like an array, since we know it has three children, we will pre decompose it
    // and assign them to three variables h1, img, and p. These do not have to be the same
    // as HTML tag names, I do so for convenience.
    h1.textContent = title
    img.setAttribute('href',picture)
    p.textContent = text
    // fill data into elements
}
```
Hooo! That is some heavy coding. Now most parts are done. Only one last step for optimization
```javascript
// inside the .then method
({title,picture,text})=>{
    const root = $('.about') // select the main element
    const [h1,img,p] = root.children
    // Here the root.children is an HTML Collection of the children elements of root. 
    // It is like an array, since we know it has three children, we will pre decompose it
    // and assign them to three variables h1, img, and p. These do not have to be the same
    // as HTML tag names, I do so for convenience.
    h1.textContent = title
    img.setAttribute('href',picture)
    p.textContent = text
    // fill data into elements
    container.style.visibility = "visible"
    // here container refers to the container in which this component will 
    // be mounted in index.html. In main.js, before loading this components,
    // the container is hidden. Then after loading is complete, we restore its
    // visibility. That way, users won't see some crappy text when the components is in the middle of loading.
}
```
and the whole js looks like this:
```javascript
(function loadAbout() {
    AjaxPromise('get', 'data/about.json', 'json').then(({title,picture,text})=>{
        const root = $('.about') // select the main element
        const [h1,img,p] = root.children
        // Here the root.children is an HTML Collection of the children elements of root. It is like an array, since we know it has three children, we will pre decompose it and assign them to three variables h1, img, and p. These do not have to be the same as HTML tag names, I do so form convenience.
        h1.textContent = title
        img.setAttribute('href',picture)
        p.textContent = text
        // fill data into elements
        container.style.visibility = "visible"
        // here container refers to the container in which this component will be mounted in index.html. In main.js, before loading this components, the container is hidden. Then after loading is complete, we restore its visibility. That way, users won't see some crappy text when the components is in the middle of loading.
    })
})()
```
### Step 4: Create Style
If you run the webpage now, you should see some really ugly text and picture. We need to format and decorate them with CSS. First create about.css under components folder and link to it in about.html
```HTML
<template>
    <main class="about">
        <h1></h1>
        <img src="" alt="ACE"/>
        <p></p>
    </main>

    <link rel="stylesheet" href="components/about.css">
    <script src="components/about.js"></script>

</template>
```
