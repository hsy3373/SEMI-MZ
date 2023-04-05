import {
  getSessionStorage,
  getContextPath,
  setSessionStorage,
} from '../adminCommon.js';

//페이지별 리스트 가져오는 함수
let getMember = function (num, sort, api) {
  let path = getContextPath();
  $.ajax({
    url: path + '/activelist.member',
    method: 'post',
    data: {
      page: num,
      sort: sort,
      api: api,
    },
    success: function (data) {
      let memberCount = getSessionStorage('memberCount');
      let str = `<tr>
                  <th>#</th>
                  <th>아이디</th>
                  <th>닉네임</th>
                  <th>코인</th>
                  <th>API</th>
                  <th>가입일</th>
                  <th>상태</th>
                </tr>`;
      for (let i in data) {
        str += `<tr class="member-item">
                  <td>${memberCount - i - (num - 1) * 20}</td>
                  <td>${data[i].userId}</td>
                  <td>${data[i].nicName}</td>
                  <td>${data[i].coin}</td>
                  <td>${data[i].apiKind}</td>
                  <td>${data[i].formatDate}</td>
                  <td>${data[i].status}</td>
                </tr>`;
      }

      document.querySelector('.list-area').innerHTML = str;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log('Error: ' + errorThrown);
    },
  });
};

// 검색어 입력 후 엔터치면 실행될 함수
let searchMember = function (option, keyword) {
  let path = getContextPath();
  $.ajax({
    url: path + '/search.member',
    method: 'post',
    data: {
      option: option,
      keyword: keyword,
    },
    success: function (data) {
      let str = '';

      for (let i in data) {
        str += `<div class="search-result-item">
                  아이디 : <div> ${data[i].userId}</div>
                  닉네임 : <div> ${data[i].nicName}</div>
                  상태 : <div> ${data[i].status}</div>
                </div>`;
      }

      document.querySelector('.search-result').innerHTML = str;
      document.querySelector('.search-result').style.display = 'flex';
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log('Error: ' + errorThrown);
    },
  });
};

let init = function () {
  document.getElementById('sort').addEventListener('change', function () {
    let sort = document.getElementById('sort').value;
    let api = document.querySelector('input[name="api"]:checked').value;

    location.href = `${getContextPath()}/activelist.member?sort=${sort}&api=${api}`;
  });

  $("input[name='api']:radio").change(function () {
    let sort = document.getElementById('sort').value;
    let api = document.querySelector('input[name="api"]:checked').value;

    location.href = `${getContextPath()}/activelist.member?sort=${sort}&api=${api}`;
  });

  $(document.querySelector('.search-result')).on(
    'click',
    '.search-result-item',
    function () {
      let id = this.querySelector('div:nth-child(1)').innerText;
      location.href = getContextPath() + '/update.member?userId=' + id;
    }
  );

  $(document.querySelector('.list-area')).on('click', 'tr', function () {
    //만약 제목용 tr태그면 이벤트 종료
    if (this.querySelector('th') != null) {
      console.log('제목용 태그임');
      return;
    }
    let id = this.querySelector('td:nth-child(2)').innerText;
    location.href = getContextPath() + '/update.member?userId=' + id;
  });

  document.querySelectorAll('.page-btn').forEach(function (el) {
    el.addEventListener('click', function () {
      // 기존에 선택되어있던 버튼이 있었다면 선택 해제
      if (document.querySelector('.selected-btn') != null) {
        document.querySelector('.selected-btn').className = 'page-btn';
      }

      setSessionStorage('cPage', this.innerText);

      let sort = document.getElementById('sort').value;
      let api = document.querySelector('input[name="api"]:checked').value;

      getMember(this.innerText, sort, api);

      this.className = 'selected-btn page-btn';
    });
  });

  // 페이징바의 앞페이지 버튼 클릭시 동작
  document.getElementById('prev-btn').addEventListener('click', function () {
    let btns = document.querySelectorAll('.page-btn');
    // 버튼들 텍스트 변경
    btns.forEach(function (el) {
      el.innerText = Number(el.innerText) - 10;
      el.className = 'page-btn';
    });

    //만약 가장 처음 버튼이 1번일 경우 앞페이지 버튼 비활성화
    if (btns[0].innerText == 1) {
      document.getElementById('prev-btn').className = 'disable-btn';
    }

    // 앞페이지가 눌렸다는 것은 뒷페이지가 있다는 것이므로 뒷페이지 가기 버튼 활성화
    document.getElementById('next-btn').className = 'able-btn';

    // 가장 마지막 버튼이 눌린 것으로 처리
    btns[btns.length - 1].click();
  });

  // 페이징바의 뒷페이지 버튼 클릭 시 동작
  document.getElementById('next-btn').addEventListener('click', function () {
    let count = Number(getSessionStorage('memberCount'));
    //최대 페이지 수
    count = Math.ceil(count / 20);
    let btns = document.querySelectorAll('.page-btn');
    // 버튼들 텍스트 변경
    btns.forEach(function (el) {
      el.innerText = Number(el.innerText) + 10;

      if (Number(el.innerText) > count) {
        //만약 버튼의 숫자가 최대 페이지 수보다 크다면
        el.className = 'disable-btn page-btn';
      } else {
        el.className = 'page-btn';
      }
    });

    // 앞으로 가기 버튼 활성화
    document.getElementById('prev-btn').className = 'able-btn';

    //만약 가장 마지막 버튼이 최대 페이지 수보다 크거나 같은 경우 뒷페이지 버튼 비활성화
    if (Number(btns[btns.length - 1].innerText) >= count) {
      document.getElementById('next-btn').className = 'disable-btn';
    }

    //가장 첫 버튼 클릭
    btns[0].click();
  });

  document.querySelector('.member-menu').style.color = 'white';
  document.querySelector('.member-menu i').style.color = 'white';
  document.querySelector('.member-menu-item :nth-child(1)').style.color =
    'white';

  document.querySelector('.member-menu').click();

  // 검색창에서 엔터 눌렸을 때 처리
  document.getElementById('keyword').addEventListener('keyup', function (e) {
    if (e.key == 'Enter') {
      let option = document.getElementById('search').value;
      let keyword = this.value.trim();

      if (keyword != '') {
        document.querySelector('.search-result').innerHTML = '';
        searchMember(option, keyword);
      }
    }
  });

  // 검색창 밖 눌렸을때 검색 화면 닫기
  $('html').click(function (e) {
    if ($(e.target).parents('.search').length < 1) {
      // 외부가 클릭되었을 경우
      document.querySelector('.search-result').style.display = 'none';
    } else {
      //  내부 클릭되었을 경우 내부에 이전 검색 결과가 있었다면 다시 표시
      if (document.querySelectorAll('.search-result > div').length > 0) {
        document.querySelector('.search-result').style.display = 'flex';
      }
    }
  });
};

//-------------------------------------------

window.onload = function () {
  init();
};
