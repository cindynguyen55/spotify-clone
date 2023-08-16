import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

import Sidebar from "@/components/Sidebar"

export default function Home() {

  const { data: session } = useSession()
  const [x, setX] = useState('')
  // console.log(session.user.accessToken)
  const [playlists, setPlaylists] = useState([])

  useEffect(() => {
    async function f() {
      if (session && session.accessToken) {
        setX(session.accessToken)

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
    <>
      <main className="flex w-full h-screen overflow-hidden">
        <Sidebar/>
        <div>
          Main
        </div>
      </main>
      <div className="sticky z-20 bottom-0 h-24 w-full bg-slate-600"> Player </div>
    </>
  )
}
