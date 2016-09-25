(function loadTeam() {
    const sample = $('.ppl');
    const tem = sample.parentNode;
    AjaxPromise('get', 'data/team.json', 'json').then(response => {
        response.forEach(({ pic, name, title, intro, contact }) => {
            const newNode = sample.cloneNode(sample, true);
            const [img, cont] = newNode.children;
            const [h2, h3, p, div] = cont.children;
            img.setAttribute('src', pic);
            h2.textContent = name;
            h3.textContent = title;
            p.innerHTML = intro;
            div.innerHTML = contact;
            tem.appendChild(newNode);
        })
        deletE(sample)
        container.style.visibility = "visible"
    }).catch(console.log)
})()