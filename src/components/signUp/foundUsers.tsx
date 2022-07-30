import { userProps, usersList } from '../../types/user'

export const FoundUsers = ({ users }: usersList) => {
  return (
    <div>
      <>
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
