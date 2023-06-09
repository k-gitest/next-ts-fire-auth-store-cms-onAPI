import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import type { User } from "firebase/auth";
import { Post } from 'types/post'
import axios from 'axios'
import useSWR from 'swr'
import useSWRMutation from "swr/mutation";
import Modal from 'components/Modal'
import PostForm from 'components/PostForm'
import ListCard from 'components/ListCard'

type Props = {
  user: User;
}

async function fetcher([url, uid]: [url: string, uid: string]) {
  return await axios.get(url, { params: { id: uid } }).then(res => res.data);
}

async function postFetcher(url: string, { arg }: { arg: [string, string] | undefined }) {
  const id = arg ? arg[1] : '';
  const uid = arg ? arg[0] : '';
  return await axios.get(url, { params: { id: id, uid: uid } }).then(res => res.data);
}

const useGetList = (uid: string) => {
  const { data, error, mutate } = useSWR(['/api/admin/post', uid], fetcher)
  const isLoading = !data && !error;
  const isError = error;
  const postList: Post[] | null = data ? data : null;
  const setPostList = mutate;
  return { isLoading, isError, postList, setPostList }
}

const defaultPostData = {
  title: '',
  release: '公開',
  category: '',
  article: '',
}

const PostList = (props: Props) => {
  const pathName = usePathname()
  const { isLoading, isError, postList, setPostList } = useGetList(props.user.uid)
  const { data, trigger, isMutating } = useSWRMutation('/api/admin/post', postFetcher)
  const [isModal, setModal] = useState(false);
  const [post, setPost] = useState<Post>(defaultPostData)
  const modalFlag = () => { setModal(true); }

  const handleEdit = async () => {
    try {
      await axios.put(`/api/admin/post`, post, { params: { id: post.id, uid: props.user.uid } })
      setPostList()
      setModal(false)
    }
    catch (err) {
      console.log(err)
    }
  }
  const handleDelete = async (id: string | undefined) => {
    try {
      await axios.delete(`/api/admin/post`, { params: { id: id, uid: props.user.uid } })
      setPostList()
    }
    catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    if (data) {
      setPost(data);
    }
  }, [data]);

  return (
    <div>
      <h2>投稿一覧</h2>
      {isLoading && (
        <p>Loading...</p>
      )}
      {isError && (
        <p>エラーです。</p>
      )}
      {postList && postList.length > 0 && (
        postList.map(item => (
          <div key={item.id} className="mb-2">
            <ListCard list={item}>
              <button onClick={() => { trigger([props.user.uid ?? '', item.id ?? '']); modalFlag(); }} className="bg-lime-500 hover:bg-lime-800 mr-2 p-3 rounded" >更新</button>
              <button onClick={() => handleDelete(item.id)} className="bg-red-500 hover:bg-red-800 p-3 rounded" >削除</button>
            </ListCard>
          </div>
        ))
      )}
      {postList && postList.length === 0 && (
        <p>記事がありません</p>
      )}
      <Modal showModal={isModal} setModal={setModal}>
        {isMutating && (
          <p>Loading...</p>
        )}
        {!isMutating && (
          <PostForm props={{ post: post, setPost: setPost, onRegister: handleEdit }} />
        )}
      </Modal>
      <div>
        <Link href={`${pathName}/post`} className="block bg-blue-500 p-3 hover:bg-blue-800 rounded text-center text-white">
          記事を投稿する
        </Link>
      </div>
    </div>
  )
}

export default PostList