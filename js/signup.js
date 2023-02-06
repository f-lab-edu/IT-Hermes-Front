let isAccountSignUp = () => {
  let info = document.querySelector("#section-info");
  info.innerHTML = `
        <button id="duplicate-id" onClick="checkDuplicateLoginId()" style="margin-left: 800px;top: 100px;position: relative;">아이디 중복확인</button><br>
        <button id="nickname-id" onClick="checkDuplicateNickname()" style="margin-left: 800px;top: 350px;position: relative;">닉네임 중복확인</button>

        <div style="width:300px;text-align:center;margin-left: 500px;">
                <!-- Email input -->
                <div class="form-outline mb-4">
                    <label class="form-label" for="form2Example1">아이디</label>
                    <input type="email" id="form-signup-id" class="form-control" />
                </div>
            
                <!-- Password input -->
                <div class="form-outline mb-4">
                    <label class="form-label" for="form2Example2">패스워드</label>
                    <input type="password" id="form-signup-password" class="form-control" />        
                </div>

                <!-- Password input -->
                <div class="form-outline mb-4">
                    <label class="form-label" for="form2Example2">패스워드확인</label>
                    <input type="password" id="form-signup-password-confirm" class="form-control" />
                </div>

                <!-- Password input -->
                <div class="form-outline mb-4">
                    <label class="form-label" for="form2Example2">닉네임</label>
                    <input type="text" maxlength='9' id="form-signup-nickname" class="form-control" />
                </div>

                <!-- Password input -->
                <div class="form-outline mb-4">
                    <label class="form-label" for="form2Example2">직무</label>
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="job-button-list" data-bs-toggle="dropdown" aria-expanded="false">
                            --직무선택--
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li onClick="dropDownJobListValue('FRONT')"><a class="dropdown-item">FRONT</a></li>
                                <li onClick="dropDownJobListValue('BACKEND')"><a class="dropdown-item">BACKEND</a></li>
                                <li onClick="dropDownJobListValue('MOBILE')"><a class="dropdown-item">MOBILE</a></li>
                            </ul>
                        </div>
                </div>

                <!-- Password input -->
                <div class="form-outline mb-4">
                    <label class="form-label" for="form2Example2">연차</label>
                    <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="experience-button-list" data-bs-toggle="dropdown" aria-expanded="false">
                    --연차선택--
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li onClick="dropDownExperienceListValue('0')"><a class="dropdown-item">신입</a></li>
                        <li onClick="dropDownExperienceListValue('1')"><a class="dropdown-item">1년차</a></li>
                        <li onClick="dropDownExperienceListValue('2')"><a class="dropdown-item">2년차</a></li>
                        <li onClick="dropDownExperienceListValue('3')"><a class="dropdown-item">3년차</a></li>
                        <li onClick="dropDownExperienceListValue('4')"><a class="dropdown-item">4년차</a></li>
                        <li onClick="dropDownExperienceListValue('5')"><a class="dropdown-item">5년차</a></li>
                        <li onClick="dropDownExperienceListValue('6')"><a class="dropdown-item">6년차</a></li>
                        <li onClick="dropDownExperienceListValue('7')"><a class="dropdown-item">7년차</a></li>
                        <li onClick="dropDownExperienceListValue('8')"><a class="dropdown-item">8년차</a></li>
                        <li onClick="dropDownExperienceListValue('9')"><a class="dropdown-item">9년차</a></li>
                        <li onClick="dropDownExperienceListValue('10')"><a class="dropdown-item">10년차</a></li>
                        <li onClick="dropDownExperienceListValue('11')"><a class="dropdown-item">11년차</a></li>
                        <li onClick="dropDownExperienceListValue('12')"><a class="dropdown-item">12년차</a></li>
                        <li onClick="dropDownExperienceListValue('13')"><a class="dropdown-item">13년차</a></li>
                        <li onClick="dropDownExperienceListValue('14')"><a class="dropdown-item">14년차</a></li>
                        <li onClick="dropDownExperienceListValue('15')"><a class="dropdown-item">15년차</a></li>
                        <li onClick="dropDownExperienceListValue('16')"><a class="dropdown-item">16년차</a></li>
                        <li onClick="dropDownExperienceListValue('17')"><a class="dropdown-item">17년차</a></li>
                        <li onClick="dropDownExperienceListValue('18')"><a class="dropdown-item">18년차</a></li>
                        <li onClick="dropDownExperienceListValue('19')"><a class="dropdown-item">19년차</a></li>
                        <li onClick="dropDownExperienceListValue('20')"><a class="dropdown-item">20년차 이상</a></li>
                    </ul>
                </div>                        

                </div>

                <!-- Password input -->
                <div class="form-outline mb-4">
                    <label class="form-label" for="form2Example2">키워드추천리스트</label>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="keyword-button-list" data-bs-toggle="dropdown" aria-expanded="false">
                        --키워드선택--
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li onClick="dropDouwnKeywordListValue('빅데이터')"><a class="dropdown-item">빅데이터</a></li>
                            <li onClick="dropDouwnKeywordListValue('인공지능')"><a class="dropdown-item">인공지능</a></li>
                            <li onClick="dropDouwnKeywordListValue('자바')"><a class="dropdown-item">자바</a></li>
                            <li onClick="dropDouwnKeywordListValue('코틀린')"><a class="dropdown-item">코틀린</a></li>
                            <li onClick="dropDouwnKeywordListValue('Swift')"><a class="dropdown-item">Swift</a></li>
                            <li onClick="dropDouwnKeywordListValue('블록체인')"><a class="dropdown-item">블록체인</a></li>
                            <li onClick="dropDouwnKeywordListValue('자바스크립트')"><a class="dropdown-item">자바스크립트</a></li>
                        </ul>
                    </div>
                </div>

                <!-- Password input -->
                <div class="form-outline mb-4">
                    <label class="form-label" for="form2Example2">선택한 키워드</label>
                    <div id="keyword-list"></div>
                </div>

                <!-- 2 column grid layout for inline styling -->
                <div class="row mb-4">
                    <div class="col d-flex justify-content-center">
                    </div>
                </div>
            <!-- Submit button -->
            <button type="button" onClick="signupSubmit()" class="btn btn-primary btn-block mb-4">회원가입</button>    
          </div>      
        `;
};

