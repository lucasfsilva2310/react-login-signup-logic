import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Login } from './components/login'

const signUpFormSchema = yup.object().shape({
  username: yup.string().required('Este campo é obrigatório'),
  password: yup.string().required('Este campo é obrigatório'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'As senhas têm que ser iguais!'),
})

function App() {
  const {
    handleSubmit: handleSignUpForm,
    control: controlSignUp,
    formState: { errors: errorsSignUp },
  } = useForm<{ username: string; password: string }>({
    resolver: yupResolver(signUpFormSchema),
  })

  return (
    <div className="App">
      <Login />
    </div>
  )
}

export default App
