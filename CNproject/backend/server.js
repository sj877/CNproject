const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// DB 연결 설정 (K8s Secret 및 Service 이름 사용)
const pool = new Pool({
  user: 'postgres',
  host: 'db-service', // K8s 서비스 이름
  database: 'postgres',
  password: 'mysecretpassword', // K8s Secret에서 가져온 값
  port: 5432,
});

// 테이블 초기화 (최초 실행 시)
pool.query('CREATE TABLE IF NOT EXISTS posts (id SERIAL PRIMARY KEY, title VARCHAR(100), content TEXT)', (err, res) => {
  if (err) {
    console.error('Error creating table', err.stack);
  } else {
    console.log('Table "posts" is ready');
  }
});

// C: 게시글 생성
app.post('/api/posts', async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = await pool.query(
      "INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *",
      [title, content]
    );
    res.json(newPost.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// R: 모든 게시글 조회
app.get('/api/posts', async (req, res) => {
  try {
    const allPosts = await pool.query("SELECT * FROM posts ORDER BY id DESC");
    res.json(allPosts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// U: 게시글 수정 (간단하게 내용만 수정)
app.put('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    await pool.query(
      "UPDATE posts SET content = $1 WHERE id = $2",
      [content, id]
    );
    res.json("Post was updated");
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// D: 게시글 삭제
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM posts WHERE id = $1", [id]);
    res.json("Post was deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});

