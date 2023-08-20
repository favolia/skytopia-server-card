let server_info = document.querySelector('#server_info')
let server_status = document.querySelector('#server_status')

const ip = 'alanackery.priv.node.caligo.asia'
const endpoint = `https://extra-apis.vercel.app/api/mc-server/bedrock?ip=${ip}`

async function loadServers() {
    server_info.innerHTML = '<h4 class="text-white">Loading...</h4>'

    try {
        
        const server = await fetch(endpoint)
        const { status, data } = await server.json()

        if (status) {
            server_info.innerHTML = `
                <p class="text-white text-lg truncate">${data.map?.clean || '-'}</p>
                <p class="text-white/30 text-xs">By Alanackery</p>
                <p class="text-white/30 text-[0.65rem]">${data.hostname || '-'}</p>`
        } else {
            server_info.innerHTML = `<h4 class="text-red-600">Can't load server information.</h4>`
        }

        if (data['online'] && data['players']) {
            server_status.innerHTML = `<p class="text-white text-xs translate-y-2">playing: ${data.players.online}/${data.players.max}</p>
                <p class="text-white text-xs">
                    <span class="${data.online ? 'text-green-600' : 'text-gray-600'} text-xl relative top-[0.2rem]">◉</span> 
                server ${data.online ? 'online' : 'offline'}</p>`
        } else {
            server_status.innerHTML = `<p class="text-red-600 text-xs text-right">Can't load server status</p>`
        }

    } catch (error) {
        server_info.innerHTML = `<h4 class="text-red-600">Can't load server information.</h4>`
    }
}

loadServers()


setInterval(() => {
    loadServers()
}, 150000);