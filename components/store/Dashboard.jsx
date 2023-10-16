import React from 'react'
import Overview from '@/components/store/Overview'
import CurrentOrders from '@/components/store/CurrentOrders'

const Dashboard = () => {
  return (
    <div>
        <Overview />
        <CurrentOrders />
    </div>
  )
}

export default Dashboard