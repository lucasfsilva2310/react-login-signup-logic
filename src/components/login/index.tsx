import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/api'
import { useState } from 'react'
import { formHandlerProps, loginSubmitFormData } from './types'
import { userProps } from '../../types/user'
import { loginFormSchema } from './loginFormSchema'
import { InputError } from '../inputError'
import { AppContainer } from '../../styles'
import { showInfoMessage } from '../../utils/showInfoMessage'

export const Login = () => {
  const [errorWhenFetching, setErrorWhenFetching] = useState<boolean>(false)
  const [showUserWasFound, setShowUserWasFound] = useState<boolean>(false)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formHandlerProps>({
    resolver: yupResolver(loginFormSchema),
  })

  const loginFormHandler = async (data: loginSubmitFormData) => {
    try {
      const result = await api.get<userProps[]>(
        `/users?username=${data.username}&password=${data.password}`
      )

      const userFound = result.data.length

      if (userFound) {
        return showInfoMessage(setShowUserWasFound, 2000)
      }
    } catch (error) {
      showInfoMessage(setErrorWhenFetching, 2000)
    }
  }

  const handleSignUpButton = () => navigate('/signup')

  return (
    <AppContainer>
      <form onSubmit={handleSubmit(loginFormHandler)}>
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
          {showUserWasFound && <span>Usuário encontrado!</span>}
          {errorWhenFetching && <InputError />}
          <button type="submit">Entrar</button>
          <button type="button" onClick={handleSignUpButton}>
            Cadastrar
          </button>
        </div>
      </form>
    </AppContainer>
  )
}
