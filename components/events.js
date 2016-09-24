(function loadEvents() {
    const sample = $('.event');
    const tem = sample.parentNode;
    AjaxPromise('get', 'data/events.json', 'json').then(response => {
        let main = true;
        response.forEach(({ event, pic, description, location, time, link }) => {

            if (main) {
                main = false
                var newNode = $('#mEvent')
                var [img, banner] = newNode.children;
                var [h, p, a, info] = banner.children;
                a.setAttribute('href', link)
            } else {
                var newNode = sample.cloneNode(sample, true);
                var [img, h, p, info] = newNode.children;
                var [loc, tim] = info.children;
                loc.textContent = location
                tim.textContent = time;
            }
            img.setAttribute('src', pic);
            h.textContent = event;
            p.textContent = description;
            tem.appendChild(newNode);

        })
        sample.style.display = 'none';
    })
})()