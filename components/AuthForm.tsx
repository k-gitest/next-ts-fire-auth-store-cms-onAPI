import InputText from 'components/FormParts/InputText'
import {AuthUser} from 'types/auth'

type Props = {
  account: AuthUser;
  setAccount: React.Dispatch<React.SetStateAction<AuthUser>>;
}

const AuthForm = (props: Props) => {

  const handleAccount = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setAccount((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };
  
  return (
    <div>
      <div className="mb-2">
      <label htmlFor="email">email</label>
        <InputText type="email" name="email" id="email" completeValue="username" value={props.account.email} onChange={handleAccount} />
      </div>
      <div className="mb-2">
      <label htmlFor="email">password</label>
        <InputText type="password" name="password" id="password" completeValue="current-password" value={props.account.password} onChange={handleAccount} />
      </div>
      <div className="flex justify-center">
        <button type="submit" className="bg-blue-500 hover:bg-blue-800 py-3 px-8 rounded text-white">送信</button>
      </div>
    </div>
  )
}

export default AuthForm