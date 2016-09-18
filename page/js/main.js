const nav = $('#navTop')
AjaxPromise('get', '/data/menus.json').then(response => {
    const menus = JSON.parse(response);
    menus.forEach(item => {
        const ele = creatE('div', { class: 'menuItem' });
        ele.textContent = item;
        nav.appendChild(ele);
    })
})