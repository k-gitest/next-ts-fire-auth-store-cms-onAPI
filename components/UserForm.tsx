import InputText from 'components/FormParts/InputText'
import Radio from 'components/FormParts/Radio'
import Checkbox from 'components/FormParts/CheckBox'
import SelectBox from 'components/FormParts/SelectBox'
import TextArea from 'components/FormParts/TextArea'
import { User } from 'types/user'

type Props = {
  props: {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
    onRegister: () => void;
  };
};

const Register = ({ props }: Props) => {
  const genderArray = ['男性', '女性'];
  const hobbyArray = ['読書', '音楽', 'スポーツ'];
  const selectArray = ['hoge1', 'hoge2', 'hoge3'];

  const handleUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setUser((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  const handleHobby = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    props.setUser(prevState => ({
      ...prevState,
      hobby: checked ? [...prevState.hobby, value] : prevState.hobby.filter(h => h !== value)
    }));
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.setUser(prevState => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  const handleComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.setUser(prevState => ({
      ...prevState,
      comment: event.target.value,
    }))
  }

  return (
    <div className="mb-3 p-2">
      <div className="mb-3">
        <label htmlFor="name">名前</label>
        <InputText type="text" name="name" id="name" onChange={handleUser} value={props.user.name} />
      </div>
      <div className="mb-3">
        <label htmlFor="address">住所</label>
        <InputText type="text" name="address" id="address" onChange={handleUser} value={props.user.address} />
      </div>
      <div className="mb-3">
        <label htmlFor="address">Eメール</label>
        <InputText type="email" name="email" id="email" onChange={handleUser} value={props.user.email} />
      </div>
      <div className="mb-3">
        <label className="mr-3">性別</label>
        <Radio name="gender" value={genderArray} label={['男性', '女性']} checked={props.user.gender} onChange={handleUser} />
      </div>
      <div className="mb-3">
        <label className="mr-3">趣味</label>
        <Checkbox name="hobby" value={hobbyArray} label={['読書', '音楽', 'スポーツ']} checked={props.user.hobby} onChange={handleHobby} />
      </div>
      <div className="mb-3">
        <label>選択</label>
        <SelectBox name="selectValue" id="selectValue" value={selectArray} selectCheck={props.user.selectValue} onChange={handleSelect} />
      </div>
      <div className="mb-3">
        <label>コメント</label>
        <TextArea name="comment" id="comment" value={props.user.comment} onChange={handleComment} />
      </div>
      <button className="block bg-blue-500 hover:bg-blue-800 text-white p-3 rounded w-full" onClick={props.onRegister}>送信</button>
    </div>
  )
}

export default Register