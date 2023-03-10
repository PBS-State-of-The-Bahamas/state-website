import React from "react";
import InputField from "../formElements/InputField";
import * as Yup from "yup";
import { useFormik } from "formik";
import RadioGroup from "../formElements/RadioGroup";
import FormButton from "../formElements/FormButton";

enum FormFeedbackEnum {
  FIELD_REQUIRED = "This is required.",
  INVALID_EMAIL = "Invalid email",
}

const ChapterInterestForm = () => {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      currentlyEnrolled: "",
      hasMinimumCredits: "",
    },
    onSubmit: async (values) => {
      // send email
      console.log(values);
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required(FormFeedbackEnum.FIELD_REQUIRED),
      email: Yup.string()
        .email(FormFeedbackEnum.INVALID_EMAIL)
        .required(FormFeedbackEnum.FIELD_REQUIRED),
      phone: Yup.string().required(FormFeedbackEnum.FIELD_REQUIRED),
      currentlyEnrolled: Yup.string().required(FormFeedbackEnum.FIELD_REQUIRED),
      hasMinimumCredits: Yup.string().required(FormFeedbackEnum.FIELD_REQUIRED),
    }),
  });

  const submit = (e: any) => {
    e.preventDefault();
    formik.handleSubmit(e);
  };
  
  return (
    <div className="max-w-screen-sm flex flex-col mx-auto mt-8 mb-16 max-sm:px-2">
      <h4 className="text-heading-4 py-4">Interested in Joining</h4>
      <form className="flex flex-col" onSubmit={(e: any) => submit(e)}>
        <InputField
          label="Full name"
          name="fullName"
          type="text"
          autoComplete="name"
          value={formik.values.fullName}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.fullName ? formik.errors.fullName : undefined}
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          value={formik.values.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.email ? formik.errors.email : undefined}
        />
        <InputField
          label="Phone number"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={formik.values.phone}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.phone ? formik.errors.phone : undefined}
        />
        <RadioGroup
          label="Currently enrolled at the University of The Bahamas?"
          error={
            formik.touched.currentlyEnrolled
              ? formik.errors.currentlyEnrolled
              : undefined
          }
        >
          <input
            type="radio"
            id="currentlyEnrolledYes"
            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
            onChange={formik.handleChange}
            name="currentlyEnrolled"
            value="yes"
          />
          <label
            htmlFor="currentlyEnrolledYes"
            className="mx-3 block text-sm font-bold leading-6 uppercase"
          >
            yes
          </label>
          <input
            type="radio"
            onChange={formik.handleChange}
            id="currentlyEnrolledNo"
            className="h-4 w-4 border-royal-blue text-indigo-600 checked:bg-royal-blue"
            name="currentlyEnrolled"
            value="no"
          />
          <label
            htmlFor="currentlyEnrolledNo"
            className="mx-3 block text-sm font-bold leading-6 uppercase"
          >
            no
          </label>
        </RadioGroup>
        <RadioGroup
          label="Do you have at least 30 credit hours?"
          error={
            formik.touched.hasMinimumCredits
              ? formik.errors.hasMinimumCredits
              : undefined
          }
        >
          <input
            type="radio"
            id="hasMinimumCreditsYes"
            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
            onChange={formik.handleChange}
            name="hasMinimumCredits"
            value="yes"
          />
          <label
            htmlFor="hasMinimumCreditsYes"
            className="mx-3 block text-sm font-bold leading-6 uppercase"
          >
            yes
          </label>
          <input
            type="radio"
            onChange={formik.handleChange}
            id="hasMinimumCreditsNo"
            className="h-4 w-4 border-royal-blue text-indigo-600 checked:bg-royal-blue"
            name="hasMinimumCredits"
            value="no"
          />
          <label
            htmlFor="hasMinimumCreditsNo"
            className="mx-3 block text-sm font-bold leading-6 uppercase"
          >
            no
          </label>
        </RadioGroup>
        <FormButton text={"I want to join"} />
      </form>
    </div>
  );
};

export default ChapterInterestForm;
