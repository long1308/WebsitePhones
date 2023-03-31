import React from 'react'
import { Outlet } from 'react-router-dom'

type Props = {}

const BaseLayout = (props: Props) => {
  return (
    <div>
        <header>Header</header>
        <main>
            <Outlet />
        </main>
        <footer>Footer</footer>
    </div>
  )
}

export default BaseLayout