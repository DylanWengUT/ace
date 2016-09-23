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
    $('a[href="#Our Sponsors"]').addEventListener('click', ev => {
        if (mounted) $('#container').innerHTML = '';
        AjaxPromise('get', 'components/sponsors.html', 'document').then(doc => {
            const tem = $('template', doc);
            const sponsors = document.importNode(tem.content, true);
            $('#container').appendChild(sponsors);
            mounted = true;
        })
    })
    $('a[href="#Contact Us"]').addEventListener('click', ev => {
        if (mounted) $('#container').innerHTML = '';
        AjaxPromise('get', 'components/contact.html', 'document').then(doc => {
            const tem = $('template', doc);
            const contact = document.importNode(tem.content, true);
            $('#container').appendChild(contact);
            mounted = true;
        })
    })
    if (window.location.href.endsWith('About Us')) {
        $('a[href="#About Us"]').click();
    } else if (window.location.href.endsWith('Events')) {
        $('a[href="#Events"]').click()
    } else if (window.location.href.endsWith('Sponsors')) {
        $('a[href="#Out Sponsors"]').click()
    } else if (window.location.href.endsWith('Contact Us')) {
        $('a[href="#Contact Us"]').click()
    }
}

loadNavigation();