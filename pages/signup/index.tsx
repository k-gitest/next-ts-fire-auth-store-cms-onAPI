import {useState} from 'react'
import {useRouter} from 'next/router'
import {AuthUser} from 'types/auth'
import {SignupSubmit} from 'lib/authsubmit'
import {AuthUserContext} from 'components/provider/AuthProvider'
import AuthForm from 'components/AuthForm'
import CenterWrap from 'components/CenterWrap'

const Signup = () => {
  const authUser = AuthUserContext()
  
  const defaultState = {email: '', password: ''}
  const [account, setAccount] = useState<AuthUser>(defaultState)
  const router = useRouter()
  const [error, setError] = useState('')

  const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    const result = await SignupSubmit(account.email, account.password)
    if(result && result.success){
      router.push('/user')
    } else {
      setError(result?.error ? result.error : '')
    }
  }

  if(!authUser){
    return (
      <CenterWrap className="flex-col">
        <h1 className="text-center mb-3">新規登録ページ</h1>
        {error && (<span className="text-red-500">{error}</span>)}
        <form onSubmit={handleSubmit} className="flex justify-center">
          <AuthForm account={account} setAccount={setAccount} />
        </form>
      </CenterWrap>
    )
  } else {
    return (
      <p>ログインしています</p>
    )
  }
  
}

export default Signup