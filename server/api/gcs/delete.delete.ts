import { Storage } from '@google-cloud/storage'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  try {
    const body = await readBody(event)
    const { fileName } = body
    
    if (!fileName) {
      throw createError({
        statusCode: 400,
        statusMessage: 'File name is required'
      })
    }

    const storage = new Storage({
      projectId: config.googleCloudProjectId,
      credentials: JSON.parse(config.googleApplicationCredentialsJson)
    })

    const bucket = storage.bucket(config.googleCloudBucketName)
    const file = bucket.file(fileName)

    await file.delete()

    return {
      success: true,
      message: 'File deleted successfully'
    }
  } catch (error) {
    console.error('GCS Delete Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete file from Google Cloud Storage'
    })
  }
})