import styled from 'styled-components'
import { userProps, usersList } from '../../types/user'

const UserCard = styled.div`
  margin: 10px;
`

export const AllUsers = ({ users }: usersList) => {
  return (
    <div>
      <>
        <span>Todos os usuários existentes:</span>
        {users &&
          users.map((user: userProps) => {
            return (
              <UserCard key={user.id}>
                <p>ID: {user.id}</p>
                <p>Nome: {user.username}</p>
                <p>Senha: {user.password}</p>
              </UserCard>
            )
          })}
      </>
    </div>
  )
}
