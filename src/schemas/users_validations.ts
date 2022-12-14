import { z } from "zod"

// Regex para validar telefone e celular
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const userSchema = z
  .object({
    username: z
      .string({
        required_error: "Name is required",
      })
      .min(3, "O nome deve ter no minimo 3 caracter")
      .max(50),
    email: z.string().email("Email precisar ser valido"),
    password: z
      .string({
        required_error: "O campo senha é obrigatorio",
      })
      .min(6)
      .max(50),
    confirmPassword: z
      .string({
        required_error: "O campo confirme senha é obrigatorio",
      })
      .min(6)
      .max(50),
    // birthday: z
    //   .string({
    //     required_error: "O campo data de nascimento é obrigatorio",
    //   })
    //   .min(8, "A data de nascimento deve ter no minimo 8 caracteres")
    //   .max(9, "A data de nascimento deve ter no maximo 11 caracteres"),
    name: z.string({
      required_error: "Seu nome e obrigatorio",
    }),
    emergencynumber: z
      .string()
      .min(10)
      .max(11, "Numero de emergencia precisa ser valido")
      .regex(phoneRegExp, "Numero de emergencia precisa ser valido"),
    gender: z
      .string({
        required_error: "O campo genero é obrigatório",
      })
      .min(1)
      .max(1),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "O campo confirme senha precisa ser igual ao campo senha",
      })
    }
  })

export const newPassword = z
  .object({
    password: z
      .string({
        required_error: "Sua senha é obrigatória",
      })
      .min(6)
      .max(50),
    newPassword: z
      .string({
        required_error: "A nova senha é obrigatória",
      })
      .min(6)
      .max(50),
    confirmPassword: z
      .string({
        required_error: "O campo confirme senha é obrigatorio",
      })
      .min(6)
      .max(50),
  })
  .superRefine(({ confirmPassword, newPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "O campo confirme senha precisa ser igual ao campo nova senha",
      })
    }
  })

export const recoverPassword = z
  .object({
    password: z
      .string({
        required_error: "Sua senha é obrigatória",
      })
      .min(6, { message: "A senha deve ter no minimo 6 caracteres" })
      .max(50),
    confirmPassword: z
      .string({
        required_error: "O campo confirme senha é obrigatorio",
      })
      .min(6, { message: "A senha deve ter no minimo 6 caracteres" })
      .max(50),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "O campo confirme senha precisa ser igual ao campo nova senha",
      })
    }
  })
