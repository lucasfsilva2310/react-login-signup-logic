import * as yup from 'yup'

const loginFormSchema = yup.object().shape({
  username: yup.string().required('Este campo é obrigatório'),
  password: yup.string().required('Este campo é obrigatório'),
})

const signUpFormSchema = yup.object().shape({
  username: yup.string().required('Este campo é obrigatório'),
  password: yup.string().required('Este campo é obrigatório'),
})

function App() {
  return (
    <div className="App">
      <div></div>
    </div>
  )
}

export default App
