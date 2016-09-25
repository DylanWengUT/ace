(function loadSponsors() {
    const sample = $('.sponsor');
    const tem = sample.parentNode;
    AjaxPromise('get', 'data/sponsors.json', 'json').then(response => {
        response.forEach(({ pic, name, link }) => {
            const newNode = sample.cloneNode(sample, true);
            const [img] = newNode.children;
            newNode.href = link
            img.setAttribute('src', pic);
            img.setAttribute('alt', name);
            tem.appendChild(newNode);
        })
        deletE(sample)
        container.style.visibility = "visible"
    }).catch(console.log)
})()