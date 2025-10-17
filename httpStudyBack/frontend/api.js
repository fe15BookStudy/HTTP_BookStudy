// 백엔드 주소 연결
const API_BASE_URL = "http://localhost:5000/api/post";

// 1. 모든 게시글 조회
document.getElementById("get-all-btn").addEventListener("click", async () => {
  try {
    const res = await fetch(API_BASE_URL);
    const data = await res.json();
    displayResult(data);
  } catch (err) {
    displayResult({ error: err.message });
  }
});

// 2. 특정 게시글 조회
document.getElementById("get-by-id-btn").addEventListener("click", async () => {
  const id = document.getElementById("get-id").value;
  if (!id) return alert("ID를 입력하세요.");
  try {
    const res = await fetch(`${API_BASE_URL}/${id}`);

    // 응답 상태 코드가 404이면 '/404.html' 페이지로 이동
    if (res.status === 404) {
      // window.location.href = "/404.html";
      return;
    }

    // 404가 아닐 때만 정상적으로 JSON 데이터를 처리
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
});

// 3. 게시글 생성
document.getElementById("create-btn").addEventListener("click", async () => {
  const title = document.getElementById("post-title").value;
  const content = document.getElementById("post-content").value;

  if (!title || !content) return alert("제목과 내용을 모두 입력하세요.");

  try {
    const res = await fetch(API_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
});

// 4. 게시글 수정
document.getElementById("update-btn").addEventListener("click", async () => {
  const id = document.getElementById("put-id").value;
  const title = document.getElementById("put-title").value;
  const content = document.getElementById("put-content").value;

  if (!id) return alert("수정할 게시글의 ID를 입력하세요.");
  if (!title || !content) return alert("새로운 제목과 내용을 모두 입력하세요.");

  try {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
});

// 5. 게시글 삭제
document.getElementById("delete-btn").addEventListener("click", async () => {
  const id = document.getElementById("delete-id").value;
  if (!id) return alert("삭제할 게시글의 ID를 입력하세요.");
  try {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
});
