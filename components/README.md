# Web master team - How to contribute

In short, you create or edit a component's HTML, CSS, and javascript files and associated JSON data.

## Example: Making the Contact Page Component

### Step 1: Define a format for the JSON file

[What is JSON?](www.json.org)
Create a JSON file in the <code>data</code> folder named "contacts.json".
```JSON
[
    {
        "name":"Taylor Alison Swift",
        "picture":"data/sample.jpg",
        "phone":6666666666,
        "website":"http://taylorswift.com/"
    }
]
```
When you fetch the JSON file by javascript, you will receive an array A, where A[0] is an object with Taylor's contact information. e.g A[0].name = "Taylor Alison Swift", or A[0]['name']="Taylor Alison Swift".
The outermost structure of JSON could be [] or {}. The above example could also be written as:
```JSON
{
    "name":"Taylor Alison Swift",
    "picture":"data/sample.jpg",
    "phone":6666666666,
    "website":"http://taylorswift.com/"
}
```
in which case we can only store one contact information per JSON file (you can't have multiple objects in the root of a JSON file}. However,
```JSON
{
    "contacts":[
        {
            "name":"Taylor Alison Swift",
            "picture":"data/sample.jpg"
            "phone":6666666666,
            "website":"http://taylorswift.com/"
        }
    ]
}
```
could store multiple contacts, but the structure is more heavily nested.

The organization of the JSON file is totally up to you, as long as you use javascript Object Notation and can parse the data conveniently later. 
All JSON keys are stings (e.g "name","phone","website")
The basic value data types supported by JSON are:
- Numbers
- Boolean --- lowercase true and false, not True and False
- String --- Note: JSON only accepts double quotes "" not single ''.

### Step 2: Create/Edit the HTML
The HTML is the entry point to the component, be sure to update the filename in <code>menus.json</code> in <code>data</code> folder.
Here I have already created an empty contact.html and updated the menus.json
```JSON
"Contact Us": "contact.html"
```
Therefore, we will start with writing the HTML.
In this project, we wrap each HTML component with a template tag. This is to follow the trend of [WebComponents](http://webcomponents.org/).
```HTML
<template>
    Your code goes here
</template>
```
Next, we will create skeleton elements to fill in the data from contacts.json. This is where creativity comes in. You can choose any tree structure to display the contact information. In this example, I will use a card, following Google's [Material Style Guide](https://material.google.com/components/cards.html).
```HTML
<template>
    <section class="contact">
        <img src="" alt="Profile Picture"/>
        <h2>This will show the name</h2>
        <a href="tel:">This will show the phone number</a>
        <a href="">this will show the website</a>
    </section>
</template>
```
The content between <code>section</code> tag will deliver the data. <code>img</code> will display the profile picture when we assign a <code>href</code>, and the text content of other elements will be changed as well. Note that we didn't directly put the content under <code>template</code> because we expect to use the card structure multiple times (we have more than one contact!). Instead, we use a <code>section</code> so that later we can clone the structure easily.

### Create javascript file
The primary role of the js file is to fill data into HTML. It may also handle interaction and appearance.
Create a <code>contact.js</code> file under the <code>components</code> folder. Refer to it in the HTML file:
```HTML
<template id="contacts">
    <section class="contact">
        <img src="" alt="Profile Picture"/>
        <h2>This will show the name</h2>
        <a href="tel:">This will show the phone number</a>
        <a href="">this will show the website</a>
    </section>

    <script src="components/contact.js"></script>

</template>
```
We will start by fetching the contacts.json file we created in Step 1.
```javascript
(function loadContact() {
    AjaxPromise('get', 'data/team.json', 'json')
})()
```
Here the loadContact function is an [Immediately-invoked function expression](http://benalman.com/news/2010/11/immediately-invoked-function-expression/). In short, we defined a function loadContact, wraps it with () so that is acts like a function pointer, and call it immediately with the following (). It is similar to:
```javascript
function loadContact() {
    AjaxPromise('get', 'data/team.json', 'json')
}
loadContact()
```
The <code>AjaxPromise</code> function is a help function I wrote in <cpde>helpftn.js</cpde> in the <code>js</code> folder. It simplifies the syntax for requesting resources. <code>AjaxPromise</code> takes in three inputs:nmethod of request, url, and the expected type of response. Here we send a 'get' request to say we need some data from server at the url of the second argument. We expect to receive a .json file. The function returns a [Promise](https://spring.io/understanding/javascript-promises) object (not the value of the json requested!) because it takes time for the server to fetch and send the resource requested, and we don't want the page to stop responding when waiting for this resource. We use it by calling its <code>.then</code> method.
```javascript
(function loadContact() {
    AjaxPromise('get', 'data/team.json', 'json').then(response=>{response.forEach()})
})()
```
<code>.then</code> takes in a function and call it with input of the result from the HTTP request (in this case the javascript Array containing Objects which contain contact information). Inside <code>.then</code> in an [Arrow Function](https://developer.mozilla.org/en/docs/Web/javascript/Reference/Functions/Arrow_functions). It is a new feature and it largely simplifies syntax. In short, the following are similar
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
Since <code>response</code> is an array, we can iterate with its <code>.forEach</code> method.
```javascript
response.forEach(({name,picture,phone,website})=>{
    // load each contact
})
```