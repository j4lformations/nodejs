function myFunction() {
    let x = document.getElementById("myTopNav");
    if (x.className === 'topnav') {
        x.className += " responsive";
    }else {
        x.className = "topnav";
    }
}