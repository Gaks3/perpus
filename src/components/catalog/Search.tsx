'use client'

import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

const searchByValue = ['title', 'author', 'publisher', 'ISBN']

export function Search({ initial, by }: { initial?: string; by?: string }) {
  const [search, setSearch] = useState(initial || '')
  const [searchBy, setSearchBy] = useState<string>(by || 'title')
  const router = useRouter()

  function handleSearch() {
    if (search.trim() !== '') router.push(`/catalog?s=${search}&by=${searchBy}`)
  }

  return (
    <div className='flex flex-col gap-3 md:flex-row'>
      <div className='flex items-center p-1 border rounded-md w-fit border-border'>
        <input
          type='text'
          placeholder='Search...'
          className='flex-1 h-full px-3 text-sm border-none outline-none placeholder:text-muted-foreground'
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') handleSearch()
          }}
        />
        <Select
          value={searchBy}
          onValueChange={(value) => setSearchBy(value)}
          defaultValue='title'
        >
          <SelectTrigger className='!outline-none !border-none !ring-0 !ring-offset-0 w-fit bg-secondary gap-3 capitalize h-8 rounded'>
            <SelectValue placeholder='Search By' />
          </SelectTrigger>
          <SelectContent>
            {searchByValue.map((value, index) => (
              <SelectItem key={index} value={value} className='capitalize'>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button onClick={handleSearch}>Search</Button>
    </div>
  )
}
