import { PlayCircleIcon } from '@heroicons/react/24/solid'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

const Player = ({ globalCurrentSongId }) => {
  const { data: session } = useSession()
  const [songInfo, setSongInfo] = useState(null)

  async function fetchSongInfo(trackId) {
    if (trackId) {
      const res = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`
        }
      })
      const data = await res.json()
      setSongInfo(data)
    }
  }

  useEffect(() => {
    //fetch song s\details
    async function f() {
      if (session && session.acccessToken) {
        if (!globalCurrentSongId) {
          //get the currently playing song form spotify
        }
        else {
          //get song info
          await fetchSongInfo(globalCurrentSongId)
        }
      }
    }
    f()
  }, [globalCurrentSongId])

  return (
    <div className='h-24 bg-neutral-800 border-t border-neutral-700 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8'>
      <div className='flex items-center space-x-4'>
        {/*Song details*/}
      </div>
      <div className='flex items-center justify-center'>
        <PlayCircleIcon className='h-10 w-10' />
      </div>
      <div>

      </div>
    </div>
  )
}

export default Player