'use client'

import React, { useState } from 'react'

import DialogFormWrapper from '@/components/ui/custom/dialog-form-wrapper'

import CreateApplicationSeasonForm from './create-application-season-form'

export default function CreateApplicationSeasonFormDialog({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (open: boolean) => void
}) {
  const [isChanged, setIsChanged] = useState(false)

  return (
    <DialogFormWrapper
      form={
        <CreateApplicationSeasonForm
          setIsChanged={setIsChanged}
          setOpen={setOpen}
        />
      }
      title="Create Application Season"
      description="Create a new application season"
      mainOpen={open}
      setMainOpen={setOpen}
      isChanged={isChanged}
    />
  )
}
