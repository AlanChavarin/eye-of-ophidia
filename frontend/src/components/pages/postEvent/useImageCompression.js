import { useState } from 'react'
import imageCompression from 'browser-image-compression'

const useImageCompression = () => {
    const [progress, setProgress] = useState()

    const smallImageCompression = async (imageFile) => {
        if(!imageFile){
            return null
        }
        const options = {
            maxSizeMB: .15,
            useWebWorker: true,
            onProgress: setProgress
        }

        return new Promise(resolve => (
            imageCompression(imageFile, options)
            .then(compressedFile => {
                console.log('small image size: ', compressedFile.size)
                setProgress()
                resolve(compressedFile)
            })
            .catch(error => console.log(error))
        )) 
    }

    const bigImageCompression = async (imageFile) => {
        if(!imageFile){
            return null
        }
        const options = {
            maxSizeMB: 1,
            useWebWorker: true,
            onProgress: setProgress
        }
        return new Promise(resolve => (
            imageCompression(imageFile, options)
            .then(compressedFile => {
                console.log('big image size: ', compressedFile.size)
                setProgress()
                resolve(compressedFile)
            })
            .catch(error => console.log(error))
        ))
    }

    return {smallImageCompression, bigImageCompression, progress}
}

export default useImageCompression