let signupSubmit = () => {
  let xhr = new XMLHttpRequest();
  let signupId = document.querySelector("#form-signup-id").value;
  let signupPassword = document.querySelector("#form-signup-password").value;
  let signupPasswordConfirm = document.querySelector(
    "#form-signup-password-confirm"
  ).value;
  let signupNickname = document.querySelector("#form-signup-nickname").value;

  let signupJob = String(document.querySelector("#job-button-list").innerHTML);
  let signupExperience = String(
    document.querySelector("#experience-button-list").innerHTML
  ).replace("년차", "");
  let dropDouwnKeywordList = String(
    document.querySelector("#keyword-list").innerHTML
  );
  let keywordList = dropDouwnKeywordList.split(" ");
  //if(!checkDuplicateLoginId()) return;
  //if(!checkDuplicateNickname()) return;
  signupKeyword1 = isEmptyInsertNull(keywordList[0]);
  signupKeyword2 = isEmptyInsertNull(keywordList[1]);
  signupKeyword3 = isEmptyInsertNull(keywordList[2]);
  signupKeyword4 = isEmptyInsertNull(keywordList[3]);
  signupKeyword5 = isEmptyInsertNull(keywordList[4]);

  let signupDto = {
    id: signupId,
    password: signupPassword,
    passwordConfirm: signupPasswordConfirm,
    nickname: signupNickname,
    job: signupJob,
    yearOfExperience: signupExperience,
    keywordList: [
      signupKeyword1,
      signupKeyword2,
      signupKeyword3,
      signupKeyword4,
      signupKeyword5,
    ],
  };
  console.log(signupDto);

  let userJoinDto = JSON.stringify(signupDto);

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let data = JSON.parse(xhr.responseText);
      console.log(data);
      moveLoginPage();
    } else if (xhr.readyState == 4 && xhr.status == 400) {
      alert("아이디 혹은 패스워드 불일치");
    }
    isAccountLogout();
  };
  xhr.open("POST", defaultServerUrl + `/user/join`, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(userJoinDto);
};

let duplicateUserId = () => {
  loginUserId = document.querySelector("#form-signup-id").value;
  let loginDto = {
    id: loginUserId,
  };

  let jsonLoginDto = JSON.stringify(loginDto);
  xhr.open("POST", defaultServerUrl + `/user/duplicate-id`, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(jsonLoginDto);
};

let dropDownJobListValue = (job) => {
  let jobButtonlist = document.querySelector("#job-button-list");
  jobButtonlist.innerHTML = job;
};

let dropDownExperienceListValue = (experience) => {
  let experienceButtonlist = document.querySelector("#experience-button-list");
  experienceButtonlist.innerHTML = experience + "년차";
};

let dropDouwnKeywordListValue = (keyword) => {
  let dropDouwnKeywordList = document.querySelector("#keyword-list");
  let pos = " ";
  let count = 0;
  let dropDouwnKeywordListString = String(dropDouwnKeywordList.innerHTML);
  for (let i = 0; i < dropDouwnKeywordListString.length; i++) {
    if (dropDouwnKeywordListString[i] != pos) continue;
    count++;
  }
  if (dropDouwnKeywordListString.includes(keyword)) {
    alert("동일한 키워드를 이미 선택했습니다.");
    return;
  }
  if (count > 4) {
    alert("키워드는 최대 5개만 선택가능합니다.");
    return;
  }
  dropDouwnKeywordList.innerHTML += keyword + " ";
};

let checkDuplicateNickname = () => {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      alert("닉네임 사용이 가능합니다");
      return true;
    } else if (xhr.readyState == 4 && xhr.status == 400) {
      alert("동일한 닉네임이 존재합니다");
      return false;
    }
  };
  let nickname = document.querySelector("#form-signup-nickname").value;
  let myPageDto = {
    nickname: nickname,
  };
  let requestData = JSON.stringify(myPageDto);

  xhr.open("POST", defaultServerUrl + `/user/duplicate-nickname`, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(requestData);
};

let checkDuplicateLoginId = () => {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      alert("아이디 사용이 가능합니다");
      return true;
    } else if (xhr.readyState == 4 && xhr.status == 400) {
      alert("동일한 아이디가 존재합니다");
      return false;
    }
  };
  let loginId = document.querySelector("#form-signup-id").value;
  let myPageDto = {
    id: loginId,
  };
  let requestData = JSON.stringify(myPageDto);
  console.log(requestData);

  xhr.open("POST", defaultServerUrl + `/user/duplicate-id`, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(requestData);
};
