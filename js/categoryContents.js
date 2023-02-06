let categoryYoutube = () => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let data = JSON.parse(xhr.responseText);

            let headerInfo = document.querySelector('.bg-dark.py-5');
            headerInfo.innerHTML = `
                <div class="container px-4 px-lg-5 my-5">
                    <div class="text-center text-white">
                        <h1 class="display-4 fw-bolder">IT-Hermes</h1>
                    </div>
                </div>
            `;

            let dataList = '';
            let info = document.querySelector('#section-info');

            for (let i = 0; i < 10; i++) {
                dataList +=
                    `<div class="col mb-5" onclick="addViewCount('${data[i].url}','${data[i].contentsProviderType}')">
                        <div class="card h-100">
                            <img class="youtube-image" src="${data[i].image}" alt="..." />
                                <div class="card-body p-4">
                                    <div class="text-center">
                                    <h5 class="youtube-title">${data[i].title}</h5>
                                    <p class="youtube-service">${data[i].contentsProviderType}</p>
                                    <p class="youtube-category">${data[i].category}</p>
                                    <p class="youtube-date">${data[i].contentsDate}</p>
                                    <p class="reviewCnt">조회수 : ${data[i].viewCnt}</p>
                                    </div>
                                </div>
                            </div>
                        </div>`;
            }

            info.innerHTML = `
        <div class="more" style="display: inline-block; margin: 0 2px; border: 2px solid #0067a3; position: absolute; left:80%;">
            <li class="btn"><a class="nav-link" onclick="sortContents()">더보기</a></li>
        </div>
        <section class="py-5">
            <div class="container px-4 px-lg-5 mt-5">
                <h5 class="fw-bolder">유투브</h5>
                <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">${dataList}</div>
            </div>
        </section>`;

        }
    }
    xhr.open("GET", defaultServerUrl + `/contents/main?type=YOUTUBE`, true);
    xhr.send();
}


let categoryNews = () => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let data = JSON.parse(xhr.responseText);

            let info = document.querySelector('#section-info2');
            let newsDataList = '';

            for (let i = 0; i < 10; i++) {
                newsDataList += `
                <div class="col mb-5" onclick="addViewCount('${data[i].url}','${data[i].contentsProviderType}')">
                <div class="card h-100">
                    <img class="news-image" src="${data[i].image}" alt="..." />
                    <div class="card-body p-4">
                        <div class="text-center">
                            <h5 class="news-title">${data[i].title}</h5>
                            <p class="news-service">${data[i].contentsProviderType}</p>
                            <p class="news-category">${data[i].category}</p>
                            <p class="news-date">${data[i].contentsDate}</p>
                            <p class="news-reviewCnt">조회수 : ${data[i].viewCnt}</p>
                        </div>
                    </div>
                </div>
            </div>`;
            }

            info.innerHTML += `
            <section class="py-5">
            <div class="container px-4 px-lg-5 mt-5">
                <h5 class="fw-bolder">뉴스</h5>
                    <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">${newsDataList}</div>
            </div>
            </section>`;
        }
    }
    xhr.open("GET", defaultServerUrl + `/contents/main?type=NEWS`, true);
    xhr.send();
}


let categoryJob = () => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let data = JSON.parse(xhr.responseText);

            let jobDataList = '';

            for (let i = 0; i < 10; i++) {
                jobDataList += 
                `<div class="col mb-5" onclick="addViewCount('${data[i].url}','${data[i].contentsProviderType}')">
                <div class="card h-100">
                    <img class="job-image" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                    <div class="card-body p-4">
                        <div class="text-center">
                            <h5 class="job-title">${data[i].title}</h5>
                            <p class="job-service">${data[i].contentsProviderType}</p>
                            <p class="job-category">${data[i].category}</p>
                            <p class="job-date">${data[i].contentsDate}</p>
                            <p class="job-reviewCnt">조회수 : ${data[i].viewCnt}</p>
                        </div>
                    </div>
                </div>
            </div>`;
            }

            let info = document.querySelector('#section-info3');
            info.innerHTML = `
    <div class="container px-4 px-lg-5 mt-5">
        <h5 class="fw-bolder">채용</h5>
        <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center"><${jobDataList}/div>
    </div>`;
        }
    }
    xhr.open("GET", defaultServerUrl + `/contents/main?type=JOB`, true);
    xhr.send();
}