import { userProps, usersListProps } from '../../types/user'

export const AllUsers = ({ users }: usersListProps) => {
  return (
    <div>
      <>
        <span>Todos os usuários existentes:</span>
        {users &&
          users.map((user: userProps, index) => {
            return (
              <div key={user.id}>
                <span>ID: {user.id}</span>
                <span>Nome: {user.username}</span>
                <span>Senha: {user.password}</span>
              </div>
            )
          })}
      </>
    </div>
  )
}
