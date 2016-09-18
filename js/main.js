const nav = $('#navTop')
AjaxPromise('get', 'data/menus.json', 'json')
    .then(response => {
        response.forEach(item => {
            const ele = creatE('a', { class: 'menuItem' });
            ele.textContent = item;
            ele.setAttribute('href', '#' + item)
            nav.appendChild(ele);
        })
        loadNavigation();
    })

function loadNavigation() {
    $('a[href="#About Us"]').addEventListener('click', ev => {
        if (window.location.href.endsWith('About Us')) {
            $('main').innerHTML = '';
        }
        AjaxPromise('get', 'components/team.html', 'document').then(doc => {
            const tem = $('template', doc);
            const team = document.importNode(tem.content, true);
            $('#container').appendChild(team);
        })
    })
}