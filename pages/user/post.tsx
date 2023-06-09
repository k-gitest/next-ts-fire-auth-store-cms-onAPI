import { useState } from 'react'
import { useRouter } from "next/navigation"
import axios from 'axios'
import type { Post } from 'types/post'
import PostForm from 'components/PostForm'
import { AuthUserContext } from 'components/provider/AuthProvider'

const Post = () => {
  const authUser = AuthUserContext()
  const router = useRouter()

  const defaultPostData = {
    title: '',
    release: '公開',
    category: '',
    article: '',
  }
  const [post, setPost] = useState<Post>(defaultPostData)
  const [error, setError] = useState('')

  const handleRegister = async () => {

    const uid = authUser ? authUser.uid : null;

    axios.post(`/api/admin/post`, { post, uid: uid })
      .then(res => {
        if (res.status === 200) {
          setPost(defaultPostData);
          router.push('/user');
        }
      })
      .catch(err => {
        if (err.response && err.response.status === 400) {
          setError('タイトルを入れてください');
        } else {
          console.log(err);
          setError(err.message);
        }
      });
  }

  return (
    <div>
      <h1>投稿</h1>
      {authUser && (
        <>
          <p>記事作成</p>
          {error && (<span className="text-red-500">{error}</span>)}
          <PostForm props={{ post: post, setPost: setPost, onRegister: handleRegister }} />
        </>
      )}
      {!authUser && (
        <>
          <p>ログインしてください</p>
        </>
      )}
      <div>
        <button className="border p-3 rounded" onClick={() => router.back()}>戻る</button >
      </div>
    </div>
  )
}

export default Post