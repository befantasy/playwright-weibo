const express = require('express');
const { postWeibo } = require('./weibo');

const app = express();
app.use(express.json());

app.post('/post-weibo', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).send('Missing text');
  try {
    await postWeibo(text);
    res.send('微博发送成功');
  } catch (err) {
    console.error(err);
    res.status(500).send('发送失败');
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running');
});
