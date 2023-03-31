import * as Yup from 'yup';

export const dataSchema = Yup.object({
    name: Yup.string().min(2, "Name must be greater than 2 alphabets").max(30).required("Please enter your name."),
    phoneNumber: Yup.number().min(10, "Please enter valid Phone Number").positive().integer().typeError("Please enter valid Phone Number").required("Please enter your Phone Number"),
    email: Yup.string().email("Enter valid email address").typeError("Enter valid email address").required("Please enter your Email."),
    hobbies: Yup.string().min(4).max(40).required("Please enter your hoobies."),
});