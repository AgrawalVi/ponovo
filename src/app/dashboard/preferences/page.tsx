import UserPreferencesForm from '@/components/forms/user-preference-form'

export default function PreferencesPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-4">
      {/* <UserPreferencesForm applicationGoal={0} /> */}
      <h1 className="text-5xl font-semibold">Coming Soon</h1>
      <ul className="list-inside list-disc">
        <li>Create Goals</li>
        <li>Choose Default Job Role Type</li>
        <li>Choose Default Timeline Update Type</li>
      </ul>
    </div>
  )
}
