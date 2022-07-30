import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'

const loginFormSchema = yup.object().shape({
  username: yup.string().required('Este campo é obrigatório'),
  password: yup.string().required('Este campo é obrigatório'),
})

type loginSubmitFormData = {
  username: string
  password: string
}

type formHandlerProps = {
  username: string
  password: string
}

export const Login = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formHandlerProps>({
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
        <div>
          {' '}
          <span>Usuário</span>
          <input type="text" {...register('username')} />
          <span>{errors.username?.message || ''}</span>
        </div>
        <div>
          <span>Senha</span>
          <input type="text" {...register('password')} />
          <span>{errors.password?.message || ''}</span>
        </div>
        <button type="submit">Entrar</button>
        <button type="button" onClick={() => navigate('/signup')}>
          Cadastrar
        </button>
      </div>
    </form>
  )
}
