import React from 'react'
import { SettingsForm } from './_components/settings-form'

export const metadata = {
    title : "Settings | EVGO", 
    description: "Manage DealerShip Working Hours And Admin Users"
}

const SettingsPage = () => {
  return (
    <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 pt-6">Settings</h1>
        <SettingsForm />
    </div>
  )
}

export default SettingsPage