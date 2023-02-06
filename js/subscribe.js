let isChangeSubscribe = () => {
  if (document.querySelector("#subscribe-info").style.display == "none") {
    document.querySelector("#subscribe-info").style.display = "block";
  } else {
    document.querySelector("#subscribe-info").style.display = "none";
  }
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
    } else if (xhr.readyState == 4 && xhr.status == 400) {
      alert("아이디 혹은 패스워드 불일치");
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
    } else if (xhr.readyState == 4 && xhr.status == 400) {
      alert("아이디 혹은 구독정보 불일치");
    }
  };
  xhr.open("POST", defaultServerUrl + `/subscribe/`, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader(accessAuthentification, getCookie(accessAuthentification));
  xhr.send(requestData);
};
