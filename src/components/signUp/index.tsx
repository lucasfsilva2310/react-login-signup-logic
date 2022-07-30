import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { signUpFormHandlerProps, signUpSubmitFormData } from './types'
import { AllUsers } from './AllUsers'
import { FoundUsers } from './foundUsers'
import { userProps } from '../../types/user'
import { signUpFormSchema } from './signUpFormSchema'
import { InputError } from '../inputError'

export const SignUp = () => {
  const [searchInput, setSearchInput] = useState('')
  const [foundUsers, setFoundUsers] = useState([])
  const [allUsers, setAllUsers] = useState([])

  const [errorWhenSearchingUsers, setErrorWhenSearchingUsers] = useState(false)

  const [userSignUpSuccessfully, setUserSignUpSuccessfully] = useState(false)
  const [errorWhenSignUp, setErrorWhenSignUp] = useState(false)

  useEffect(() => {
    const getAllUsers = async () => {
      const users = await api.get('/users')

      setAllUsers(users.data)
    }
    getAllUsers()
  }, [])

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<signUpFormHandlerProps>({
    resolver: yupResolver(signUpFormSchema),
  })

  const signUpFormHandler = async (data: signUpSubmitFormData) => {
    const payload = {
      username: data.username,
      password: data.password,
    }

    try {
      await api.post('/users', payload)

      setUserSignUpSuccessfully(true)
      return setTimeout(() => setUserSignUpSuccessfully(false), 2000)
    } catch (error) {
      setErrorWhenSignUp(true)
      return setTimeout(() => setErrorWhenSignUp(false), 2000)
    }
  }

  const handleUserSearchInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchInput(event.target.value)

  const handleSearchButton = async () => {
    try {
      const result = await api.get(`/users`)

      const filteredResult = result.data.filter((user: userProps) =>
        user.username.toLowerCase().startsWith(searchInput.toLowerCase())
      )

      setFoundUsers(filteredResult)
    } catch (error) {
      setErrorWhenSearchingUsers(true)
      return setTimeout(() => setErrorWhenSearchingUsers(false), 2000)
    }
  }

  return (
    <>
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
      {userSignUpSuccessfully && <span>Usuário cadastrado!</span>}
      {errorWhenSignUp && <InputError />}

      <div>
        <span>Procurar usuário</span>
        <input type="text" onChange={handleUserSearchInput} />
        <button onClick={handleSearchButton}>Procurar</button>
      </div>

      {errorWhenSearchingUsers && <InputError />}
      {foundUsers && <FoundUsers users={foundUsers} />}

      <AllUsers users={allUsers} />
    </>
  )
}
