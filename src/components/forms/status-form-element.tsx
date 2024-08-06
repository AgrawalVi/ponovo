import { statusEnum } from '@/types'
import { FormControl } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface StatusFormElementProps {
  onValueChange: (value: statusEnum) => void
  value: statusEnum
  disabled: boolean
}

export default function StatusFormElement({
  onValueChange,
  value,
  disabled,
}: StatusFormElementProps) {
  return (
    <Select
      onValueChange={onValueChange}
      defaultValue={value}
      disabled={disabled}
    >
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Select an update type" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="applied">Applied</SelectItem>
        <SelectItem value="online-assessment-received">
          Online Assessment Received
        </SelectItem>
        <SelectItem value="online-assessment-completed">
          Online Assessment Completed
        </SelectItem>
        <SelectItem value="interview-scheduled">Interview Scheduled</SelectItem>
        <SelectItem value="interviewed">Interviewed</SelectItem>
        <SelectItem value="rejected">Rejected</SelectItem>
        <SelectItem value="offer-received">Offer Received</SelectItem>
        <SelectItem value="offer-declined">Offer Declined</SelectItem>
        <SelectItem value="offer-accepted">Offer Accepted</SelectItem>
      </SelectContent>
    </Select>
  )
}
