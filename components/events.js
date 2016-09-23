(function loadEvents() {
    const sample = $('.event');
    const tem = sample.parentNode;
    AjaxPromise('get', 'data/events.json', 'json').then(response => {
        response.forEach(({ event, pic, description, location, time }) => {
            const newNode = sample.cloneNode(sample, true);
            const [img, h2, p, info] = newNode.children;
            const [loc, tim] = info.children;
            img.setAttribute('src', pic);
            h2.textContent = event;
            p.textContent = description;
            loc.textContent = location
            tim.textContent = time;
            tem.appendChild(newNode);
        })
        sample.style.display = 'none';
    })
})()