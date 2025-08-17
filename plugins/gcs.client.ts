export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  return {
    provide: {
      gcs: {
        async uploadFile(file: File, fileName: string) {
          const formData = new FormData()
          formData.append('file', file)
          formData.append('fileName', fileName)
          
          const { data } = await $fetch('/api/gcs/upload', {
            method: 'POST',
            body: formData
          })
          
          return data.url
        },
        async deleteFile(fileName: string) {
          await $fetch('/api/gcs/delete', {
            method: 'DELETE',
            body: { fileName }
          })
        },
        getPublicUrl(fileName: string) {
          return `https://storage.googleapis.com/${config.public.googleCloudBucketName}/${fileName}`
        }
      }
    }
  }
})