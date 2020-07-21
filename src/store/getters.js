import api from '@/api'

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const playProgress = state => state.playProgress

export const currentThumb = state => state.currentThumb

export const currentSong = (state) => {
    return state.playlist[state.currentIndex] || []
}



// export const currentSongUrl = (state) => {
//     console.log(state);
//     // api.songUrlFn(state.playlist[state.currentIndex]).then((res) => {
//     //     console.log(state.playlist, 'res')
//     //     return res.data.data.url || ''
//     // })
// }
