let sortContents = () => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let data = JSON.parse(xhr.responseText);
            let info = document.querySelector('#category-info');
            info.innerHTML = `
            <div class="dropdown" id="category-select1">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="category-list" data-bs-toggle="dropdown" aria-expanded="false">
                --키워드선택--
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li onClick="dropDownListValue('NEWS')"><a class="dropdown-item">뉴스</a></li>
                    <li onClick="dropDownListValue('YOUTUBE')"><a class="dropdown-item">유투브</a></li>
                    <li onClick="dropDownListValue('JOB')"><a class="dropdown-item">채용</a></li>
                </ul>
            </div>
            
            <div class="dropdown" id="category-select2">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="category2-list" data-bs-toggle="dropdown" aria-expanded="false">
                --키워드선택--
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li onClick="dropDownListValue2('최신순')"><a class="dropdown-item">최신순</a></li>
                    <li onClick="dropDownListValue2('인기순')"><a class="dropdown-item">인기순</a></li>
                    <li onClick="dropDownListValue2('서비스 추천순')"><a class="dropdown-item">서비스 추천순</a></li>
                </ul>
            </div>
                `;

            let infoContents2 = document.querySelector('#section-info2');
            infoContents2.innerHTML = ``;
    
            let infoContents3 = document.querySelector('#section-info3');
            infoContents3.innerHTML = ``;  

            let pageDataList='';                
            let infoContents = document.querySelector('#section-info');
            infoContents.innerHTML = '';
            for (let i = 0; i < data.length; i++) {
                pageDataList+=`
                    <div class="col mb-5" id="main-contents" onclick="addViewCount('${data[i].url}','${data[i].contentProvider}')">
                        <div class="card h-100">
                            <img class="mainContents-image" id="mainImage" src="${data[i].image}" alt="..." />
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <h5 class="mainContents-title">${data[i].title}</h5>
                                    <p class="mainContents-service">${data[i].contentProvider}</p>
                                    <p class="mainContents-category">${data[i].category}</p>
                                    <p class="mainContents-date">${convertDate(data[i].contentsDate)}</p>
                                    <p class="mainContents-reviewCnt">조회수 : ${data[i].viewCnt}</p>
                                </div>
                            </div>
                        </div>
                    </div>                
                `
            }
            
            infoContents.innerHTML += `
            <div class="container px-4 px-lg-5 mt-5">
                <h5 class="fw-bolder"></h5>
                <div id="entire-contents-box" class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">${pageDataList}</div>
            </div>
            <div class="container" style="position:absolute; left:40%;">
                    <ul class="pagination" id="page-info"></ul>
            </div>
            `
            buttonPagenation('YOUTUBE',0);
        }
        if(xhr.readyState==4 && xhr.status==401) {
            let failResponse = JSON.parse(xhr.responseText);
            if(String(failResponse.msg).includes('EXPIRED_TOKEN')) {
                refreshToken(sortContents); 
            }  
        }
    }
    xhr.open("GET", defaultServerUrl + `/contents/category?type=YOUTUBE&page=0&order=POPULAR`, true);
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.setRequestHeader(accessAuthentification,getCookie(accessAuthentification));
    xhr.send();
}

