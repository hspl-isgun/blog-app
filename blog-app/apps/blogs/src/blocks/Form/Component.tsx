'use client'

import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: SerializedEditorState
}

export const FormBlock: React.FC<{ id?: string } & FormBlockType> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
  } = props

  const formMethods = useForm({ defaultValues: formFromProps.fields })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: FormFieldBlock[]) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([field, value]) => ({
          field,
          value,
        }))

        loadingTimerID = setTimeout(() => setIsLoading(true), 500)

        try {
          const res = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
          })

          const json = await res.json()
          clearTimeout(loadingTimerID)

          if (res.status >= 400) {
            setIsLoading(false)
            setError({
              message: json.errors?.[0]?.message || 'Internal Server Error',
              status: res.status.toString(),
            })
            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect?.url) {
            router.push(redirect.url)
          }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
          clearTimeout(loadingTimerID)
          setIsLoading(false)
          setError({ message: 'Something went wrong.' })
        }
      }

      void submitForm()
    },
    [formID, redirect, confirmationType, router]
  )

  return (
    <section className="container py-16">
         <div className="relative w-full mb-12">
        <div className="absolute left-0 right-0 top-0 h-[1px] bg-gray-300" />
        <div className="absolute left-0 right-0 top-2 h-[4px] bg-black" />
        <div className="relative z-10 text-center text-xl font-semibold bg-white px-4 w-max mx-auto mt-6">
          Contact Us
        </div>
      </div>

      <div className="mx-auto max-w-3xl">
        {enableIntro && introContent && !hasSubmitted && (
          <div className="mb-10 text-center">
            <RichText className="prose max-w-none" data={introContent} enableGutter={false} />
          </div>
        )}

        <div className="bg-white/70 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-8">
          <FormProvider {...formMethods}>
            {!isLoading && hasSubmitted && confirmationType === 'message' && (
              <div className="text-center text-green-600 font-semibold text-lg">
                <RichText data={confirmationMessage} />
              </div>
            )}

            {isLoading && !hasSubmitted && (
              <div className="text-center py-4 animate-pulse text-muted-foreground">
                Submitting your response...
              </div>
            )}

            {error && (
              <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4 text-sm border border-red-300">
                <strong>Error:</strong> {error.status || '500'} - {error.message}
              </div>
            )}

            {!hasSubmitted && (
              <form id={formID} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {formFromProps?.fields?.map((field, index) => {
                  const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                  if (Field) {
                    return (
                      <div key={index}>
                        <Field
                          form={formFromProps}
                          {...field}
                          {...formMethods}
                          control={control}
                          errors={errors}
                          register={register}
                        />
                      </div>
                    )
                  }
                  return null
                })}

                <div className="pt-4 text-center">
                  <Button
                    type="submit"
                    form={formID}
                    className="w-full sm:w-auto"
                    disabled={isLoading}
                  >
                    {submitButtonLabel || 'Submit'}
                  </Button>
                </div>
              </form>
            )}
          </FormProvider>
        </div>
      </div>
    </section>
  )
}
