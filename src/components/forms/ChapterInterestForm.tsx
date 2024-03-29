import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import FormButton from "../formElements/FormButton";
import chapterPageActions from "@/api/modules/chapterPages/chapterPages";
import sendToast from "@/util/toast/toast";
import { ToastTypes } from "@/util/toast/enums/toastTypes";
import RadioButtons from "../formElements/RadioButtons";
import TextField from "../formElements/TextField";

enum FormFeedbackEnum {
  FIELD_REQUIRED = "This is required.",
  INVALID_EMAIL = "Invalid email",
}

type Props = {
  chapter: string;
  chapterType: string;
};

export interface EmailData {
  chapter: string;
  form: string;
  data: {
    fullName: string;
    email: string;
    phone: string;
    eligibilityQuestions: {
      [key: string]: string;
    };
  };
}

const options = [
  { key: "Yes", value: "yes" },
  { key: "No", value: "no" },
];

const ChapterInterestForm = (props: Props) => {
  const [errors, setErrors] = useState<string[] | null>(null);
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      currentlyEnrolled:
        props.chapterType === "undergraduate" ? options[0].value : undefined,
      hasMinimumCredits:
        props.chapterType === "undergraduate" ? options[0].value : undefined,
      hasBaccalaureate:
        props.chapterType === "graduate" ? options[0].value : undefined,
      university: props.chapterType === "graduate" ? "" : undefined,
    },
    onSubmit: async (values) => {
      const emailData: EmailData = {
        chapter: props.chapter,
        form: "CHAPTER_INTEREST",
        data: {
          fullName: values.fullName,
          email: values.email,
          phone: values.phone,
          eligibilityQuestions: {
            currentlyEnrolled:
              props.chapterType === "undergraduate"
                ? values.currentlyEnrolled
                : undefined,
            hasMinimumCredits:
              props.chapterType === "undergraduate"
                ? values.hasMinimumCredits
                : undefined,
            hasBaccalaureate:
              props.chapterType === "graduate"
                ? values.hasBaccalaureate
                : undefined,
            university:
              props.chapterType === "graduate" ? values.university : undefined,
          },
        },
      };
      const [res, errors] = await chapterPageActions.sendChapterInterestEmail(
        emailData
      );
      if (errors) {
        setErrors(errors);
        return;
      }
      if (res.success) {
        setErrors(null);
        formik.setValues(formik.initialValues);
        formik.setTouched(formik.initialTouched);
        sendToast("Form submitted successfully!", ToastTypes.SUCCESS);
      }
    },
    validationSchema:
      props.chapterType === "undergraduate"
        ? Yup.object({
            fullName: Yup.string().required(FormFeedbackEnum.FIELD_REQUIRED),
            email: Yup.string()
              .email(FormFeedbackEnum.INVALID_EMAIL)
              .required(FormFeedbackEnum.FIELD_REQUIRED),
            phone: Yup.string().required(FormFeedbackEnum.FIELD_REQUIRED),
            currentlyEnrolled: Yup.string().required(
              FormFeedbackEnum.FIELD_REQUIRED
            ),
            hasMinimumCredits: Yup.string().required(
              FormFeedbackEnum.FIELD_REQUIRED
            ),
          })
        : Yup.object({
            fullName: Yup.string().required(FormFeedbackEnum.FIELD_REQUIRED),
            email: Yup.string()
              .email(FormFeedbackEnum.INVALID_EMAIL)
              .required(FormFeedbackEnum.FIELD_REQUIRED),
            phone: Yup.string().required(FormFeedbackEnum.FIELD_REQUIRED),
            hasBaccalaureate: Yup.string().required(
              FormFeedbackEnum.FIELD_REQUIRED
            ),
            university: Yup.string().required(FormFeedbackEnum.FIELD_REQUIRED),
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
        {errors && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-feedback-warning">
                  {errors.length > 1 ? (
                    <>There were {errors.length} errors with your submission</>
                  ) : (
                    <>There was {errors.length} error with your submission</>
                  )}
                </h3>
                <div className="mt-2 text-sm text-feedback-warning">
                  <ul role="list" className="list-disc space-y-1 pl-5">
                    {errors.map((error: string, idx: number) => (
                      <li key={idx}>{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        <TextField
          label="Full name"
          for="fullName"
          formType="text"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          errorMessage={formik.errors.fullName}
          onBlur={formik.handleBlur}
        />
        <TextField
          label="Email"
          for="email"
          formType="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          errorMessage={formik.errors.email}
          onBlur={formik.handleBlur}
        />
        <TextField
          label="Phone number"
          for="phone"
          formType="tel"
          value={formik.values.phone}
          onChange={formik.handleChange}
          errorMessage={formik.errors.phone}
          onBlur={formik.handleBlur}
        />
        {props.chapterType === "undergraduate" ? (
          <>
            <div className="my-1">
              <RadioButtons
                flowDirection="row"
                for="currentlyEnrolled"
                label="Currently enrolled at the University of The Bahamas?"
                options={options}
                onChange={(e) =>
                  formik.setFieldValue("currentlyEnrolled", e.target.value)
                }
              />
            </div>
            <div className="my-1">
              <RadioButtons
                flowDirection="row"
                for="hasMinimumCredits"
                label="Do you have at least 30 credit hours?"
                options={options}
                onChange={(e) =>
                  formik.setFieldValue("hasMinimumCredits", e.target.value)
                }
              />
            </div>
          </>
        ) : (
          <>
            <div className="my-1">
              <RadioButtons
                flowDirection="row"
                for="hasBaccalaureate"
                label="Do you have a baccalaureate degree?"
                options={options}
                onChange={(e) =>
                  formik.setFieldValue("hasBaccalaureate", e.target.value)
                }
              />
            </div>

            <TextField
              label="Which university did you attain a baccalaureate?"
              for="university"
              formType="text"
              value={formik.values.university}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              errorMessage={formik.errors.university}
            />
          </>
        )}
        <FormButton text={"I want to join"} />
      </form>
    </div>
  );
};
export default ChapterInterestForm;