let submit = (m1, m2, m3) => {
    console.log("****");
    console.log(m1);
    console.log(m2);
    console.log(m3);
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let data = JSON.parse(xhr.responseText);
            let infoContents2 = document.querySelector('#section-info2');
            infoContents2.innerHTML = ``;
    
            let infoContents3 = document.querySelector('#section-info3');
            infoContents3.innerHTML = ``;  

            let pageDataList='';                
            let infoContents = document.querySelector('#section-info');
            infoContents.innerHTML = '';
            if(m1!='JOB') {
                for (let i = 0; i < data.length; i++) {
                    pageDataList+=`
                        <div class="col mb-5" id="main-contents" onclick="addViewCount('${data[i].url}','${data[i].contentProvider}')">
                            <div class="card h-100">
                                <img class="mainContents-image" id="mainImage" src="${data[i].image}" alt="..." />
                                <div class="card-body p-4">
                                    <div class="text-center">
                                        <h5 class="mainContents-title">${data[i].title}</h5>
                                        <p class="mainContents-service">${data[i].contentProvider}</p>
                                        <p class="mainContents-category">${data[i].category}</p>
                                        <p class="mainContents-date">${convertDate(data[i].contentsDate)}</p>
                                        <p class="mainContents-reviewCnt">조회수 : ${data[i].viewCnt}</p>
                                    </div>
                                </div>
                            </div>
                        </div>                
                    `
                }
            } else {             
                for (let i = 0; i < data.length; i++) {
                    if(data[i].contentProvider=='SARAMIN') {
                        pageDataList+=`
                        <div class="col mb-5" id="main-contents" onclick="addViewCount('${data[i].url}','${data[i].contentProvider}')">
                            <div class="card h-100">
                                <img class="mainContents-image" id="mainImage" src="/image/saramin_default.png" alt="..." />
                                <div class="card-body p-4">
                                    <div class="text-center">
                                        <h5 class="mainContents-title">${data[i].title}</h5>
                                        <p class="mainContents-service">${data[i].contentProvider}</p>
                                        <p class="mainContents-category">${data[i].category}</p>
                                        <p class="mainContents-date">${convertDate(data[i].contentsDate)}</p>
                                        <p class="mainContents-reviewCnt">조회수 : ${data[i].viewCnt}</p>
                                    </div>
                                </div>
                            </div>
                        </div>                
                        `
                    } else if(data[i].contentProvider=='WANTED') {
                        pageDataList+=`
                        <div class="col mb-5" id="main-contents" onclick="addViewCount('${data[i].url}','${data[i].contentProvider}')">
                            <div class="card h-100">
                                <img class="mainContents-image" id="mainImage" src="/image/wanted_default.png" alt="..." />
                                <div class="card-body p-4">
                                    <div class="text-center">
                                        <h5 class="mainContents-title">${data[i].title}</h5>
                                        <p class="mainContents-service">${data[i].contentProvider}</p>
                                        <p class="mainContents-category">${data[i].category}</p>
                                        <p class="mainContents-date">${convertDate(data[i].contentsDate)}</p>
                                        <p class="mainContents-reviewCnt">조회수 : ${data[i].viewCnt}</p>
                                    </div>
                                </div>
                            </div>
                        </div>                
                        `
                    }
                }                
            }

            
            infoContents.innerHTML += `
            <div class="container px-4 px-lg-5 mt-5">
                <h5 class="fw-bolder"></h5>
                <div id="entire-contents-box" class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">${pageDataList}</div>
            </div>
            <div class="container" style="position:absolute; left:40%;">
                    <ul class="pagination" id="page-info"></ul>
            </div>
            `     
            buttonPagenation(m1,m3);
        }
        if(xhr.readyState==4 && xhr.status==401) {
            let failResponse = JSON.parse(xhr.responseText);
            if(String(failResponse.msg).includes('EXPIRED_TOKEN')) {
                refreshToken(submit); 
            }  
        }
    }
    console.log(m1);
    console.log(m2);
    console.log(m3);

    xhr.open("GET", defaultServerUrl + `/contents/category?type=${m1}&page=${m3}&order=${m2}`, true);
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.setRequestHeader(accessAuthentification,getCookie(accessAuthentification));
    xhr.send();
}

