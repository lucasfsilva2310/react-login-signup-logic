import { userProps, usersListProps } from '../../types/user'

export const FoundUsers = ({ users }: usersListProps) => {
  return (
    <div>
      <>
        <span>Procurar um usuário:</span>
        {users &&
          users.map((user: userProps) => {
            return (
              <div key={user.id}>
                <span>Nome: {user.username}</span>
              </div>
            )
          })}
      </>
    </div>
  )
}
