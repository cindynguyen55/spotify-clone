import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { shuffle } from 'lodash'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import Song from './Song'

const colors = [
    'from-indigo-500',
    'from-blue-500',
    'from-green-500',
    'from-red-500',
    'from-yellow-500',
    'from-pink-500',
    'from-purple-500'
]

const MusicNoteSVG = () => (
    <svg role="img" viewBox="0 0 24 24" data-encore-id="icon" className="text-neutral-500 h-12 w-12">
      <path fill="currentColor" d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z"></path>
    </svg>
)

export const Artist = ({ globalArtistsId, setGolbalArtistId, setGlobalCurrentSongId, setGlobalIsTrackPlaying }) => {
    const { data: session } = useSession()
    const [color, setColor] = useState(colors[0])
    const [opacity, setOpacity] = useState(0)
    const [textOpacity, setTextOpacity] = useState(0)
    const [artistData, setArtistData] = useState(null)
    const [topTracks, setTopTracks] = useState([])
    const [relatedArtists, setRelatedArtists] = useState([])

    function changeOpacity(scrollPos) {
        //scrollPos = 0 -> opacity = 0
        //scrollPos = 300 -> opacity = 1, textOpacity = 0
        //scrollPos = 310 -> opacity = 1, textOpacity = 1
        const offset = 300
        const textOffset = 10
        if (scrollPos < offset) {
            const newOpacity = 1 - ((offset - scrollPos) / offset)
            setOpacity(newOpacity)
            setTextOpacity(0)
        }
        else {
            setOpacity(1)
            const temp = scrollPos - offset
            const newTextOpacity = 1 - ((textOffset - temp) / textOffset)
            setTextOpacity(newTextOpacity)
        }
    }

    async function getArtistData() {
        const res = await fetch(`https://api.spotify.com/v1/artists/${globalArtistsId}`, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`
            }
        })
        const data = await res.json()
        return data
    }

    async function getTopTracks() {
        const res = await fetch(`https://api.spotify.com/v1/artists/{${globalArtistsId}/top-tracks}`, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`
            }
        })
        const data = await res.json()
        return data
    }

    useEffect(() => {
        async function f() {
            if (session && session.accessToken) {
                setArtistData(await getArtistData())
                setTopTracks(await getTopTracks())
            }
        }
        f()

    }, [session, globalArtistsId])

    useEffect(() => {
        setColor(shuffle(colors).pop())
    }, [globalArtistsId])

    return (
        <div className='flex-grow h-screen'>
            <header
                style={{ opacity: opacity }}
                className='text-white sticky top-0 h-20 z-10 text-4xl bg-neutral-800 p-8 flex items-center font-bold'
            >
                <div style={{ opacity: textOpacity }} className='flex items-center'>
                    {artistData?.images[0] && <img className='h-8 w-8 mr-6' src={artistData?.images[0]?.url} />}
                    <p>
                        {artistData?.name}
                    </p>
                </div>
            </header>
            <div className='absolute z-20 top-5 right-8 flex items-center bg-black bg-opacity-70 text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2'>
                <img className='rounded-full w-7 h-7' src={session?.user.image} alt='Profile pic' />
                <p className='text-sm'>Logout</p>
                <ChevronDownIcon className='h-5 w-5' />
            </div>
            <div
                onScroll={(e) => { changeOpacity(e.target.scrollTop) }}
                className='relative -top-20 h-screen overflow-y-auto bg-neutral-900'
            >
                <section className={`flex items-end space-x-7 bg-gradient-to-b to-neutral-900 ${color} h-80 text-white p-8`}>
                    {artistData?.images[0] != null ? <img className='h-44 w-44 rounded-full' src={artistData?.images[0]?.url} />
                        :
                        <div className='h-44 w-44 rounded-full flex items-center justify-center bg-neutral-800'>
                            <MusicNoteSVG />
                        </div>
                    }
                    <div>
                        <p className='text-sm font-bold'>Artist</p>
                        <h1 className='text-2xl md:text-3xl lg:text-5xl font-extrabold'>{artistData?.name}</h1>
                    </div>
                </section>
                <div className='text-white px-8 flex flex-col space-y-1 pb-28 overflow-y-auto'>
                    {topTracks?.map((track, index) => {
                        //Song component
                        return (
                            <Song
                                key={index}
                                sno={index}
                                track={track.track}
                                setGlobalCurrentSongId={setGlobalCurrentSongId}
                                setGlobalIsTrackPlaying={setGlobalIsTrackPlaying}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
