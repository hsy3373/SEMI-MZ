import {
  getSessionStorage,
  getContextPath,
  setSessionStorage,
} from '../adminCommon.js';

//페이지별 리스트 가져오는 함수
let getReportList = function (num, search, keyword) {
  let path = getContextPath();
  $.ajax({
    url: path + '/list.report',
    method: 'post',
    data: {
      page: num,
      search: search,
      keyword: keyword,
    },
    success: function (data) {
      console.log(data);
      let reportCount = getSessionStorage('reportCount');
      let str = `<tr>
                  <th>#</th>
                  <th>신고번호</th>
                  <th>제목</th>
                  <th>신고자</th>
                  <th>대상자</th>
                  <th>신고일</th>
                </tr>`;
      for (let i in data) {
        str += `<tr class="report-item">
                    <td>${reportCount - i - (num - 1) * 20}</td>
                    <td>${data[i].reportNo}</td>
                    <td>${data[i].reportTitle}</td>
                    <td>${data[i].userId}</td>
                    <td>${data[i].receiveId}</td>
                    <td>${data[i].createDate}</td>
                  </tr>`;
      }

      document.querySelector('.report-list-table').innerHTML = str;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log('Error: ' + errorThrown);
    },
  });
};

// 리포트 가져오는 함수
let getReport = function (reportNo) {
  let path = getContextPath();
  $.ajax({
    url: path + '/update.report',
    method: 'get',
    data: {
      reportNo: reportNo,
    },
    success: function (data) {
      console.log(data);

      document.querySelector('.user-table .id-box').innerText = data.userId;
      document.querySelector('.user-table .nic-box').innerText =
        data.user.nicName;
      document.querySelector('.user-table .status-box').innerText =
        data.user.status;
      document.querySelector('.user-table .user-report-box').innerText =
        data.user.userReportCount;
      document.querySelector('.user-table .receive-report-box').innerText =
        data.user.receiveReportCount;

      document.querySelector('.receiver-table .id-box').innerText =
        data.receiveId;
      document.querySelector('.receiver-table .nic-box').innerText =
        data.receiver.nicName;
      document.querySelector('.receiver-table .status-box').innerText =
        data.receiver.status;
      document.querySelector('.receiver-table .user-report-box').innerText =
        data.receiver.userReportCount;
      document.querySelector('.receiver-table .receive-report-box').innerText =
        data.receiver.receiveReportCount;

      document.querySelector('.report-no').innerText = data.reportNo;
      document.querySelector('.report-date').innerText = data.formatDate;
      document.getElementById('title').value = data.reportTitle;
      document.getElementById('content').value = data.reportContent;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log('Error: ' + errorThrown);
    },
  });
};

// 리포트 업데이트 함수
let updateReport = function (order, reportNo, title, content) {
  let path = getContextPath();
  $.ajax({
    url: path + '/update.report',
    method: 'post',
    data: {
      order: order,
      reportNo: reportNo,
      title: title,
      content: content,
    },
    success: function (data) {
      console.log('리포트 업데이트 ', data);
      if (order == 'update') {
        let num = document.querySelector('.selected-btn').innerText;
        let search = document.getElementById('search').value;
        let keyword = document.getElementById('keyword').value;

        getReportList(num, search, keyword);
        getReport(reportNo);
      } else if (order == 'delete') {
        let keyword = document.getElementById('keyword').value.trim();
        let search = document.getElementById('search').value;
        let page = document.querySelector('.selected-btn').innerText;

        reloadReport(search, keyword, page);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log('Error: ' + errorThrown);
    },
  });
};

// 검색어 입력 후 엔터치면 실행될 함수
let reloadReport = function (search, keyword, page) {
  if (!page) {
    page = 1;
  }
  let path = getContextPath();
  location.href =
    path + `/list.report?search=${search}&keyword=${keyword}&page=${page}`;
};

let init = function () {
  // 옆에 디테일 테이블에 내용 그려주기
  $(document.querySelector('.report-list-table')).on(
    'click',
    'tr',
    function () {
      //만약 제목용 tr태그면 이벤트 종료
      if (this.querySelectorAll('th').length > 3) {
        console.log('제목용 태그임');
        return;
      }
      let reportNo = this.querySelector('td:nth-child(2)').innerText;
      getReport(reportNo);
    }
  );

  document.querySelectorAll('.page-btn').forEach(function (el) {
    el.addEventListener('click', function () {
      // 기존에 선택되어있던 버튼이 있었다면 선택 해제
      if (document.querySelector('.selected-btn') != null) {
        document.querySelector('.selected-btn').className = 'page-btn';
      }

      setSessionStorage('cPage', this.innerText);

      let keyword = document.getElementById('keyword').value.trim();
      let search = document.getElementById('search').value;

      console.log(this.innerText, keyword, search);
      getReportList(this.innerText, search, keyword);

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
    let count = Number(getSessionStorage('reportCount'));
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
  document.querySelector('.member-menu-item :nth-child(3)').style.color =
    'white';

  setTimeout(function () {
    if (document.querySelector('.member-menu-item').style.display == 'none') {
      document.querySelector('.member-menu').click();
    }
  }, 100);

  // 검색창에서 엔터 눌렸을 때 처리
  document.getElementById('keyword').addEventListener('keyup', function (e) {
    if (e.key == 'Enter') {
      let search = document.getElementById('search').value;
      let keyword = this.value.trim();

      reloadReport(search, keyword);
    }
  });

  document
    .querySelector('.user-table .check-member')
    .addEventListener('click', function () {
      let el = document.querySelector('.user-table .id-box');
      if (el.innerText.length > 0) {
        location.href =
          getContextPath() + '/update.member?userId=' + el.innerText;
      }
    });

  document
    .querySelector('.receiver-table .check-member')
    .addEventListener('click', function () {
      let el = document.querySelector('.receiver-table .id-box');
      if (el.innerText.length > 0) {
        location.href =
          getContextPath() + '/update.member?userId=' + el.innerText;
      }
    });

  document.getElementById('update-btn').addEventListener('click', function () {
    if (document.querySelector('.report-no').innerText.length <= 0) {
      return;
    }

    if (confirm('수정 하시겠습니까?')) {
      let reportNo = document.querySelector('.report-no').innerText;
      let title = document.getElementById('title').value;
      let content = document.getElementById('content').value;
      updateReport('update', reportNo, title, content);
    }
  });

  document.getElementById('delete-btn').addEventListener('click', function () {
    if (document.querySelector('.report-no').innerText.length <= 0) {
      return;
    }
    if (confirm('정말 삭제하시겠습니까?')) {
      let reportNo = document.querySelector('.report-no').innerText;
      updateReport('delete', reportNo);
    }
  });
};

//-------------------------------------------

window.onload = function () {
  init();
};
