const pages = document.querySelectorAll('body > section.page');
const max_page = pages.length;
let cur_page = 0;
let touched;

window.addEventListener("load", function() {

    setTimeout(scrollTo, 0, 0, 1);

}, false);

// 기본 휠 이벤트 제거
window.addEventListener("wheel", function(e){
	e.preventDefault();
},{passive : false});

// 페이지 이동 함수
function goPage(page){
    pages[page].scrollIntoView({block : "start", inline : "start", behavior : "smooth"});
};

// 휠 이벤트에 이동함수 등록
window.addEventListener('wheel', (e) => {
    if(e.deltaY > 0){
        cur_page += 1;
    }
    else{
        cur_page -= 1;
    }
    if(cur_page < 0){
        cur_page = 0;
    }
    if(cur_page >= max_page){
        cur_page = max_page-1;
    }
    goPage(cur_page);
});


//터치 이벤트 등록
window.addEventListener('touchstart', (e) => {
    touched = e.changedTouches[0].screenY;
});
window.addEventListener('touchmove', (e) => {
    const newtouched = e.changedTouches[0].screenY;
    const change = touched - newtouched;
    if(Math.abs(change) > 60){
        if(change > 0){
            cur_page += 1;
        }
        else{
            cur_page -= 1;
        }
        touched = newtouched;
        if(cur_page < 0){
            cur_page = 0;
        }
        if(cur_page >= max_page){
            cur_page = max_page-1;
        }
        goPage(cur_page);
    }
});

// 초기 페이지 초기화
goPage(cur_page);
