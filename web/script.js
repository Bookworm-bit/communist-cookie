function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (e) {
  if (!e.target.matches('.dropbtn')) {
    var myDropdown = document.getElementById("myDropdown");
    if (myDropdown.classList.contains('show')) {
      myDropdown.classList.remove('show');
    }
  }
}


function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (e) {
  if (!e.target.matches('.dropbtn')) {
    var myDropdown = document.getElementById("myDropdown");
    if (myDropdown.classList.contains('show')) {
      myDropdown.classList.remove('show');
    }
  }
}

$(document).ready(function () {
  $(".hide").hide();


  $(".marker-russia").click(function () {
    $(".hide").hide();
    $(".russia-txt").fadeIn(300);
  });

  $(".marker-usa").click(function () {
    $(".hide").hide();
    $(".usa-txt").fadeIn(300);
  });

  $(".marker-uk").click(function () {
    $(".hide").hide();
    $(".uk-txt").fadeIn(300);
  });

  $(".marker-brazil").click(function () {
    $(".hide").hide();
    $(".brazil-txt").fadeIn(300);
  });

});