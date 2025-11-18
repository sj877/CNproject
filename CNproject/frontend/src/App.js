import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 백엔드 API 주소 (K8s Service 이름 기준)
// 개발 시: http://localhost:5000/api/posts
// K8s 배포 시: /api/posts (Nginx 리버스 프록시 설정 필요)
// 이 예제는 간단하게 하기 위해 K8s 내부 통신이 아닌,
// 7단계의 'kubectl port-forward'로 백엔드도 직접 노출시켰다고 가정합니다.
// (또는, React에서 BE를 호출하는 가장 쉬운 방법은
// BE Service를 NodePort로 열고 그 IP:Port를 쓰는 것입니다.)

// 여기서는 FE/BE를 모두 port-forward로 열었다고 가정하고
// 백엔드 주소를 http://localhost:5001/api/posts 로 하겠습니다.
// (FE: 8080, BE: 5001)
const API_URL = 'http://localhost:5001/api/posts';

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // R: 게시글 목록 불러오기
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(API_URL);
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  // C: 새 게시글 작성
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;
    try {
      await axios.post(API_URL, { title, content });
      setTitle('');
      setContent('');
      fetchPosts(); // 목록 새로고침
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  // D: 게시글 삭제
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchPosts(); // 목록 새로고침
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>게시판</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ display: 'block', marginBottom: '5px' }}
        />
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ display: 'block', marginBottom: '5px' }}
        />
        <button type="submit">작성</button>
      </form>
      <hr />
      <h2>글 목록</h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <button onClick={() => handleDelete(post.id)} style={{ color: 'red' }}>
              삭제
            </button>
          </div>
        ))
      ) : (
        <p>게시글이 없습니다.</p>
      )}
    </div>
  );
}

export default App;