let getCategoryEntireCnt = () => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let data = JSON.parse(xhr.responseText);
            youtubeCnt = data.youtubeCnt;
            jobCnt = data.jobCnt;
            newsCnt = data.newsCnt;

            youtubeLastLine= youtubeCnt/12;
            if(youtubeCnt%12>0) {
                youtubeLastLine+=1;
            }
            jobLastLine= jobCnt/12;
            if(jobCnt%12>0) {
                jobLastLine+=1;
            }
            newsLastLine= newsCnt/12;
            if(newsCnt%12>0) {
                newsLastLine+=1;
            }
            
            youtubeLastLine = parseInt(youtubeLastLine);
            jobLastLine = parseInt(jobLastLine);
            newsLastLine = parseInt(newsLastLine);
        }
    }
    xhr.open("GET", defaultServerUrl + `/contents/count`, true);
    xhr.setRequestHeader("Content-Type","application/json");
    xhr.send();
}


let dropDownListValue = (e) => {
    pageData=0;
    let keyword = document.querySelector('#category-list');
    keyword.innerHTML=e;
    categoryData=e;
    console.log('---------');
    console.log(e);
    console.log(sortData);
    console.log(pageData);
    submit(e,sortData,pageData);
}

let dropDownListValue2 = (e) => {
    pageData=0;
    let keyword = document.querySelector('#category2-list');
    let tmp;
    if(e=='최신순'){
        tmp='RECENT';
    }else if(e=='인기순'){
        tmp='POPULAR';
    }else{
        tmp='ID';
    }
    keyword.innerHTML=e;
    sortData=tmp;
    submit(categoryData,tmp,pageData);
}

let sort_click = (e) => {
    pageData=e;
    submit(categoryData,sortData,pageData);
}

