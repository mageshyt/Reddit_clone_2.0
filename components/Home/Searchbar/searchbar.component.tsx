import { SearchIcon } from '@heroicons/react/solid'
import { InputText } from 'primereact/inputtext'
import React from 'react'

const Searchbar = () => {
  const [value, setValue] = React.useState('')
  return (
    <div className="flex flex-1 bg-[#181a1b]  ">
      <div className="p-input-icon-left flex-1 ">
        <i className="pi pi-search" />
        <InputText
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search"
          className="w-full "
          style={{
            backgroundColor: '#181a1b',
          }}
        />
      </div>
    </div>
  )
}

export default Searchbar
