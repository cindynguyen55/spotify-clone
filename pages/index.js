import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export default function Home() {

  const { data: session } = useSession()
  const [x, setX] = useState('')
  // console.log(session.user.accessToken)
  const [playlists, setPlaylists] = useState([])

  useEffect(() => {
    async function f() {
      if (session && session.accessToken) {
        setX(session.accessToken)

        const res = await fetch('https://api.spotify.com/v1/me/playlists',{
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
    <main className="">

    </main>
  )
}
