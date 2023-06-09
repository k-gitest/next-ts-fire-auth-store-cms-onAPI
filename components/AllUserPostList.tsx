import Link from 'next/link'
import axios from 'axios'
import useSWR from 'swr'
import { Post } from 'types/post'
import ListCard from 'components/ListCard'

const fetcher = async (url: string) => {
  return await axios.get(url).then(res => res.data)
}
const useGetAllPost = () => {
  const { data, error, mutate } = useSWR('/api/admin/post', fetcher)
  const isLoading = !data && !error;
  const isError = error;
  const allPostList: Post[] | null = data ? data : null;
  const setAllPostList = mutate;
  return { isLoading, isError, allPostList, setAllPostList }
}

const AllUserPostList = () => {
  const { isLoading, isError, allPostList, setAllPostList } = useGetAllPost()
  return (
    <div>
      {isLoading && (
        <p>Loading...</p>
      )}
      {isError && (
        <p>エラーです。</p>
      )}
      {allPostList && allPostList.length > 0 && (
        allPostList.map(item => (
          <div key={item.pid} className="mb-2">
            <Link href={`${item.uid}/${item.pid}`}>
              <ListCard list={item} />
            </Link>
          </div>
        ))
      )}
      {allPostList && allPostList.length === 0 && (
        <p>記事がありません</p>
      )}
    </div>
  )
}

export default AllUserPostList