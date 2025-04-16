import React from 'react'
import Account from '../layout/Account'
import DepositHistory from '../components.jsx/account/DepositHIstory'
import PurchaseHistory from '../components.jsx/account/PurchaseHistory'

const DashBoard = () => {
  return (
    <Account>
        <div className='lg:w-5/6 mx-auto 2xl:w-1/2'>
            <DepositHistory/>
            <PurchaseHistory/>
        </div>
    </Account>
  )
}

export default DashBoard
