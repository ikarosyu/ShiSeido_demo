let
    lis = $(".bannerUL li"),
    len = lis.length,
    currentIndex = 0,
    nextIndex = 1;

console.log(lis, len);

function move() {
    $(lis[currentIndex]).fadeOut();
    $(lis[nextIndex]).fadeIn();

    currentIndex = nextIndex;
    nextIndex++;
    if (nextIndex >= len) {
        nextIndex = 0;
    }
}

let timer = setInterval(move, 4000);

$("#goPrev").on('click', function () {
    nextIndex = currentIndex - 1;
    if (nextIndex < 0)
        nextIndex = len - 1;
    move();
});
$("#goNext").on("click", move);