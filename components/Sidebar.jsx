import React from 'react'

const Sidebar = () => {
    return (
        <div className='w-64 h-screen grow-0 shrink-0 overflow-y-scroll border-r border-neutral-800 flex flex-col px-4 space-y-4'>
            <div>SPOTIFY</div>
            <div>
                <button>Home</button>
            </div>
            <div>
                <button>Search</button>
            </div>
        </div>
    )
}

export default Sidebar