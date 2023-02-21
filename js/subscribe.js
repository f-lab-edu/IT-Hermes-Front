let isChangeSubscribe = () => {
  document.querySelector("#section-info3").style.display="none";
  let value = document.querySelector('#section-info');
  value.style.display="left";
  value.innerHTML=`<h3>채용</h3>`
  value.innerHTML+=`<br>`
  value.innerHTML+=`<div class="card" style="width: 18rem; float: left; margin-right:10px;" id="subscribeCard">
  <div class="card-body">
    <h5 class="card-title">원티드</h5>
    <p class="card-text">나다운 일의 시작</p>
    <button id="wanted_active" class="btn btn-primary btn-block mb-4" onclick="isChangeActive('wanted_active')">
        비활성화
    </button>
  </div>
</div>`;

value.innerHTML+=`<div class="card" style="width: 18rem; float: left;" id="subscribeCard">
<div class="card-body">
  <h5 class="card-title">사람인</h5>
  <p class="card-text">땡큐 베리 매치 사람인, 취업/채용/커리어 매칭 플랫폼</p>
  <button id="saramin_active" class="btn btn-primary btn-block mb-4" onclick="isChangeActive('saramin_active')">비활성화</button>
</div>
</div>`;

value.innerHTML+=`<br>`

  value.innerHTML+=`<h3>뉴스</h3>`
  value.innerHTML+=`<br>`
  value.innerHTML += `<div class="card" style="width: 18rem; float:left; margin-right:10px;" id="subscribeCard">
  <div class="card-body">
    <h5 class="card-title">요즘 IT</h5>
    <p class="card-text">요즘 사람들의 IT 매거진, 요즘IT</p>
    <button id="yozm_active" class="btn btn-primary btn-block mb-4" onclick="isChangeActive('yozm_active')">비활성화</button>
  </div>
</div>`;

value.innerHTML+=`<div class="card" style="width: 18rem; float: left;" id="subscribeCard">
<div class="card-body">
  <h5 class="card-title">코딩월드뉴스</h5>
  <p class="card-text">CODING WORLD NEWS</p>
  <button id="coding_world_active" class="btn btn-primary btn-block mb-4" onclick="isChangeActive('coding_world_active')">비활성화</button>
</div>
</div>`;

  value.innerHTML+=`<h3>유튜브</h3>`
  value.innerHTML+=`<br>`
  value.innerHTML+= `<div class="card" style="width: 18rem; float: left; margin-right:10px;" id="subscribeCard">
  <div class="card-body">
    <h5 class="card-title">드림코딩엘리</h5>
    <p class="card-text">엘리와 함께하는 드림코딩</p>
    <button id="dream_coding_active" class="btn btn-primary btn-block mb-4" onclick="isChangeActive('dream_coding_active')">비활성화</button>
  </div>
</div>`;

value.innerHTML += `<div class="card" style="width: 18rem; float:left;" id="subscribeCard">
  <div class="card-body">
    <h5 class="card-title">노마드 코더</h5>
    <p class="card-text">New Video Every Week</p>
    <button id="nomad_coders_active" class="btn btn-primary btn-block mb-4" onclick="isChangeActive('nomad_coders_active')" type="button">비활성화</button>
  </div>
</div>`;

let subscribeBtn = document.querySelector('#section-info2');
subscribeBtn.innerHTML = `<button type="button" onClick="subscribeSubmit()" class="btn btn-secondary btn-block mb-4">구독</button>`;

};

let isChangeActive = (id) => {
  let activeValue = document.getElementById(id);
  if (activeValue.innerHTML == "활성화") {
    activeValue.innerHTML = "비활성화";
  } else {
    activeValue.innerHTML = "활성화";
  }
};

let isReturnActiveValue = (id) => {
  let activeValue = document.getElementById(id);
  console.log(activeValue.innerHTML);
  if (activeValue.innerHTML == "활성화") {
    return "ACTIVE";
  } else {
    return "NOT_ACTIVE";
  }
};

