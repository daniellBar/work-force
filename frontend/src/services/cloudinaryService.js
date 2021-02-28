
export const cloudinaryService = {
    uploadImg
}

async function uploadImg(target) {
    const CLOUD_NAME = "dcnijwmki"
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

    const formData = new FormData();
    formData.append('file', target.files[0])
    formData.append('upload_preset', 'iqbe0osh');
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        return data.url

    } catch (err) {
        console.log(err);
    }
  
}
