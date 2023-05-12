import * as yup from "yup";

export const createBlogValidationSchema = yup
    .object({
        title: yup.string().required().min(2),
        description: yup.string().required(),
        rating: yup
            .number()
            .typeError("Rating must be a number")
            .required("Please provide rating.")
            // .test("max", "Dziekuje amigo", function(value) {
            //     console.log({ value });
            //     return value > 5;
            // })
            // .test("min", "pfff", function(value) {
            //     return value < 0;
            // }),
    })
    .required();