let isReturnContentsProviderValue = (id) => {
  if (id == "saramin_active") {
    return "SARAMIN";
  } else if (id == "wanted_active") {
    return "WANTED";
  } else if (id == "naver_active") {
    return "NAVER";
  } else if (id == "yozm_active") {
    return "YOZM";
  } else if (id == "coding_world_active") {
    return "CODING_WORLD";
  } else if (id == "nomad_coders_active") {
    return "NOMAD_CODERS";
  } else if (id == "dream_coding_active") {
    return "DREAM_CODING";
  }
};
let isUpdateContentsProviderActiveValue = (name, active) => {
  if (name == "SARAMIN" && active == "ACTIVE") {
    document.getElementById("saramin_active").innerHTML = "활성화";
  } else if (name == "WANTED" && active == "ACTIVE") {
    document.getElementById("wanted_active").innerHTML = "활성화";
  } else if (name == "NAVER" && active == "ACTIVE") {
    document.getElementById("naver_active").innerHTML = "활성화";
  } else if (name == "YOZM" && active == "ACTIVE") {
    document.getElementById("yozm_active").innerHTML = "활성화";
  } else if (name == "CODING_WORLD" && active == "ACTIVE") {
    document.getElementById("coding_world_active").innerHTML = "활성화";
  } else if (name == "NOMAD_CODERS" && active == "ACTIVE") {
    document.getElementById("nomad_coders_active").innerHTML = "활성화";
  } else if (name == "DREAM_CODING" && active == "ACTIVE") {
    document.getElementById("dream_coding_active").innerHTML = "활성화";
  }
};

let subscribeSubmit = () => {
  let xhr = new XMLHttpRequest();
  let subscribeDto = {
    id: localStorage.getItem('loginId'),
    subscribeContentsList: [
      {
        contentsProvider: isReturnContentsProviderValue("saramin_active"),
        isActive: isReturnActiveValue("saramin_active"),
      },
      {
        contentsProvider: isReturnContentsProviderValue("wanted_active"),
        isActive: isReturnActiveValue("wanted_active"),
      },
      {
        contentsProvider: isReturnContentsProviderValue("naver_active"),
        isActive: isReturnActiveValue("naver_active"),
      },
      {
        contentsProvider: isReturnContentsProviderValue("yozm_active"),
        isActive: isReturnActiveValue("yozm_active"),
      },
      {
        contentsProvider: isReturnContentsProviderValue("coding_world_active"),
        isActive: isReturnActiveValue("coding_world_active"),
      },
      {
        contentsProvider: isReturnContentsProviderValue("nomad_coders_active"),
        isActive: isReturnActiveValue("nomad_coders_active"),
      },
      {
        contentsProvider: isReturnContentsProviderValue("dream_coding_active"),
        isActive: isReturnActiveValue("dream_coding_active"),
      },
    ],
  };

  console.log(subscribeDto);

  let requestData = JSON.stringify(subscribeDto);

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      findSubscribe();
      alert("수정이 완료되었습니다.");
    }
    if (xhr.readyState == 4 && xhr.status == 400) {
      alert("아이디 혹은 패스워드 불일치");
    }
    if(xhr.readyState==4 && xhr.status==401) {
      let failResponse = JSON.parse(xhr.responseText);
      if(String(failResponse.msg).includes('EXPIRED_TOKEN')) {
          refreshToken(subscribeSubmit); 
      }  
    }
  };
  xhr.open("PUT", defaultServerUrl + `/subscribe/`, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader(accessAuthentification, getCookie(accessAuthentification));
  xhr.send(requestData);
};

let findSubscribe = () => {
  let xhr = new XMLHttpRequest();
  let subscribeDto = {
    id: localStorage.getItem('loginId'),
  };

  let requestData = JSON.stringify(subscribeDto);

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let data = JSON.parse(xhr.responseText);
      if (data.length > 0) {
        isUpdateContentsProviderActiveValue(
          data[0].contentsProvider,
          data[0].isActive
        );
        isUpdateContentsProviderActiveValue(
          data[1].contentsProvider,
          data[1].isActive
        );
        isUpdateContentsProviderActiveValue(
          data[2].contentsProvider,
          data[2].isActive
        );
        isUpdateContentsProviderActiveValue(
          data[3].contentsProvider,
          data[3].isActive
        );
        isUpdateContentsProviderActiveValue(
          data[4].contentsProvider,
          data[4].isActive
        );
        isUpdateContentsProviderActiveValue(
          data[5].contentsProvider,
          data[5].isActive
        );
        isUpdateContentsProviderActiveValue(
          data[6].contentsProvider,
          data[6].isActive
        );
      }
    } 
    if (xhr.readyState == 4 && xhr.status == 400) {
      alert("아이디 혹은 구독정보 불일치");
    }
    if(xhr.readyState==4 && xhr.status==401) {
      let failResponse = JSON.parse(xhr.responseText);
      if(String(failResponse.msg).includes('EXPIRED_TOKEN')) {
          refreshToken(findSubscribe); 
      }  
    }
  };
  xhr.open("POST", defaultServerUrl + `/subscribe/`, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader(accessAuthentification, getCookie(accessAuthentification));
  xhr.send(requestData);
};
