import { useForm, useField } from "vee-validate";
import * as yup from "yup";

export function useRequestForm(fn) {
    const { isSubmitting, handleSubmit } = useForm({});

    const {
        value: name,
        errorMessage: nError,
        handleBlur: nBlur,
    } = useField("name", yup.string().trim().required("Error: not name"));

    const {
        value: email,
        errorMessage: eError,
        handleBlur: eBlur,
    } = useField("email", yup.string().trim().required("Error: not email"));

    const onSubmit = handleSubmit(fn);

    console.log(name);

    return {
        isSubmitting,
        handleSubmit,
        onSubmit,
        name,
        nError,
        nBlur,
        email,
        eError,
        eBlur,
    };
}
