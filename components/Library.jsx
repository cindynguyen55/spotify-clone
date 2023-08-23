import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

const Library = () => {
    const { data: session } = useSession()
    const [playlists, setPlaylists] = useState([])

    useEffect(() => {
        async function f() {
            if (session && session.accessToken) {
                const res = await fetch('https://api.spotify.com/v1/me/playlists', {
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`
                    }
                })

                const data = await res.json()
                setPlaylists(data.items)
            }
        }
        f()
    }, [session])

    return (
        <div className='flex-grow h-screen'>
            <header
                className='text-white sticky top-0 h-20 z-10 text-4xl'
            >

            </header>
            <div className='absolute z-20 top-5 right-8 flex items-center bg-black bg-opacity-70 text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2'>
                <img className='rounded-full w-7 h-7' src={session?.user.image} alt='Profile pic' />
                <p className='text-sm'>Logout</p>
                <ChevronDownIcon className='h-5 w-5' />
            </div>
            <div className='flex flex-col gap-4 px-8 h-screen overflow-y-auto'>
                <h2 className='tetx-xl font-bold'>
                    Playlist
                </h2>
                <div className='flex flex-wrap gap-6 mb-48'>
                    {playlists?.map((playlist)=>{
                        return (
                            <div 
                                key={playlist.id}
                                className='hover:cursor-pointer relative group w-56 mb-2 bg-neutral-800 hover:bg-neutral-600 rounded-md p-4'
                            >
                                {playlist?.name}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Library