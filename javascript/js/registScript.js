/*
정규식
^x : 문자열이 x로 시작한다 
x$ : 문자열이 x로 끝난다 
.x : 임의의 한 문자를 표현한다 
x+ : x가 1번이상 반복한다 
x? : x가 존재하거나 존재하지 않는다 
x* : x가 0번이상 반복한다 
x|y : x또는 y를 찾는다 
(x), (x)(y), (x)(?:y) : ()안의 내용을 캡쳐하며, 그룹화 한다 
x{n} : x를 n번 반복한 문자를 찾는다 
x{n,} : x를 n번 이상 반복한 문자를 찾는다 
x{n,m} : x를 n번 이상 m번 이하 반복한 문자를 찾는다 
[xy] : x,y중 하나를 찾는다
[^xy] : x,y를 제외하고 문자 하나를 찾는다 
[x-z] : x~z 사이의 문자중 하나를 찾는다 
\^ : 특수문자를 문자로 인식함 
\b : 문자와 공색사이의 문자를 찾는다 
\B : 문자와 공백사이가 아닌 값을 찾는다 
\d : 숫자를 찾는다 
\D : 숫자가 아닌 값을 찾는다 
\s : 공백문자를 찾는다 
\S : 공백이 아닌 문자를 찾는다 
\t : Tab 문자를 찾는다 
\v : Vertical Tab 문자를 찾는다 
\w : 알파벳 + 숫자 + _ 를 찾는다
\W : 알파벳 + 숫자 + _을 제외한 모든 문자를 찾는다

const 상수이름 = /정규식 패턴/
상수이름.test(문자열) => 정규식 패턴에 대입한 문자열이 부합하면 true 아니면 false를 반환
*/
function sendit(){
    const userId = document.getElementById('userId')
    const userPw = document.getElementById('userPw')
    const userPw_re = document.getElementById('userPw_re')
    const userName = document.getElementById('userName')
    const hp = document.getElementById('hp')
    const email = document.getElementById('email')
    const hobby = document.getElementsByName('hobby')
    const isSSN = document.getElementById('isSSN');
    const ssn1 = document.getElementById('ssn1');
    const ssn2 = document.getElementById('ssn2');

    //정규식 패턴
    //4자 이상 20 이하, 숫자필수, 영문자(소문자 또는 대문자) 필수, 지정한 특수문자 포함
    const expPwText = /^.*(?=^.{4,20})(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()+=]).*$/
    //한글이름인지 확인
    const expNameText = /[가-힣]+$/
    //xxx-xxx/xxxx-xxxx 형태인지
    const expHpText = /^\d{3}-\d{3,4}-\d{4}$/
    //이메일 형태인지
    const expEmailText = /^[A-Za-z0-9\.\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z0-9\.\-]+$/;

    if(userId.value == ""){
        alert('아이디를 입력하시오');
        userId.focus();
        return false;
    }
    if(userId.value.length < 4 || userId.value.length > 20){
        alert("아이디를 4자 이상 20자 이하로 입력하시오")
        userId.focus();
        return false
    }

    if(userPw.value == ""){
        alert('비밀번호를 입력하시오')
        userPw.focus();
        return false;
    }
    if(expPwText.test(userPw.value) == false){
        alert('비밀번호 형식을 확인하세요')
        userPw.focus();
        return false;
    }
    if(userPw.value != userPw_re.value){
        alert('두 비밀번호가 일치하지 않습니다')
        userPw_re.focus()
        return false;
    }

    if(expNameText.test(userName.value) == false){
        alert('이름 형식을 확인하세요')
        userName.focus()
        return false;
    }

    if(expHpText.test(hp.value) == false){
        alert('휴대폰 번호 형식을 확인하세요')
        hp.focus()
        return false;
    }

    if(expEmailText.test(email.value) == false){
        alert('이메일 형식을 확인하세요')
        email.focus()
        return false;
    }
    
    //checkbox에서 몇개 체크했는지 카운트
    let count = 0;
    for(let i = 0; i < hobby.length; i++){
        if(hobby[i].checked){
            count++;
        }
    }
    if(count == 0){
        alert('취미는 적어도 1개 이상 선택하시오')
        return false;
    }

    if(ssn1.value == "" || ssn2.value == ""){
        alert('주민등록번호를 입력하시오')
        ssn1.focus();
        return false;
    }
    //주민등록번호 검증을 통과하면 isSSN값을 true로 지정한다
    if(isSSN.value == 'false'){
        alert('주민등록번호 검증하세요')
        ssn1.focus();
        return false;
    } 
}

//주민등록번호 앞자리 6자리 다 작성하면 다음 칸으로 포커스가 옮겨진다
function moveFocus(){
    const ssn1 = document.getElementById('ssn1');
    const ssn2 = document.getElementById('ssn2');
    
    if(ssn1.value.length >= 6){
        ssn2.focus();
    }
}

//주민등로번호 유효성 검증하는 메소드
function ssnCheck(){
    const isSSN = document.getElementById('isSSN');
    const ssn1 = document.getElementById('ssn1');
    const ssn2 = document.getElementById('ssn2');
    const ssn = ssn1.value + ssn2.value;
    const s1 = Number(ssn.substr(0,1)) * 2;
    const s2 = Number(ssn.substr(1,1)) * 3;
    const s3 = Number(ssn.substr(2,1)) * 4;
    const s4 = Number(ssn.substr(3,1)) * 5;
    const s5 = Number(ssn.substr(4,1)) * 6;
    const s6 = Number(ssn.substr(5,1)) * 7;
    const s7 = Number(ssn.substr(6,1)) * 8;
    const s8 = Number(ssn.substr(7,1)) * 9;
    const s9 = Number(ssn.substr(8,1)) * 2;
    const s10 = Number(ssn.substr(9,1)) * 3;
    const s11 = Number(ssn.substr(10,1)) * 4;
    const s12 = Number(ssn.substr(11,1)) * 5;
    const s13 = Number(ssn.substr(12,1));

    let res = s1 + s2 + s3 + s4 + s5 + s6 + s7 + s8 + s9 + s10 + s11 + s12;
    res = res % 11
    res = 11 - res;
    if(res >= 10) res = res % 10;

    if(res == s13){
        alert("유효한 주민등록번호입니다")
        isSSN.value = true;
    }else{
        alert('유효하지 않은 주민등록번호입니다')
    }
}