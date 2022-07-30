import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const signUpFormSchema = yup.object().shape({
  username: yup.string().required('Este campo é obrigatório'),
  password: yup.string().required('Este campo é obrigatório'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'As senhas têm que ser iguais!'),
})

type signUpSubmitFormData = {
  username: string
  password: string
}

type signUpFormHandlerProps = {
  username: string
  password: string
  passwordConfirmation: string
}

export const SignUp = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<signUpFormHandlerProps>({
    resolver: yupResolver(signUpFormSchema),
  })

  const signUpFormHandler = (data: signUpSubmitFormData) => {
    const payload = {
      username: data.username,
      password: data.password,
    }

    console.log(payload)
    // Cadastrar usuário no servidor
  }

  return (
    <form onSubmit={handleSubmit(signUpFormHandler)}>
      <div>
        <div>
          <span>Usuário</span>
          <input type="text" {...register('username')} />
          <span>{errors.username?.message || ''}</span>
        </div>
        <div>
          <span>Senha</span>
          <input type="text" {...register('password')} />
          <span>{errors.password?.message || ''}</span>
        </div>
        <div>
          <span>Confirmação de senha</span>
          <input type="text" {...register('passwordConfirmation')} />
          <span>{errors.passwordConfirmation?.message || ''}</span>
        </div>
        <button type="submit">Cadastrar</button>
      </div>
    </form>
  )
}
