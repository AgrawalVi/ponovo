'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { dbApplicationSeason } from '@/types'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Edit2, Save, X } from 'lucide-react'
import { cn, handleServerActionResponseForm } from '@/lib/utils'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { editApplicationSeasonSchema } from '@/schemas'
import { setActiveApplicationSeason } from '@/actions/application-seasons/set-active-application-season'
import { getQueryKey } from '@trpc/react-query'
import { api } from '@/trpc/react'
import { useQueryClient } from '@tanstack/react-query'
import { editApplicationSeason } from '@/actions/application-seasons/edit-application-season'

function ActiveStatusControl({
  season,
  onSetActive,
  loading,
}: {
  season: dbApplicationSeason
  onSetActive: (id: string) => void
  loading: boolean
}) {
  if (season.active) {
    return (
      <Badge variant="default">
        <Check className="mr-1 h-3 w-3" />
        Active
      </Badge>
    )
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => onSetActive(season.id)}
      disabled={loading}
      className="h-6 px-2 text-xs"
    >
      Set Active
    </Button>
  )
}

function EditSeasonForm({
  season,
  onSave,
  onCancel,
  loading,
}: {
  season: dbApplicationSeason
  onSave: (data: z.infer<typeof editApplicationSeasonSchema>) => void
  onCancel: () => void
  loading: boolean
}) {
  const form = useForm<z.infer<typeof editApplicationSeasonSchema>>({
    resolver: zodResolver(editApplicationSeasonSchema),
    defaultValues: {
      name: season.name,
      description: season.description || '',
    },
  })

  const handleSubmit = (data: z.infer<typeof editApplicationSeasonSchema>) => {
    onSave(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Name</FormLabel>
              <FormControl>
                <Input {...field} disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Description</FormLabel>
              <FormControl>
                <Textarea {...field} disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onCancel}
            disabled={loading}
            className="h-7 px-2 text-xs"
          >
            <X className="mr-1 h-3 w-3" />
            Cancel
          </Button>
          <Button
            type="submit"
            size="sm"
            disabled={loading || !form.formState.isValid}
            className="h-7 px-2 text-xs"
          >
            <Save className="mr-1 h-3 w-3" />
            Save
          </Button>
        </div>
      </form>
    </Form>
  )
}

function SeasonDisplay({
  season,
  onEdit,
}: {
  season: dbApplicationSeason
  onEdit: () => void
}) {
  return (
    <div>
      <h3 className="mb-1 text-base font-semibold">{season.name}</h3>
      {season.description && (
        <p className="text-sm text-muted-foreground">{season.description}</p>
      )}
    </div>
  )
}

function SeasonCard({
  season,
  editingId,
  onEdit,
  onSave,
  onCancel,
  onSetActive,
  loading,
}: {
  season: dbApplicationSeason
  editingId: string | null
  onEdit: (season: dbApplicationSeason) => void
  onSave: (data: z.infer<typeof editApplicationSeasonSchema>) => void
  onCancel: () => void
  onSetActive: (id: string) => void
  loading: string | null
}) {
  const isEditing = editingId === season.id
  const isLoading = loading === season.id

  return (
    <Card
      className={cn(
        'transition-all duration-200',
        season.active && 'ring-2 ring-primary',
      )}
    >
      <CardContent className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ActiveStatusControl
              season={season}
              onSetActive={onSetActive}
              loading={isLoading}
            />
          </div>

          {!isEditing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(season)}
              className="h-7 w-7 p-0"
            >
              <Edit2 className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>

        {isEditing ? (
          <EditSeasonForm
            season={season}
            onSave={onSave}
            onCancel={onCancel}
            loading={isLoading}
          />
        ) : (
          <SeasonDisplay season={season} onEdit={() => onEdit(season)} />
        )}
      </CardContent>
    </Card>
  )
}

function EmptyState() {
  return (
    <div className="py-6 text-center text-muted-foreground">
      <p>No application seasons found.</p>
    </div>
  )
}

export default function ManageApplicationSeasons({
  applicationSeasons,
  open,
  setOpen,
}: {
  applicationSeasons: dbApplicationSeason[]
  open: boolean
  setOpen: (open: boolean) => void
}) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState<string | null>(null)
  const queryClient = useQueryClient()
  const queryKey = getQueryKey(api.applicationSeasons.getAllApplicationSeasons)

  const handleEdit = (season: dbApplicationSeason) => {
    setEditingId(season.id)
  }

  const handleSave = async (
    data: z.infer<typeof editApplicationSeasonSchema>,
  ) => {
    if (!editingId) return
    setLoading(editingId)
    const response = await editApplicationSeason(editingId, {
      name: data.name,
      description: data.description,
    })
    handleServerActionResponseForm(response, undefined, undefined, {
      queryKey,
      queryClient,
    })

    if ('success' in response) {
      setEditingId(null)
    }

    setLoading(null)
  }

  const handleCancel = () => {
    setEditingId(null)
  }

  const handleSetActive = async (id: string) => {
    setLoading(id)
    const response = await setActiveApplicationSeason(id)

    handleServerActionResponseForm(response, undefined, undefined, {
      queryKey,
      queryClient,
    })

    setLoading(null)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manage Application Seasons</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>
              Manage your application seasons here.
            </DialogDescription>
          </VisuallyHidden>
        </DialogHeader>

        <div className="mt-1 space-y-2">
          {applicationSeasons.length === 0 ? (
            <EmptyState />
          ) : (
            applicationSeasons.map((season) => (
              <SeasonCard
                key={season.id}
                season={season}
                editingId={editingId}
                onEdit={handleEdit}
                onSave={handleSave}
                onCancel={handleCancel}
                onSetActive={handleSetActive}
                loading={loading}
              />
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
