import * as yup from 'yup'

export const loginFormSchema = yup.object().shape({
  username: yup.string().required('Este campo é obrigatório'),
  password: yup.string().required('Este campo é obrigatório'),
})
