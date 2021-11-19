
document.addEventListener('DOMContentLoaded', function () {
    var selects = document.querySelectorAll('select');
    var selectInstances = M.FormSelect.init(selects, {
        classes: "select"
    });

    var sidenavs = document.querySelectorAll('.sidenav');
    var sidenavInstances = M.Sidenav.init(sidenavs, {
        edge: "right",
        draggable: true,
        preventScrolling: true,
        onOpenEnd: disableBodyScroll(),
        onCloseEnd: enableBodyScroll()
    });
});

function disableBodyScroll(){
    document.body.style.overflow = "hidden"
}
function enableBodyScroll(){
    document.body.style.overflow = "auto"
}

var dropdowns = document.querySelectorAll('.dropdown-trigger')
for (var i = 0; i < dropdowns.length; i++) {
    M.Dropdown.init(dropdowns[i]);
}
