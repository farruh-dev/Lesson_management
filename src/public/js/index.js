
document.addEventListener('DOMContentLoaded', function () {
    var selects = document.querySelectorAll('select');
    var selectInstances = M.FormSelect.init(selects, {
        classes: "select"
    });

    var dropdowns = document.querySelectorAll('.dropdown-trigger');
    var dropdownInstances = M.Dropdown.init(dropdowns, {
        alignment: "right",
        coverTrigger: false
    });

    var sidenavs = document.querySelectorAll('.sidenav');
    var sidenavInstances = M.Sidenav.init(sidenavs, {
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


// $(document).ready(function() {

//     $(window).scroll(function() {

//         console.log("WORKING")

//         var height = '50';
//         var scrollTop = $(window).scrollTop();

//         if (scrollTop >= height - 40) {
//             $('.my_navbar').addClass('solid-nav');
//         } else {
//             $('.my_navbar').removeClass('solid-nav');
//         }

//     });
// });
