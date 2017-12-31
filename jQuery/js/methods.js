// ********** .text() **********

// $('hi').text();
// $('ul').text();
// $('li').text();
// $('h1').text("New Text!!!");
// $('li').text("Rusty, Colt's dog, is adorable");

// ********** .html() **********

// $('ul').html();
// $('ul').html("<li>I hacked your UL!</li><li>Rusty is still adorable!</li>");
// $('li').html("<a href='http://www.google.com'>CLICK ME TO GO TO GOOGLE</a>");

// ********** .attr() **********

$('img').css("width", "200px");
// $('img').attr("src", "https://c3.staticflickr.com/3/2418/2243463214_f32ab004af_b.jpg");
$('img:first-of-type').attr("src", "https://c3.staticflickr.com/3/2418/2243463214_f32ab004af_b.jpg");
$('img').last().attr("src", "https://c3.staticflickr.com/3/2418/2243463214_f32ab004af_b.jpg");
$('img').attr("src", "https://c1.staticflickr.com/2/1445/23931141974_a71b3f5483_b.jpg");
// $('input').attr("type", "color");

// ********** .val() **********

// $('input').val();
// $('input').val("Rusty Steele");
// $('input').val("");
// $('select').val();

// ********** .addClass(), .removeClass(), .toggleClass() **********
// $('h1').addClass("correct");
// $('h1').removeClass("correct");
$('li').addClass("correct");
$('li').toggleClass("correct");
$('li').first().toggleClass("done");
$('li').toggleClass("done");