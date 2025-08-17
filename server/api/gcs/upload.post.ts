import { Storage } from '@google-cloud/storage'
import { v4 as uuidv4 } from 'uuid'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  try {
    const formData = await readMultipartFormData(event)
    
    if (!formData || formData.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No file provided'
      })
    }

    const fileEntry = formData.find(entry => entry.name === 'file')
    const fileNameEntry = formData.find(entry => entry.name === 'fileName')
    
    if (!fileEntry || !fileEntry.data) {
      throw createError({
        statusCode: 400,
        statusMessage: 'File data is missing'
      })
    }

    const fileName = fileNameEntry?.data?.toString() || `${uuidv4()}-${fileEntry.filename}`
    
    const storage = new Storage({
      projectId: config.googleCloudProjectId,
      credentials: JSON.parse(config.googleApplicationCredentialsJson)
    })

    const bucket = storage.bucket(config.googleCloudBucketName)
    const file = bucket.file(fileName)

    await file.save(fileEntry.data, {
      metadata: {
        contentType: fileEntry.type || 'application/octet-stream'
      }
    })

    await file.makePublic()

    const publicUrl = `https://storage.googleapis.com/${config.googleCloudBucketName}/${fileName}`

    return {
      success: true,
      data: {
        url: publicUrl,
        fileName
      }
    }
  } catch (error) {
    console.error('GCS Upload Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to upload file to Google Cloud Storage'
    })
  }
})