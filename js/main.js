let mounted = false;
const container = $('#container')

function loadNavigation() {
    const nav = $('#navTop')
    AjaxPromise('get', 'data/menus.json', 'json')
        .then(response => {
            for (let item in response) {
                const ele = creatE('a', { class: 'menuItem' });
                ele.textContent = item;
                ele.setAttribute('href', '#' + item)
                nav.appendChild(ele);
                bindComponentToLink(item, response[item]);
            }
            return Object.keys(response)
        }).then(links => navigate(links))
}

function bindComponentToLink(link, filename) {
    $(`a[href="#${link}"]`).addEventListener('click', ev => {
        if (ev.ctrlKey) return false;
        container.style.visibility = "hidden"
        if (mounted) container.innerHTML = '';
        AjaxPromise('get', `components/${filename}`, 'document').then(doc => {
            const tem = $('template', doc);
            const com = document.importNode(tem.content, true);
            container.appendChild(com);
            mounted = true;
        })
    })
}

function navigate(links) {
    links.forEach(link => {
        if (window.location.href.endsWith(link)) {
            const a = $(`a[href="#${link}"]`)
            a.click();
            a.focus();
        }
    })
}

loadNavigation();
bindComponentToLink("Home", "home.html")
navigate(["Home"]);
if (window.location.href.endsWith("/")) {
    $('a[href="#Home"]').click();
}