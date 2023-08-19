import { useState } from "react"
import Sidebar from "@/components/Sidebar"
import PlaylistView from "@/components/PlaylistView"
import Search from "@/components/Search"
import Library from "@/components/Library"
import { Artist } from "@/components/Artist"

export default function Home() {
  const [view, setView] = useState('search') //['search', 'library', 'playlist', 'artist']
  const [globalPlaylistId, setGolbalPlaylistId] = useState(null)
  const [globalArtistId, setGolbalArtistId] = useState(null)

  return (
    <>
      <main className="flex flex-col w-full h-screen overflow-hidden">
        <div className="flex w-full h-screen overflow-hidden">
          <Sidebar
            view={view}
            setView={setView}
            setGolbalPlaylistId={setGolbalPlaylistId}
          />
          {view === 'playlist' &&
            <PlaylistView
              globalPlaylistId={globalPlaylistId}
            />}
          {view === 'search' && <Search />}
          {view === 'library' && <Library />}
          {view === 'artist' && <Artist />}
        </div>

        <div className="sticky z-20 bottom-0 h-24 w-full bg-slate-600"> Player </div>
      </main>
    </>
  )
}
