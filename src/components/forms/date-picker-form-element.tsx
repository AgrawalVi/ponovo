import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { FormControl } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'

interface DatePickerFormElementProps {
  onValueChange: (value: Date | undefined) => void
  value: Date
  disabled: boolean
}

export default function DatePickerFormElement({
  onValueChange,
  value,
  disabled,
}: DatePickerFormElementProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={'outline-solid'}
            className={cn(
              'w-full pl-3 text-left font-normal',
              !value && 'text-muted-foreground',
            )}
            disabled={disabled}
          >
            {value ? format(value, 'PPP') : <span>Pick a date</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="center">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onValueChange}
          disabled={(date) =>
            date > new Date() || date < new Date('1900-01-01')
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
