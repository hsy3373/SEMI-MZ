<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8" %>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Insert title here</title>
    <link
      rel="stylesheet"
      href="../../../resource/css/admin/admin-report.css"
    />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css"
    />
  </head>
  <body>
    <div class="wrapper">
      <div class="content">
        <div class="head-text">신고 목록</div>
        <div class="inner-wrap">
          <div class="search">
            <div>
              <i class="bi bi-search"></i>
            </div>
            <div>
              <select name="search" id="search">
                <option value="userId" selected>신고자</option>
                <option value="receveId">대상자</option>
                <option value="title" >제목</option>
              </select>
            </div>
            <div class="search-input">
              <input
                type="text"
                id="keyword"
                placeholder="검색어 입력 후 엔터를 눌러주세요"
              />
              <div class="search-result"></div>
            </div>
          </div>

          <div class="report-wrap">
            <div class="report-list-area">
              <table class="report-list-table">
                <tr>
                  <th>#</th>
                  <th>신고번호</th>
                  <th>제목</th>
                  <th>신고자</th>
                  <th>대상자</th>
                  <th>신고일</th>
                </tr>
                <tr>
                  <th>1</th>
                  <td>1</td>
                  <td>제목 이십글자ddddddddddㅏㅏㅏㅏkkkkkㅏㅏ</td>
                  <td>dkdleljfkdlsjfdkls</td>
                  <td>dfkjlsjfkdlsjfkd</td>
                  <td>13/12/12</td>
                </tr>
              </table>
            </div>

            <div class="detail-area">
              <div class="btn-area">
                <button type="button" id="delete-btn">삭제</button>
                <button type="button" id="update-btn">수정</button>
              </div>
              <div>
                <table class="member-detail-table">
                  <tr>
                    <th rowspan="2">신고자</th>
                    <th>아이디</th>
                    <td>열두글자아아아아아</td>
                    <th>닉네임</th>
                    <td>일이삼사오육칠팔</td>
                    <th>상태</th>
                    <td>y</td>
                  </tr>
                  <tr>
                    <th>신고건</th>
                    <td></td>
                    <th>대상건</th>
                    <td></td>
                    <td colspan="2">
                      <button class="check-member">유저 조회</button>
                    </td>
                  </tr>
                </table>
                <table class="member-detail-table">
                  <tr>
                    <th rowspan="2">대상자</th>
                    <th>아이디</th>
                    <td>id</td>
                    <th>닉네임</th>
                    <td>nic</td>
                    <th>상태</th>
                    <td>y</td>
                  </tr>
                  <tr>
                    <th>신고건</th>
                    <td></td>
                    <th>대상건</th>
                    <td></td>
                    <td colspan="2">
                      <button class="check-member">유저 조회</button>
                    </td>
                  </tr>
                </table>
                <table class="report-detail-table">
                  <thead>
                    <tr>
                      <th>신고번호</th>
                      <td></td>
                      <th>신고일</th>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>제목</th>
                      <td colspan="3">
                        <input
                          type="text"
                          name="title"
                          id="title"
                          maxlength="20"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>내용</th>
                      <td colspan="3">
                        <textarea
                          name="content"
                          id="content"
                          cols="30"
                          rows="10"
                          maxlength="300"
                        ></textarea>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
