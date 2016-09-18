AjaxPromise('get', 'components/navbar.html', 'document').then(doc => {
    const tem = $('template', doc);
    const nav = document.importNode($('#navTop', tem.content),true);
    document.body.appendChild(nav);
})