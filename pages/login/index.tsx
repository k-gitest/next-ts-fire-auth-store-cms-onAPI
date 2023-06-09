import AuthForm from 'components/AuthForm'
import CenterWrap from 'components/CenterWrap'
import {useState} from 'react'
import {AuthUser} from 'types/auth'
import {useRouter} from 'next/router'
import {AuthUserContext} from 'components/provider/AuthProvider'
import {SigninSubmit, SignoutSubmit} from 'lib/authsubmit'

const Login = () => {
  const authUser = AuthUserContext()
  const defaultState = {email: '', password: ''}
  const [account, setAccount] = useState<AuthUser>(defaultState)
  const router = useRouter()
  const [error, setError] = useState(null)

  const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    const result = await SigninSubmit(account.email, account.password)
    if(result !== undefined && result.success){
      router.push('/user')
    } else {
      SignoutSubmit()
      setError(result?.error)
    }
  }
  
  return(
    <CenterWrap className="flex-col">
      <h1 className="text-center mb-3">ログインページ</h1>
      {error && (<span className="text-red-500">{error}</span>)}
      {!authUser && (
        <form onSubmit={handleSubmit} className="flex justify-center">
          <AuthForm account={account} setAccount={setAccount} />
        </form>
      )}
      {authUser && (
        (<>ログインしています</>)
      )}
    </CenterWrap>
  )
}

export default Login