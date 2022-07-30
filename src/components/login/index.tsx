import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const loginFormSchema = yup.object().shape({
  username: yup.string().required('Este campo é obrigatório'),
  password: yup.string().required('Este campo é obrigatório'),
})

type loginSubmitFormData = {
  username: string
  password: string
}

export const Login = () => {
  const {
    register,
    handleSubmit,
    // control,
    formState: { errors },
  } = useForm<{ username: string; password: string }>({
    resolver: yupResolver(loginFormSchema),
  })

  const loginFormHandler = (data: loginSubmitFormData) => {
    const payload = {
      username: data.username,
      password: data.password,
    }

    console.log(payload)
    // Checar se o Usuário existe (adicionar lib testServer da rocketSeat)
  }

  return (
    <form onSubmit={handleSubmit(loginFormHandler)}>
      <div>
        {' '}
        {/*Container Login*/}
        <div>
          {' '}
          {/*Container Title and Input*/}
          <span>Login</span>
          <input type="text" {...register('username')} />
          <span>{errors.username?.message || ''}</span>
        </div>
        <div>
          {' '}
          {/*Container Title and Input*/}
          <span>Password</span>
          <input type="text" {...register('password')} />
        </div>
        <button type="submit">Login</button>
        <button type="button" onClick={() => console.log('Change Route')}>
          Sign Up
        </button>
      </div>
    </form>
  )
}
