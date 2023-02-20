let isAccountLogout = () => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange=() => {
        if(xhr.readyState == 4 && xhr.status==200) {
            localStorage.removeItem('loginId');
            deleteCookie(accessAuthentification);
            deleteCookie(refreshAuthentification);
            document.querySelector('#subscribe-info').style.display='none';
            isActiveMain();
        }
        if(xhr.readyState==4 && xhr.status==401) {
            let failResponse = JSON.parse(xhr.responseText);
            if(String(failResponse.msg).includes('EXPIRED_TOKEN')) {
                refreshToken(isAccountLogout); 
            }  
        }
    }
    xhr.open("GET", defaultServerUrl+`/user/logout`, true);
    xhr.setRequestHeader(accessAuthentification,getCookie(accessAuthentification));
    xhr.send(); 
}

let moveLoginPage = () => {
    let info = document.querySelector('#section-info');
    info.innerHTML=`
    <div id="login-info">
        <!-- Email input -->
        <div class="form-outline mb-4">
            <label class="form-label" for="form2Example1">아이디</label>
            <input type="email" id="form-login-id" class="form-control" placeholder="아이디를 입력해주세요"/>  
        </div>
    
        <!-- Password input -->
        <div class="form-outline mb-4">
            <label class="form-label" for="form2Example2">패스워드</label>
            <input type="password" id="form-login-password" class="form-control" placeholder="패스워드를 입력해주세요"/>        
        </div>
    
        <!-- Submit button -->
        <button id="login-btn" onClick="loginSubmit()" type="button" class="btn btn-secondary btn-block mb-4">로그인</button>
    </div>            
    `;
}


let loginSubmit = () => {
    let xhr = new XMLHttpRequest();
    let loginUserId;
    xhr.onreadystatechange=() => {
        if(xhr.readyState == 4 && xhr.status==200) {
            let data = JSON.parse(xhr.responseText);
            localStorage.setItem('loginId',loginUserId)
            console.log(data);
            setCookie('Bearer '+data.accessToken,'Bearer '+data.refreshToken);
            isActiveMain();
        } else if(xhr.readyState == 4 && xhr.status==400){
            alert("아이디 혹은 패스워드 불일치");
        }
    }

    loginUserId = document.querySelector('#form-login-id').value;
    let loginUserPassword = document.querySelector('#form-login-password').value;
    let loginDto = {
        id:loginUserId,
        password:loginUserPassword
    }

    let jsonLoginDto = JSON.stringify(loginDto);
    xhr.open("POST", defaultServerUrl+`/user/login`, true);
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(jsonLoginDto);
}


let isAccountMypage = () => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange=() => {
        if(xhr.readyState == 4 && xhr.status==200) {
            document.querySelector('#section-info2').innerHTML='';
            document.querySelector('#section-info3').innerHTML='';
            let response = JSON.parse(xhr.responseText);
            let info = document.querySelector('#section-info');
            info.innerHTML=`
            <!-- Email input -->  
            <div id="my-page-info">
                <div class="form-outline mb-4">
                    <label class="form-label" for="form2Example1">아이디</label>
                    <input type="email" id="form-login-id" class="form-control" value="${response.id}" disabled/>
                </div>   
                <!-- Password input -->
                <div class="form-outline mb-4">
                    <label class="form-label" for="form2Example2">닉네임</label>
                    <input type="text" id="form-login-nickname" class="form-control" value="${response.nickname}" />
                </div>
                <button id="change-nickname-id" onClick="changeNickname('${response.nickname}')" type="button" class="btn btn-secondary btn-block mb-4">닉네임 변경</button>
            </div>
            `
        }
        if(xhr.readyState==4 && xhr.status==401) {
            let failResponse = JSON.parse(xhr.responseText);
            console.log(failResponse);
            if(String(failResponse.msg).includes('EXPIRED_TOKEN')) {
                refreshToken(isAccountMypage); 
            }  
        }
    }
    let userId = localStorage.getItem('loginId');
    let myPageDto = {
        id:userId
    }    
    let requestData = JSON.stringify(myPageDto);

    xhr.open("POST", defaultServerUrl+`/user/my-page`, true);
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.setRequestHeader(accessAuthentification,getCookie(accessAuthentification));
    xhr.send(requestData);
}

let changeNickname = (originalNickname) => {
    let nickname = document.querySelector('#form-login-nickname').value;
    if(nickname==originalNickname) {
        alert("닉네임 동일");
        return;
    }
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange=() => {
        if(xhr.readyState == 4 && xhr.status==200) {
            alert("닉네임 변경 완료")
            let response = JSON.parse(xhr.responseText);
            console.log(response);
        }
        if(xhr.readyState==4 && xhr.status==401) {
            let failResponse = JSON.parse(xhr.responseText);
            if(String(failResponse.msg).includes('EXPIRED_TOKEN')) {
                refreshToken(changeNickname); 
            }  
        }
    }

    let changeNicknameDto = {
        id:localStorage.getItem('loginId'),
        nickname:nickname
    }
    let requestData = JSON.stringify(changeNicknameDto);
    xhr.open("PUT", defaultServerUrl+`/user/nickname`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader(accessAuthentification,getCookie(accessAuthentification));
    xhr.send(requestData); 
}