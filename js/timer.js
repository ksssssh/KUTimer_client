const timerdom = document.querySelectorAll('#timer > div > p.title');
const jgdatedom = document.querySelector('#jgdate');
APIURL = 'http://test1.mycs.today/jgdates/';
let jgdate;

function setJGDate(){
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate();
    fetch(APIURL+year+'/')
        .then((response) => response.json())
        .then((data) => {
            const datelist = [data.date1, data.date2, data.date3, data.date4];
            let found = false;
            let isvacation = true;
            for(let item of datelist){
                const md = item.split('/');
                const newmonth = parseInt(md[0]) - 1;
                const newdate = parseInt(md[1]);
                if(newmonth - month > 0 || (newmonth == month && newdate - date > 0)){
                    jgdate = new Date(year, newmonth, newdate);
                    found = true;
                    break;
                }
                isvacation = !isvacation;
            }
            if(!found){
                jgdate = new Date(year+1, 2, 2);
            }
            jgdatedom.innerText = `${isvacation ? "개강" : "종강"} (${jgdate.getFullYear()}-${jgdate.getMonth()+1}-${jgdate.getDate()}) 까지 남은 시간`;

        }).then(getClock);
};

function getClock(){
    const current = new Date();
    let interval = jgdate.getTime() - current;
    if(interval < 0){
        setJGDate();
    }
    else{
        const days = Math.floor(interval / (1000*60*60*24));
        interval -= days * (1000*60*60*24);
        const hours = Math.floor(interval / (1000*60*60));
        interval -= hours * (1000*60*60);
        const minutes = Math.floor(interval / (1000*60));
        interval -= minutes * (1000*60);
        const seconds= Math.floor(interval / (1000));
        timerdom[0].innerText = days;
        timerdom[1].innerText = hours;
        timerdom[2].innerText = minutes;
        timerdom[3].innerText = seconds;
    }
};

setJGDate();

setInterval(getClock, 1000);