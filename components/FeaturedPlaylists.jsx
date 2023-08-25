import { PlayIcon } from '@heroicons/react/24/solid'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

const MusicNoteSVG = () => (
    <svg role="img" viewBox="0 0 24 24" data-encore-id="icon" className="text-neutral-500 h-12 w-12">
        <path fill="currentColor" d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z"></path>
    </svg>
)

const FeaturedPlaylists = ({setView, setGlobalPlaylistId}) => {
    const { data: session } = useSession()
    const [playlists, setPlaylists] = useState([])

    function selectPlaylist(playlist){
        setView('playlist')
        setGlobalPlaylistId(playlist.id)
    }

    useEffect(() => {
        async function f() {
            if (session && session.accessToken) {
                const res = await fetch('https://api.spotify.com/v1/browse/featured-playlists?' + new URLSearchParams({
                    country:'VN'
                }), {
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`
                    }
                })

                const data = await res.json()
                setPlaylists(data.playlists?.items)
            }
        }
        f()
    }, [session])

    return (
        <div className='flex flex-col gap-4 px-8 h-screen overflow-y-auto'>
            <h2 className='tetx-xl font-bold'>
                Featured Playlist
            </h2>
            <div className='px-2 grid grid-cols-1 gap-6 mb-48 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
                {playlists?.map((playlist) => {
                    return (
                        <div
                            onClick={() => { selectPlaylist(playlist) }}
                            key={playlist.id}
                            className='hover:cursor-pointer relative group w-56 mb-2 bg-neutral-800 hover:bg-neutral-600 rounded-md p-4'
                        >
                            <div className='absolute opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200 shadow-2xl shadow-neutral-900 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-green-500 top-[156px] group-hover:top-[148px] right-6'>
                                <PlayIcon className='h-6 w-6 text-black' />
                            </div>
                            {playlist.images[0] != null ? <img className='w-48 h-48 mb-4' src={playlist.images[0]?.url} />
                                :
                                <div className='w-48 h-48 mb-4 flex items-center justify-center bg-neutral-800'>
                                    <MusicNoteSVG />
                                </div>
                            }
                            <p className='text-base text-white mb-1 w-48 truncate'>{playlist?.name}</p>
                            <p className='text-sm text-neutral-400 mb-8 w-48 truncate'>By {playlist.owner.display_name}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default FeaturedPlaylists