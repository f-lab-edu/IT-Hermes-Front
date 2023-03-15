const localStorage = window.localStorage;
const accessAuthentification = 'HERMES-ACCESS-TOKEN';
const refreshAuthentification = 'HERMES-REFRESH-TOKEN';
let defaultServerUrl;
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
let searchCategory = "YOUTUBE";

let viewCntUrl = "";
let viewCntContentsType = "";

let isActiveMain = () => {
    if(location.hostname=='127.0.0.1') {
        defaultServerUrl=`http://127.0.0.1:8080/api`;
    } else if(location.hostname=='it-hermes.store') {
        defaultServerUrl=`https://it-hermes.store/api`;
    } else if(location.hostname=='it-hermes.site') {
        defaultServerUrl=`https://it-hermes.site/api`;
    }
    console.log(defaultServerUrl);

    if(getCookie(accessAuthentification)==null) {
        let account = document.querySelector('#account-info');
        account.innerHTML=`
        <li class="nav-item"><a class="nav-link" onclick="moveLoginPage()" style="cursor: grab;">로그인</a></li>
        <li class="nav-item"><a class="nav-link" onclick="isAccountSignUp()" style="cursor: grab;">회원가입</a></li>
        `

        document.querySelector('#section-info2').innerHTML='';
        document.querySelector('#section-info3').innerHTML='';        
        top12Contents();
    } else {
        let account = document.querySelector('#account-info');

        account.innerHTML=`
        <div class="dropdown">
            <button class="btn btn-default dropdown-toggle" type="button" id="job-button-list" data-bs-toggle="dropdown" aria-expanded="false">
            ${localStorage.getItem('loginId')}님
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li class="nav-item"><a class="nav-link" onClick="isAccountMypage()" style="cursor: grab;">마이페이지</a></li>
                <li class="nav-item"><a class="nav-link" onClick="isChangeSubscribe()" style="cursor: grab;">구독</a></li>
                <div class="dropdown-divider"></div>
                <li class="nav-item"><a class="nav-link" onClick="isAccountLogout()" style="cursor: grab;color:red">로그아웃</a></li>
            </ul>
        </div>
        <li class="nav-item"><a class="nav-link" onClick="top12Contents()" style="cursor: grab;">TOP-12(전체)</a></li>
        <li class="nav-item"><a class="nav-link" onClick="top12SeveralCategory()" style="cursor: grab;">TOP-12(카테고리별)</a></li>
        <div class="dropdown">
            <button class="btn btn-default dropdown-toggle" type="button" id="job-button-list" data-bs-toggle="dropdown" aria-expanded="false">
                카테고리(정렬)
            </button>
            <ul class="dropdown-menu">
                <li><h5 class="dropdown-header">카테고리 선택</h5></li>
                <div class="dropdown-divider"></div>
                <li onClick="dropDownListValue('NEWS')"><a class="dropdown-item">뉴스</a></li>
                <li onClick="dropDownListValue('YOUTUBE')"><a class="dropdown-item">유튜브</a></li>
                <li onClick="dropDownListValue('JOB')"><a class="dropdown-item">채용</a></li>
                <div class="dropdown-divider"></div>
                <li><h5 class="dropdown-header">정렬 선택</h5></li>
                <div class="dropdown-divider"></div>
                <li onClick="dropDownListValue2('최신순')"><a class="dropdown-item">최신순</a></li>
                <li onClick="dropDownListValue2('인기순')"><a class="dropdown-item">인기순</a></li>
                <li onClick="dropDownListValue2('서비스 추천순')"><a class="dropdown-item">서비스 추천순</a></li>
            </ul>
        </div>
        <select class="form-select" aria-label="Default select example" id="select-category-option" style="width:120px;height:35px" onchange="setCategoryText(this.value)">
            <option selected value="0">선택</option>
            <option value="YOUTUBE" onclick="setCategoryText('YOUTUBE')">Youtube</option>
            <option value="NEWS" onclick="setCategoryText('NEWS')">News</option>
            <option value="JOB" onclick="setCategoryText('JOB')">Job</option>
        </select>
        <div class="input-group" style="width:150px;height:38px;margin-right:10px;margin-left:10px;">
            <div class="form-outline">
                <input type="search" id="search-text" class="form-control" />
            </div>
        </div>
        <button type="button" onclick="searchContents()" id="search-btn" class="btn btn-primary" style="width:100px;height:38px;">
            <i class="fas fa-search"></i> 검색
        </button>
        `
        categoryYoutube();
        categoryNews();
        categoryJob();
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
let setAccessCookie = (accessToken) => {
    let data = new Date();
    data.setTime(data.getTime() + 60*60*1000);
    document.cookie = accessAuthentification+'='+accessToken+';' +accessAuthentification+'=; expires='+data.toUTCString()+'; path=/';
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
            window.open(redirectUrl);
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
            setAccessCookie("Bearer "+data.accessToken);
            afterEvent();
        }
        if(xhr2.readyState == 4 && xhr2.status==401) {
            localStorage.removeItem('loginId');
            deleteCookie(accessAuthentification);
            deleteCookie(refreshAuthentification);
            alert("세션이 만료되었습니다");
            let account = document.querySelector('#account-info');
            account.innerHTML=`
            <li class="nav-item"><a class="nav-link" onclick="moveLoginPage()">로그인</a></li>
            <li class="nav-item"><a class="nav-link" onclick="isAccountSignUp()">회원가입</a></li>
            `
            moveLoginPage();
        }
    }
    xhr2.open("GET", defaultServerUrl+`/user/refresh-token`, true);
    xhr2.setRequestHeader("Content-Type", "application/json")
    xhr2.setRequestHeader(refreshAuthentification,getCookie(refreshAuthentification));
    xhr2.send();   
}

let convertDate = (originalDate) => {
    let modifiedDate;
    modifiedDate = originalDate.substring(0,11);

    let tmpDate = originalDate.substring(0,11);
    let tmpYear = tmpDate.substring(0,4);
    let tmpMonth = tmpDate.substring(5,7);
    let tmpDay = tmpDate.substring(8,10);

    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = ('0'+(currentDate.getMonth()+1)).slice(-2);
    let currentDay = ('0'+currentDate.getDate()).slice(-2);
    
    if(tmpYear == currentYear){
        if(tmpMonth == currentMonth){
            if(currentDay-tmpDay<=7){
                if(currentDay-tmpDay==0){
                    return "today";
                }
                return currentDay-tmpDay+"일전";
            }
        }
    }
    return modifiedDate;
}

let categoryListDisplayNone = () => {
    if(document.querySelector('#category-list')!=null) {
        document.querySelector('#category-list').style.display = "none";
    }
    if(document.querySelector('#category2-list')!=null) {
        document.querySelector('#category2-list').style.display = "none";
    }
}

let top12SeveralCategory = () => {
    categoryListDisplayNone();
    categoryYoutube();
    categoryNews();
    categoryJob();    
}

let setCategoryText = (data) => {
    searchCategory=data;
} 