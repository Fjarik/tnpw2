// import * as yup from "yup";
// import "yup-phone";

// export const contactSchema = yup.object({
//     firstName: yup.string().required(),
//     lastName: yup.string().required(),
//     nickName: yup.string().nullable().notRequired(),
//     email: yup.string().nullable().notRequired().email(),
//     number: yup.string().nullable().notRequired().phone(),
//     birthDate: yup.date().nullable().notRequired().min(new Date(1900, 0, 1)),
// });

export interface IContact /* extends yup.Asserts<typeof contactSchema>*/ {
    id: string;
    firstName: string;
    lastName: string;
    nickName?: string | null;
    email?: string | null;
    number?: string | null;
    birthDate?: string | null;
}