let buttonPagenation = (category, pageIndex) => {
    let pageInfo = document.querySelector('#page-info');
    let entireData;
    let lastLine;
    let restCnt;

    if(category=='YOUTUBE') {
        entireData=youtubeCnt;
        lastLine = youtubeLastLine;
        restCnt= youtubeRestCnt;
    } else if(category=='JOB') {
        entireData=jobCnt;
        lastLine = jobLastLine;
        restCnt= jobRestCnt;
    } else {
        entireData=newsCnt;
        lastLine = newsLastLine;
        restCnt= newsRestCnt;
    }

    // 19개
    // 8개씩 분할
    // 1 2 3(17 18 19)
    if(pageIndex==0) {
        if(lastLine<=8) {
            pageInfo.innerHTML=`<li class="page-item disabled"><a class="page-link" href="#" style="cursor:pointer;">Previous</a></li>`
            for(let i=1;i<=lastLine;i++) {
                if(pageIndex+1==i) {
                    pageInfo.innerHTML+=`
                    <li class="page-item active">
                        <a class="page-link" onClick="sort_click(${i-1})" style="cursor:pointer;">${i}<span class="sr-only"></span></a>
                    </li>
                `;
                } else{
                    pageInfo.innerHTML+=`
                    <li class="page-item"><a class="page-link" onClick="sort_click(${i-1})" style="cursor:pointer;">${i}</a></li>
                `;
                }
            }
            pageInfo.innerHTML+=` <li class="page-item disabled"><a class="page-link" href="#" style="cursor:pointer;">Next</a></li>`;
        } else {
            // 0부터 시작인데, 데이터가 64개를 넘는경우..!
            let lastButton;
            let startButton;
            startButton=1;
            lastButton=8;
            pageInfo.innerHTML=`<li class="page-item disabled"><a class="page-link" href="#" style="cursor:pointer;">Previous</a></li>`
            for(let i=startButton;i<=lastButton;i++) {
                if(pageIndex+1==i) {
                    pageInfo.innerHTML+=`
                    <li class="page-item active">
                        <a class="page-link" onClick="sort_click(${i-1})" style="cursor:pointer;">${i}<span class="sr-only"></span></a>
                    </li>
                `;
                } else{
                    pageInfo.innerHTML+=`
                    <li class="page-item"><a class="page-link" onClick="sort_click(${i-1})" style="cursor:pointer;">${i}</a></li>
                `;
                }
            }
            if(lastLine==lastButton/8) {
                pageInfo.innerHTML+=`<li class="page-item disabled"><a class="page-link" href="#" style="cursor:pointer;">Next</a></li>`;
            } else {
                pageInfo.innerHTML+=`<li class="page-item"><a class="page-link" onclick="movePrevAndNextLine('${category}','2')" style="cursor:pointer;">Next</a></li>`;
            }
        }         
    } else {        
        //last index = 13 (입력한 페이지)
        //last button = 16 (제일 끝에 있어야 될 페이지)
        //start button = 9 (처음 시작해야될 페이지)
        //lastLine = 2 (제일마지막 페이지)
        // lastbutton/8 =lastLine

        //(이슈) 예를들어 32개까지 있으면 8개가 나오지 않고 4개가 나와야되는데.. 8개나옴..
        if(lastLine<=8) {
            pageInfo.innerHTML=`<li class="page-item disabled" style="cursor:pointer;"><a class="page-link" href="#">Previous</a></li>`
            for(let i=1;i<=lastLine;i++) {
                if(pageIndex+1==i) {
                    pageInfo.innerHTML+=`
                    <li class="page-item active">
                        <a class="page-link" onClick="sort_click(${i-1})" style="cursor:pointer;">${i}<span class="sr-only"></span></a>
                    </li>
                `;
                } else{
                    pageInfo.innerHTML+=`
                    <li class="page-item"><a class="page-link" onClick="sort_click(${i-1})" style="cursor:pointer;">${i}</a></li>
                `;
                }
            }
            pageInfo.innerHTML+=` <li class="page-item disabled"><a class="page-link" href="#" style="cursor:pointer;">Next</a></li>`;
        } else {
            let lastButton;
            let startButton;
            for(let j = 8;j<=1000000;j+=8) {
                if(pageIndex+1<=j) {
                    lastButton=j;
                    break;
                }
            }
            let limitPageLine = Math.floor(jobLastLine);

            startButton=lastButton-7;
            let currentPageLine = checkPagenationCurrentLine(pageIndex+1); // 10넣으면 2호출
            if(lastButton>limitPageLine) {
                lastButton=limitPageLine;
            }
            
            if(pageIndex<8 && currentPageLine<2) {
                pageInfo.innerHTML=`<li class="page-item disabled"><a class="page-link" href="#" style="cursor:pointer;">Previous</a></li>`
            } else {
                pageInfo.innerHTML=`<li class="page-item"><a class="page-link" onclick="movePrevAndNextLine('${category}','${currentPageLine-1}')" style="cursor:pointer;">Previous</a></li>`
            }
            for(let i=startButton;i<=lastButton;i++) {
                if(pageIndex+1==i) {
                    pageInfo.innerHTML+=`
                    <li class="page-item active">
                        <a class="page-link" onClick="sort_click(${i-1})" style="cursor:pointer;">${i}<span class="sr-only"></span></a>
                    </li>
                `;
                } else{
                    pageInfo.innerHTML+=`
                    <li class="page-item"><a class="page-link" onClick="sort_click(${i-1})" style="cursor:pointer;">${i}</a></li>
                `;
                }
            }
            if(lastButton==limitPageLine) {
                pageInfo.innerHTML+=` <li class="page-item disabled"><a class="page-link" href="#" style="cursor:pointer;">Next</a></li>`;
            } else {
                pageInfo.innerHTML+=` <li class="page-item"><a class="page-link" onclick="movePrevAndNextLine('${category}','${currentPageLine+1}')" style="cursor:pointer;">Next</a></li>`;
            }
        }  
    }
}

let checkPagenationCurrentLine = (index) => {
    let count=1;
    for(let i=8;i<=1000000;i+=8) {
        if(index<=i) {
            return count;
        } else {
            count++;
        }
    }
}

let movePrevAndNextLine = (category, currentPage) => {
    //1이면 1호출
    //2이면 9호출
    pageIndex=8*(currentPage-1)+1;
    sort_click(pageIndex-1)
    buttonPagenation(category, pageIndex);
}