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
import { AppContainer } from '../../styles'
import styled from 'styled-components'
import { showInfoMessage } from '../../utils/showInfoMessage'

const FindUserContainer = styled.div`
  margin-top: 50px;
  margin-bottom: 20px;
`

export const SignUp = () => {
  const [searchInput, setSearchInput] = useState<string>('')
  const [foundUsers, setFoundUsers] = useState<userProps[]>([])
  const [allUsers, setAllUsers] = useState<userProps[]>([])

  const [errorWhenSearchingUsers, setErrorWhenSearchingUsers] =
    useState<boolean>(false)

  const [userSignUpSuccessfully, setUserSignUpSuccessfully] =
    useState<boolean>(false)
  const [errorWhenSignUp, setErrorWhenSignUp] = useState<boolean>(false)

  useEffect(() => {
    const getAllUsers = async () => {
      const users = await api.get('/users')

      setAllUsers(users.data)
    }
    getAllUsers()
  }, [])

  useEffect(() => {
    const getAllUsers = async () => {
      const users = await api.get('/users')

      setAllUsers(users.data)
    }
    if (userSignUpSuccessfully) getAllUsers()
  }, [userSignUpSuccessfully])

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
      await api.post<userProps>('/users', payload)
      showInfoMessage(setUserSignUpSuccessfully, 2000)
    } catch (error) {
      showInfoMessage(setErrorWhenSignUp, 2000)
    }
  }

  const handleUserSearchInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchInput(event.target.value)

  const handleSearchButton = async () => {
    try {
      const result = await api.get<userProps[]>(`/users`)

      const filteredResult = result.data.filter((user: userProps) =>
        user.username.toLowerCase().startsWith(searchInput.toLowerCase())
      )

      setFoundUsers(filteredResult)
    } catch (error) {
      showInfoMessage(setErrorWhenSearchingUsers, 2000)
    }
  }

  return (
    <AppContainer>
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

      <FindUserContainer>
        <span>Procurar usuário</span>
        <input type="text" onChange={handleUserSearchInput} />
        <button onClick={handleSearchButton}>Procurar</button>
        {errorWhenSearchingUsers && <InputError />}
        {foundUsers && <FoundUsers users={foundUsers} />}
      </FindUserContainer>

      <AllUsers users={allUsers} />
    </AppContainer>
  )
}
