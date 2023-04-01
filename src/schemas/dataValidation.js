import * as Yup from 'yup';

export const dataSchema = Yup.object({
    name: Yup.string().min(2, "Name must be greater than 2 alphabets.").max(30),
    phoneNumber: Yup.number().min(10, "Please enter valid Phone Number.").positive().integer().typeError("Please enter valid Phone Number."),
    email: Yup.string().email("Enter valid email address.").typeError("Enter valid email address."),
    hobbies: Yup.string().min(3,"Hobbies must be of greater than 3 alphabets.").max(40),
});