const localStorage = window.localStorage;
const accessAuthentification = 'HERMES-ACCESS-TOKEN';
const refreshAuthentification = 'HERMES-REFRESH-TOKEN';
const defaultServerUrl = `http://localhost:8080`;
let categoryFlag = false;
let categoryData = "YOUTUBE";
let sortData = "RECENT";
let pageData = "0";
let youtubeCnt = 0;
let newsCnt = 0;
let jobCnt = 0;
let youtubeRestCnt = 0;
let newsRestCnt = 0;
let jobRestCnt = 0;
let youtubeLastLine = 0;
let newsLastLine = 0;
let jobLastLine = 0;

let viewCntUrl = "";
let viewCntContentsType = "";

let isActiveMain = () => {
    let xhr = new XMLHttpRequest();
    if(getCookie(accessAuthentification)==null) {
        
       // moveLoginPage(); // 쿠키정보가 없을 경우 설정
       xhr.onreadystatechange=() => {
        if(xhr.readyState == 4 && xhr.status==200) {
            let account = document.querySelector('#account-info');
            account.innerHTML=`
            <li class="nav-item"><a class="nav-link" onclick="moveLoginPage()">로그인</a></li>
            <li class="nav-item"><a class="nav-link" onclick="isAccountSignUp()">회원가입</a></li>
            `

            document.querySelector('#section-info2').innerHTML='';
            document.querySelector('#section-info3').innerHTML='';
            let data = JSON.parse(xhr.responseText);

            let top10Section = document.querySelector('#section-info');
            let top10DataList = '';

            for(let i=0; i<10; i++){
                top10DataList+=`
                <div class="col mb-5" onclick="addViewCount('${data[i].url}','${data[i].contentsProviderType}')">
                    <div class="card h-100">
                        <img class="mainContents-image" src="${data[i].image}" alt="..." />
                        <div class="card-body p-4">
                            <div class="text-center">
                                <h5 class="mainContents-title">${data[i].title}</h5>
                                <p class="mainContents-service">${data[i].contentsProviderType}</p>
                                <p class="mainContents-category">${data[i].category}</p>
                                <p class="mainContents-date">${data[i].contentsDate}</p>
                                <p class="mainContents-cnt">조회수 : ${data[i].viewCnt}</p>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            }

            top10Section.innerHTML=`
                <div class="container px-4 px-lg-5 mt-5">
                    <h5 class="fw-bolder">TOP-10</h5>
                        <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">${top10DataList}</div>
                </div>`;
        }
    }
        xhr.open("GET", defaultServerUrl+`/contents/main?type=YOUTUBE_AND_NEWS`, true);
        xhr.setRequestHeader(accessAuthentification,getCookie(accessAuthentification));
        xhr.send();
    } else {
        let account = document.querySelector('#account-info');
        account.innerHTML=`
        <li class="nav-item" id="user-id-info"><a class="nav-link active" aria-current="page" href="/">${localStorage.getItem('loginId')}님</a></li>
        <li class="nav-item"><a class="nav-link" onClick="isAccountMypage()">마이페이지</a></li>
        <li class="nav-item"><a class="nav-link" onClick="isAccountLogout()">로그아웃</a></li>
        <li class="nav-item"><a class="nav-link" onClick="isChangeSubscribe()">구독</a></li>
        `

        categoryYoutube();
        categoryNews();
        categoryJob();
        findSubscribe(); 
    }
}

let isEmptyInsertNull = (data) => {
    if(data=='' || data==undefined) {
        return null;
    } else {
        return data;
    }
}

let setCookie = (accessToken, refreshToken) => {
    let data = new Date();
    data.setTime(data.getTime() + 60*60*1000);
    document.cookie = accessAuthentification+'='+accessToken+';' +accessAuthentification+'=; expires='+data.toUTCString()+'; path=/';
    data.setTime(data.getTime() + 72*60*60*1000);
    document.cookie = refreshAuthentification+'='+refreshToken+';'+refreshAuthentification+'=; expires='+data.toUTCString()+'; path=/';
}

let getCookie = (name) => {
    let value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value? value[2] : null;
}  

let deleteCookie = (name) => {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}  


let isChangeCategory = () => {
    if(categoryFlag==true){
        document.querySelector("#section-info2").style.display = "none";
        document.querySelector("#section-info3").style.display = "none";
    }
};

let addViewCount = (redirectUrl,contentsType) => {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        console.log(xhr.status);
        if(xhr.readyState == 4 && xhr.status==200){
            window.location.href=redirectUrl;
        }
    };

    let viewCntDto = {
        url: redirectUrl,
        contentsProviderType: contentsType
    };

    let requestData = JSON.stringify(viewCntDto);

    xhr.open("POST",defaultServerUrl + `/url-record/`,true);
    xhr.setRequestHeader("Content-Type","application/json");
    xhr.send(requestData);

};

let refreshToken = (afterEvent) => {
    let xhr2 = new XMLHttpRequest();
    xhr2.onreadystatechange=() => {
        if(xhr2.readyState == 4 && xhr2.status==200) {
            let data = JSON.parse(xhr2.responseText);
            setCookie('Bearer '+data.accessToken,'Bearer '+data.accessToken);
            afterEvent();
        }
        if(xhr2.readyState == 4 && xhr2.status==401) {
            alert("세션이 만료되었습니다");
            moveLoginPage();
        }
    }
    xhr2.open("GET", defaultServerUrl+`/user/refresh-token`, true);
    xhr2.setRequestHeader("Content-Type", "application/json")
    xhr2.setRequestHeader(refreshAuthentification,getCookie(refreshAuthentification));
    xhr2.send(requestData);   
}