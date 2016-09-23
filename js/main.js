let mounted = false;

function loadNavigation() {
    const nav = $('#navTop')
    AjaxPromise('get', 'data/menus.json', 'json')
        .then(response => {
            response.forEach(item => {
                const ele = creatE('a', { class: 'menuItem' });
                ele.textContent = item;
                ele.setAttribute('href', '#' + item)
                nav.appendChild(ele);
            })
            navigate();
        })
}

function navigate() {
    $('a[href="#About Us"]').addEventListener('click', ev => {
        if (mounted) $('#container').innerHTML = '';
        AjaxPromise('get', 'components/team.html', 'document').then(doc => {
            const tem = $('template', doc);
            const team = document.importNode(tem.content, true);
            $('#container').appendChild(team);
            mounted = true;
        })
    })
    $('a[href="#Events"]').addEventListener('click', ev => {
        if (mounted) $('#container').innerHTML = '';
        AjaxPromise('get', 'components/events.html', 'document').then(doc => {
            const tem = $('template', doc);
            const events = document.importNode(tem.content, true);
            $('#container').appendChild(events);
            mounted = true;
        })
    })
    if (window.location.href.endsWith('About Us')) {
        $('a[href="#About Us"]').click();
    } else if (window.location.href.endsWith('Events')) {
        $('a[href="#Events"]').click()
    }
}

loadNavigation();