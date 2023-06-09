import InputText from 'components/FormParts/InputText'
import InputRadio from 'components/FormParts/Radio'
import SelectBox from 'components/FormParts/SelectBox'
import TextArea from 'components/FormParts/TextArea'
import {Post} from 'types/post'

type Props = {
  props: { 
    post: Post; 
    setPost: React.Dispatch<React.SetStateAction<Post>>;
    onRegister: () => void;
  };
};

const Register = ({props}:Props) => {

  const releaseArray = ['公開', '非公開'];
  const categoryArray = ['カテゴリ１', 'カテゴリ２', 'カテゴリ３'];
  
  const handlePost = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setPost((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  const handleCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.setPost(prevState => ({...prevState, [event.target.name]: event.target.value}));
  };

  const handleArticle = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.setPost(prevState => ({
      ...prevState, 
      article: event.target.value,
    }))
  }
  
  return (
    <div className="mb-3 p-2">
      <div className="mb-3">
        <label htmlFor="title">タイトル</label>
        <InputText type="text" name="title" id="title" onChange={handlePost} value={props.post.title} />
      </div>
      <div className="mb-3">
        <label className="mr-3">公開設定</label>
        <InputRadio name="release" value={releaseArray} label={['公開', '非公開']} checked={props.post.release} onChange={handlePost} />
      </div>
      <div className="mb-3">
      <label>カテゴリ</label>
      <SelectBox name="category" id="category" value={categoryArray} selectCheck={props.post.category} onChange={handleCategory} />
      </div>
      <div className="mb-3">
      <label>記事</label>
      <TextArea name="article" id="article" value={props.post.article} onChange={handleArticle} />
      </div>
      <button className="block bg-blue-500 hover:bg-blue-800 text-white p-3 rounded w-full"  onClick={props.onRegister}>送信</button>
    </div>
  )
}

export default Register