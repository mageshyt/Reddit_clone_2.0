import { SearchIcon } from '@heroicons/react/solid'
import { InputText } from 'primereact/inputtext'
import React from 'react'

const styles = {
  icons: 'h-6 w-6 text-gray-400',
}

const Searchbar = () => {
  const [value, setValue] = React.useState('')
  return (
    <div className="flex flex-1  ">
      <div className="p-input-icon-left flex-1 ">
        <i className="pi pi-search" />
        <InputText
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search"
          className="w-full bg-gray-500"
            
        />
      </div>
    </div>
  )
}

export default Searchbar
